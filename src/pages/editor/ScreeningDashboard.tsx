import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { EDITOR_STATUS_LABELS } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { ProfileSidebar } from '../../components/dashboard/ProfileSidebar';

interface Submission {
  id: string;
  manuscript_title: string;
  author_name: string;
  email: string;
  institution: string;
  viscosity: string;
  status: string;
  created_at: string;
  solicited_topic: string | null;
  weighted_score?: number;
  rating_count?: number;
}

type TabFilter = 'pending' | 'approved' | 'rejected' | 'all';
type SortMode = 'newest' | 'oldest' | 'highest_rated' | 'most_rated';

const PAGE_SIZE = 20;

const TAB_OPTIONS: { value: TabFilter; en: string; cn: string }[] = [
  { value: 'pending', en: 'Pending', cn: '待预审' },
  { value: 'approved', en: 'Approved', cn: '已入池' },
  { value: 'rejected', en: 'Rejected', cn: '已拒绝' },
  { value: 'all', en: 'All', cn: '全部' },
];

const ALL_SORT_OPTIONS: { value: SortMode; en: string; cn: string }[] = [
  { value: 'newest', en: 'Newest', cn: '最新' },
  { value: 'oldest', en: 'Oldest', cn: '最早' },
  { value: 'highest_rated', en: 'Highest Rated', cn: '最高评分' },
  { value: 'most_rated', en: 'Most Rated', cn: '最多评分' },
];

const TAB_SORTS: Record<TabFilter, SortMode[]> = {
  pending: ['newest', 'oldest'],
  approved: ['newest', 'oldest', 'highest_rated', 'most_rated'],
  rejected: ['newest', 'oldest'],
  all: ['newest', 'oldest'],
};

const statusFilter = (tab: TabFilter): string[] => {
  switch (tab) {
    case 'pending': return ['pending'];
    case 'approved': return ['under_review', 'accepted'];
    case 'rejected': return ['rejected', 'flushed', 'revisions_requested'];
    default: return [];
  }
};

export const ScreeningDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [tabCounts, setTabCounts] = useState<Record<TabFilter, number | null>>({
    pending: null, approved: null, rejected: null, all: null,
  });
  const [loading, setLoading] = useState(true);

  const tab = (searchParams.get('tab') as TabFilter) || 'pending';
  const allowedSorts = TAB_SORTS[tab];
  const rawSort = (searchParams.get('sort') as SortMode) || 'newest';
  const sort: SortMode = allowedSorts.includes(rawSort) ? rawSort : 'newest';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const sortOptions = ALL_SORT_OPTIONS.filter(o => allowedSorts.includes(o.value));

  // Fetch tab counts on mount / user change
  useEffect(() => {
    if (!user) return;
    const fetchCounts = async () => {
      const tabs: TabFilter[] = ['pending', 'approved', 'rejected', 'all'];
      const results = await Promise.all(
        tabs.map(async t => {
          let query = supabase.from('submissions').select('id', { count: 'exact', head: true });
          const filter = statusFilter(t);
          if (filter.length > 0) query = query.in('status', filter);
          const { count } = await query;
          return [t, count ?? 0] as [TabFilter, number];
        })
      );
      setTabCounts(Object.fromEntries(results) as Record<TabFilter, number>);
    };
    fetchCounts();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchSubmissions = async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const isRatingSort = sort === 'highest_rated' || sort === 'most_rated';

      let results: Submission[] = [];
      let count = 0;

      if (isRatingSort && tab === 'approved') {
        // Rating sort: query mat view (only contains under_review/accepted)
        let matQuery = supabase
          .from('preprints_with_ratings_mat')
          .select('id, manuscript_title, author_name, institution, viscosity, created_at, weighted_score, rating_count, co_authors, solicited_topic', { count: 'exact' });

        if (sort === 'highest_rated') {
          matQuery = matQuery.order('weighted_score', { ascending: false }).order('rating_count', { ascending: false });
        } else {
          matQuery = matQuery.order('rating_count', { ascending: false }).order('weighted_score', { ascending: false });
        }

        const { data: matData, count: matCount } = await matQuery.range(from, to);
        count = matCount ?? 0;

        if (matData && matData.length > 0) {
          // Get status/email from submissions table for the page
          const ids = matData.map(m => m.id);
          const { data: subData } = await supabase
            .from('submissions')
            .select('id, email, status')
            .in('id', ids);

          const subMap = new Map((subData || []).map(s => [s.id, s]));
          results = matData.map(m => {
            const sub = subMap.get(m.id);
            return {
              id: m.id,
              manuscript_title: m.manuscript_title,
              author_name: m.author_name,
              email: sub?.email ?? '',
              institution: m.institution,
              viscosity: m.viscosity,
              status: sub?.status ?? 'under_review',
              created_at: m.created_at,
              solicited_topic: m.solicited_topic,
              weighted_score: m.weighted_score ?? 0,
              rating_count: m.rating_count ?? 0,
            };
          });
        }
      } else {
        // Time sort: query submissions table
        let query = supabase
          .from('submissions')
          .select('id, manuscript_title, author_name, email, institution, viscosity, status, created_at, solicited_topic', { count: 'exact' })
          .order('created_at', { ascending: sort === 'oldest' });

        const filter = statusFilter(tab);
        if (filter.length > 0) {
          query = query.in('status', filter);
        }

        const { data: subs, count: subCount } = await query.range(from, to);
        count = subCount ?? 0;
        results = subs || [];

        // Fetch rating data for display
        if (results.length > 0) {
          const ids = results.map(s => s.id);
          const { data: ratings } = await supabase
            .from('preprints_with_ratings_mat')
            .select('id, weighted_score, rating_count')
            .in('id', ids);

          if (ratings) {
            const ratingsMap = new Map(ratings.map(r => [r.id, r]));
            results = results.map(s => {
              const r = ratingsMap.get(s.id);
              return { ...s, weighted_score: r?.weighted_score ?? 0, rating_count: r?.rating_count ?? 0 };
            });
          }
        }
      }

      setSubmissions(results);
      setTotalCount(count);
      setLoading(false);
    };

    fetchSubmissions();
  }, [user, tab, sort, page]);

  const setTab = (t: TabFilter) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (t === 'pending') next.delete('tab'); else next.set('tab', t);
      next.delete('page');
      // Reset sort if not available in new tab
      const currentSort = (prev.get('sort') as SortMode) || 'newest';
      if (!TAB_SORTS[t].includes(currentSort)) next.delete('sort');
      return next;
    });
  };

  const setSort = (s: SortMode) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (s === 'newest') next.delete('sort'); else next.set('sort', s);
      next.delete('page');
      return next;
    });
  };

  const setPage = (p: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (p <= 1) next.delete('page'); else next.set('page', String(p));
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside>
          <ProfileSidebar submissionCount={tabCounts.all ?? 0} />
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-1">Screening Queue</h2>
            <h3 className="chinese-serif text-xl text-charcoal-light">预审台</h3>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-gray-200">
            {TAB_OPTIONS.map(t => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  tab === t.value
                    ? 'border-b-2 border-accent-gold text-accent-gold'
                    : 'text-gray-400 hover:text-charcoal'
                }`}
              >
                {t.en} / {t.cn}
                {tabCounts[t.value] != null && (
                  <span className="ml-1 text-[10px] opacity-60">({tabCounts[t.value]})</span>
                )}
              </button>
            ))}
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sort / 排序:</span>
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                  sort === opt.value
                    ? 'border-accent-gold text-accent-gold bg-yellow-50'
                    : 'border-gray-300 text-gray-400 hover:border-accent-gold hover:text-accent-gold'
                }`}
              >
                {opt.en} / {opt.cn}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <img src="/LOGO2.png" alt="Loading" className="w-9 h-9 animate-pulse inline-block" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200">
              <span className="text-6xl block mb-6">📭</span>
              <p className="font-serif text-lg text-gray-500 mb-2">No submissions in this category.</p>
              <p className="chinese-serif text-gray-400">该分类暂无稿件</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {submissions.map(sub => {
                  const status = EDITOR_STATUS_LABELS[sub.status] || EDITOR_STATUS_LABELS.pending;
                  return (
                    <Link
                      key={sub.id}
                      to={`/screening/${sub.id}`}
                      className="block bg-white border border-gray-200 p-6 hover:border-accent-gold transition-colors group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-lg text-charcoal group-hover:text-accent-gold transition-colors truncate">
                              {sub.manuscript_title}
                            </h4>
                            {sub.solicited_topic && (
                              <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-300 whitespace-nowrap shrink-0">
                                {sub.solicited_topic}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {sub.author_name} · {sub.institution} · {new Date(sub.created_at).toLocaleDateString('zh-CN')} · {sub.viscosity}
                          </p>
                          <p className="text-xs text-gray-300 mt-0.5">{sub.email}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {(sub.rating_count ?? 0) > 0 && (
                            <span className="text-[10px] font-bold text-gray-400">
                              {(sub.weighted_score ?? 0).toFixed(1)}★ · {sub.rating_count}票
                            </span>
                          )}
                          <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap ${status.color}`}>
                            {status.en} / {status.cn}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 pt-8 border-t border-gray-100">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-300 hover:border-accent-gold hover:text-accent-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-500 px-4">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-300 hover:border-accent-gold hover:text-accent-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
