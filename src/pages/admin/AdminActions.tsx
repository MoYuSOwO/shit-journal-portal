import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

type Tab = 'hidden' | 'deleted';

interface HiddenSubmission {
  id: string;
  manuscript_title: string;
  author_name: string;
  hidden_at: string;
  created_at: string;
}

interface DeletedComment {
  id: string;
  submission_id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  comment_user_name: string;
  submission_title: string;
}

export const AdminActions: React.FC = () => {
  const [tab, setTab] = useState<Tab>('hidden');
  const [hiddenSubs, setHiddenSubs] = useState<HiddenSubmission[]>([]);
  const [deletedComments, setDeletedComments] = useState<DeletedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const fetchHidden = useCallback(async () => {
    const { data } = await supabase.rpc('admin_list_hidden_submissions');
    setHiddenSubs((data as HiddenSubmission[]) || []);
  }, []);

  const fetchDeleted = useCallback(async () => {
    const { data } = await supabase.rpc('admin_list_deleted_comments');
    setDeletedComments((data as DeletedComment[]) || []);
  }, []);

  useEffect(() => {
    setLoading(true);
    const p = tab === 'hidden' ? fetchHidden() : fetchDeleted();
    p.then(() => setLoading(false));
  }, [tab, fetchHidden, fetchDeleted]);

  const handleUnhide = async (submissionId: string) => {
    setActing(submissionId);
    const { error } = await supabase.rpc('admin_toggle_hidden', {
      target_submission_id: submissionId,
      new_hidden: false,
    });
    if (!error) {
      setHiddenSubs(prev => prev.filter(s => s.id !== submissionId));
      // Clear preprint list cache so list pages reflect the change
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('preprints_')) sessionStorage.removeItem(key);
      });
    }
    setActing(null);
  };

  const handleRestore = async (commentId: string) => {
    setActing(commentId);
    const { error } = await supabase.rpc('admin_restore_comment', {
      target_comment_id: commentId,
    });
    if (!error) {
      setDeletedComments(prev => prev.filter(c => c.id !== commentId));
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('preprints_')) sessionStorage.removeItem(key);
      });
    }
    setActing(null);
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('zh-CN');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-1">Admin Actions</h2>
        <h3 className="chinese-serif text-xl text-charcoal-light">管理操作</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setTab('hidden')}
          className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
            tab === 'hidden'
              ? 'border-b-2 border-accent-gold text-accent-gold'
              : 'text-gray-400 hover:text-charcoal'
          }`}
        >
          隐藏的稿件
          {hiddenSubs.length > 0 && tab !== 'hidden' && (
            <span className="ml-1.5 text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">{hiddenSubs.length}</span>
          )}
        </button>
        <button
          onClick={() => setTab('deleted')}
          className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
            tab === 'deleted'
              ? 'border-b-2 border-accent-gold text-accent-gold'
              : 'text-gray-400 hover:text-charcoal'
          }`}
        >
          删除的评论
          {deletedComments.length > 0 && tab !== 'deleted' && (
            <span className="ml-1.5 text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">{deletedComments.length}</span>
          )}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <img src="/LOGO2.png" alt="Loading" className="w-9 h-9 animate-pulse inline-block" />
        </div>
      ) : tab === 'hidden' ? (
        /* Hidden Submissions */
        hiddenSubs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200">
            <p className="text-gray-500">暂无隐藏的稿件 / No hidden submissions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {hiddenSubs.map(s => (
              <div key={s.id} className="bg-white border border-gray-200 p-5 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/preprints/${s.id}`}
                    className="font-serif font-bold text-charcoal hover:text-accent-gold transition-colors line-clamp-1"
                  >
                    {s.manuscript_title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span>{s.author_name}</span>
                    <span>隐藏于 {formatTime(s.hidden_at)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleUnhide(s.id)}
                  disabled={acting === s.id}
                  className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {acting === s.id ? '...' : '取消隐藏'}
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Deleted Comments */
        deletedComments.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200">
            <p className="text-gray-500">暂无删除的评论 / No deleted comments</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deletedComments.map(c => (
              <div key={c.id} className="bg-white border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-charcoal whitespace-pre-wrap line-clamp-3 mb-2">
                      {c.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span>评论者: <span className="font-bold text-gray-500">{c.comment_user_name}</span></span>
                      <span>·</span>
                      <Link
                        to={`/preprints/${c.submission_id}`}
                        className="text-accent-gold hover:underline"
                      >
                        {c.submission_title || '查看稿件'}
                      </Link>
                      <span>·</span>
                      <span>删除于 {formatTime(c.deleted_at)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRestore(c.id)}
                    disabled={acting === c.id}
                    className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {acting === c.id ? '...' : '恢复'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
