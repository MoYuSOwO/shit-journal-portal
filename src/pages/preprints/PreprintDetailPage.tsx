import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../lib/api'; 
import { useAuth } from '../../hooks/useAuth';
import { CustomSelect } from '../../components/forms/CustomSelect';
// 🔥 引入你刚刚加好的 TAG_LABELS
import { DISCIPLINE_EMOJIS, DISCIPLINE_LABELS, FAVORITES_ENABLED, ZONE_LABELS, ZONE_THRESHOLDS, TAG_LABELS } from '../../lib/constants';
import type { Zone, Discipline } from '../../lib/constants';
import { PdfViewer } from './PdfViewer';
import { RatingWidget } from './RatingWidget';
import { LatrineRatingWidget } from './LatrineRatingWidget';
import { isAdmin } from '../../lib/roles';

// ---------------------------------------------------------
// 常量定义 & 防呆拦截器
// ---------------------------------------------------------
const TOP_LEVEL_PAGE_SIZE = 5;
const REPLY_DEFAULT_VISIBLE = 2;
const REPLY_EXPAND_STEP = 5;

type SortMode = 'hot' | 'newest';
type ReportDialogState = { type: 'article'; commentId?: undefined } | { type: 'comment'; commentId: string };

// 🛡️ 终极过滤器：专杀 Pandas 的 NaN 和 JS 的 "null", "undefined"
const isValidText = (text: any): boolean => {
  if (!text) return false;
  if (typeof text !== 'string') return false;
  const t = text.trim().toLowerCase();
  return t !== '' && t !== 'nan' && t !== 'null' && t !== 'undefined' && t !== 'none';
};

export const PreprintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  
  const [preprint, setPreprint] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState({
    registration: false,
    comment_send: false,
    submit: false,
    comment_show: false,
  });
  const [editingDiscipline, setEditingDiscipline] = useState<string | null>(null);
  const [savingDiscipline, setSavingDiscipline] = useState(false);
  const [togglingHidden, setTogglingHidden] = useState(false);
  const [favoritePending, setFavoritePending] = useState(false);
  const [reportDialog, setReportDialog] = useState<ReportDialogState | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportError, setReportError] = useState('');
  const [systemNotice, setSystemNotice] = useState('');
  const manuscriptTargetRef = useRef<HTMLDivElement | null>(null);

  const isOwnSubmission = preprint?.author?.id === user?.id;
  const canDeleteAny = isAdmin(profile?.role);

  // ==========================================
  // 1. 数据拉取与交互逻辑
  // ==========================================
  const fetchData = useCallback(async (options?: { silent?: boolean }) => {
    if (!id) return;
    const silent = options?.silent ?? false;
    try {
      if (!silent) setLoading(true);
      const [data, maintData] = await Promise.all([
        API.articles.getDetail(id),
        API.maintainance.getList().catch(() => null)
      ]);
      setPreprint(data.article);
      setComments(data.comments || []);
    } catch (error) {
      console.error("获取详情失败", error);
      if (!silent) setPreprint(null);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRate = useCallback(async (score: number) => {
    if (!user || !id || isOwnSubmission) return;
    try {
      await API.interactions.rate(id, score);
      setPreprint((prev: any) => ({ ...prev, my_score: score }));
      fetchData({ silent: true }); 
    } catch (error: any) { alert(error.message); }
  }, [user, id, isOwnSubmission, fetchData]);

  const handleToggleLike = useCallback(async (commentId: string) => {
    if (!user) return;
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const isCurrentlyLiked = c.is_liked_by_me;
        return { ...c, is_liked_by_me: !isCurrentlyLiked, like_count: c.like_count + (isCurrentlyLiked ? -1 : 1) };
      }
      return c;
    }));
    try { await API.interactions.toggleLike(commentId); } catch (error) {}
  }, [user]);

  const handleDeleteComment = async (commentId: string, isAuthorOfComment: boolean) => {
    try {
      if (canDeleteAny && !isAuthorOfComment) {
        await API.admin.deleteComment(commentId);
      } else {
        await API.interactions.deleteComment(commentId);
      }
      fetchData();
    } catch (e: any) { alert(e.message || "删除失败"); }
  };

  const openReportDialog = (target: ReportDialogState) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    setReportDialog(target);
    setReportReason('');
    setReportError('');
  };

  const closeReportDialog = () => {
    if (reportSubmitting) return;
    setReportDialog(null);
    setReportReason('');
    setReportError('');
  };

  const handleSubmitReport = async () => {
    if (!reportDialog) return;
    const trimmedReason = reportReason.trim();
    if (trimmedReason.length < 4) {
      setReportError('请至少填写 4 个字符的举报理由。');
      return;
    }

    setReportSubmitting(true);
    setReportError('');
    try {
      const response = reportDialog.type === 'article'
        ? await API.articles.report(id!, trimmedReason)
        : await API.interactions.reportComment(reportDialog.commentId, trimmedReason);
      setSystemNotice(response.message);
      setReportDialog(null);
      setReportReason('');
      setReportError('');
    } catch (e: any) {
      setReportError(e.message || '举报失败，请稍后重试。');
    } finally {
      setReportSubmitting(false);
    }
  };

  useEffect(() => {
    if (!systemNotice) return undefined;
    const timer = window.setTimeout(() => setSystemNotice(''), 4000);
    return () => window.clearTimeout(timer);
  }, [systemNotice]);

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (!preprint || favoritePending) return;

    setFavoritePending(true);
    try {
      const response = preprint.is_favorited
        ? await API.articles.removeFavorite(preprint.id)
        : await API.articles.addFavorite(preprint.id);

      setPreprint((prev: any) => prev ? {
        ...prev,
        is_favorited: response.is_favorited,
      } : prev);
    } catch (error: any) {
      alert(error.message || '收藏操作失败');
    } finally {
      setFavoritePending(false);
    }
  };

  const getRatingImpactTarget = useCallback(() => {
    const rect = manuscriptTargetRef.current?.getBoundingClientRect();
    if (rect) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + Math.min(148, Math.max(112, rect.height * 0.16)),
      };
    }

    return {
      x: window.innerWidth / 2,
      y: 320,
    };
  }, []);

  // ==========================================
  // 2. 评论区 UI 状态与方法
  // ==========================================
  const [content, setContent] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('hot');
  const [replyTarget, setReplyTarget] = useState<{ parentId: string; replyToId: string; replyToName: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [topLevelVisible, setTopLevelVisible] = useState(TOP_LEVEL_PAGE_SIZE);
  const [replyVisibleCounts, setReplyVisibleCounts] = useState<Record<string, number>>({});
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  const { topLevel, repliesByParent } = useMemo(() => {
    const top: any[] = [];
    const byParent: Record<string, any[]> = {};
    for (const c of comments) {
      if (!c.parent_id) top.push(c);
      else {
        if (!byParent[c.parent_id]) byParent[c.parent_id] = [];
        byParent[c.parent_id].push(c);
      }
    }
    for (const replies of Object.values(byParent)) {
      replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    return { topLevel: top, repliesByParent: byParent };
  }, [comments]);

  const sortedTopLevel = useMemo(() => {
    if (sortMode === 'newest') {
      return [...topLevel].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      return [...topLevel].sort((a, b) => {
        const aReplies = repliesByParent[a.id] || [];
        const bReplies = repliesByParent[b.id] || [];
        const aUniqueUsers = new Set(aReplies.map(r => r.user?.id)).size;
        const bUniqueUsers = new Set(bReplies.map(r => r.user?.id)).size;
        return ((b.like_count || 0) + bUniqueUsers) - ((a.like_count || 0) + aUniqueUsers);
      });
    }
  }, [topLevel, repliesByParent, sortMode]);

  const handleSubmitTopLevel = async () => {
    if (!content.trim() || !user?.id) return;
    setSubmitting(true);
    try {
      await API.interactions.comment(id!, content.trim(), null);
      setContent('');
      fetchData();
    } catch (e: any) { alert(e.message); }
    setSubmitting(false);
  };

  const handleSubmitReply = async (replyContent: string) => {
    if (!replyContent.trim() || !user?.id || !replyTarget) return;
    setSubmitting(true);
    try {
      await API.interactions.comment(id!, replyContent.trim(), replyTarget.parentId);
      setReplyVisibleCounts(prev => ({
        ...prev,
        [replyTarget.parentId]: Math.max(prev[replyTarget.parentId] ?? REPLY_DEFAULT_VISIBLE, (repliesByParent[replyTarget.parentId]?.length || 0) + 1),
      }));
      setReplyTarget(null);
      fetchData();
    } catch (e: any) { alert(e.message); }
    setSubmitting(false);
  };

  const startReply = (parentId: string, replyToId: string, replyToName: string) => {
    setReplyTarget({ parentId, replyToId, replyToName });
    setTimeout(() => replyTextareaRef.current?.focus(), 50);
  };

  const getReplyVisibleCount = (parentId: string) => replyVisibleCounts[parentId] ?? REPLY_DEFAULT_VISIBLE;
  const expandReplies = (parentId: string) => {
    setReplyVisibleCounts(prev => ({ ...prev, [parentId]: (prev[parentId] ?? REPLY_DEFAULT_VISIBLE) + REPLY_EXPAND_STEP }));
  };

  const handleSortChange = (mode: SortMode) => {
    setSortMode(mode);
    setTopLevelVisible(TOP_LEVEL_PAGE_SIZE);
  };

  // ==========================================
  // 3. 主渲染层
  // ==========================================
  if (loading) return <div className="text-center py-32"><img src="/LOGO2.png" alt="Loading" className="w-9 h-9 animate-pulse inline-block" /></div>;
  if (!preprint) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><span className="text-6xl block mb-6">🚫</span><h2 className="text-2xl font-serif font-bold mb-4">Not found / 未找到</h2><Link to="/preprints?zone=latrine" className="text-accent-gold font-bold hover:underline">返回首页</Link></div>;

  const zone: Zone = preprint.zones || preprint.status || 'latrine';
  const isLatrine = zone === 'latrine';
  const isStone = zone === 'stone';
  const disciplineLabel = preprint.discipline ? DISCIPLINE_LABELS[preprint.discipline as Discipline] : null;

  const visibleTopLevel = sortedTopLevel.slice(0, topLevelVisible);
  const remainingTopLevel = sortedTopLevel.length - topLevelVisible;

  // 🚀 核心数据提取与净化
  const displayTitle = isValidText(preprint.title) ? preprint.title : '无题 / Untitled';
  const displayAuthor = isValidText(preprint.author?.display_name) ? preprint.author!.display_name : '匿名作者 / Anonymous';
  const displayInstitution = isValidText(preprint.author?.institution) ? preprint.author!.institution : null;
  const displaySocialMedia = isValidText(preprint.author?.social_media) ? preprint.author!.social_media : null;
  
  // 🔥 核心改动：用 TAG_LABELS 字典做翻译！如果找不到就用回原来的 fallback
  const rawTag = preprint.tag;
  const displayTag = (rawTag && TAG_LABELS[rawTag]) 
      ? TAG_LABELS[rawTag] 
      : (isValidText(rawTag) ? rawTag : '未分类 / Uncategorized');
  const disciplineOptions = Object.entries(DISCIPLINE_LABELS).map(([key, label]) => ({
    value: key,
    label: `${label.cn} / ${label.en}`,
    emoji: DISCIPLINE_EMOJIS[key as Discipline],
  }));

  const displayTopic = isValidText(preprint.topic) ? preprint.topic : null;
  const coAuthors = Array.isArray(preprint.co_authors) ? preprint.co_authors : [];
  const actionButtonClass = 'inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-60';
  const favoriteButtonClass = `${actionButtonClass} ${isOwnSubmission ? 'col-span-2 lg:col-span-1' : ''} ${
    FAVORITES_ENABLED
      ? (preprint.is_favorited
        ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
        : 'border-gray-300 text-gray-500 hover:border-accent-gold hover:text-accent-gold')
      : 'border-gray-200 bg-gray-100 text-gray-400'
  }`;

  return (
    <div className="max-w-4xl mx-auto px-2 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 cursor-pointer text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent-gold"
      >
        ← Back / 返回
      </button>

      {/* 管理员操作 */}
      {isAdmin(profile?.role) && (
        <div className="flex items-center justify-between p-4 mb-4 border text-sm bg-gray-50 border-gray-200">
          <span className="text-xs font-bold text-gray-500">管理操作</span>
          <button onClick={async () => {
              if (window.confirm("确定要软删除并隐藏这篇文章吗？")) {
                setTogglingHidden(true);
                try { await API.admin.deleteArticle(preprint.id); navigate('/'); } catch (e: any) { alert(e.message); }
                setTogglingHidden(false);
              }
            }} disabled={togglingHidden} className="px-4 py-1.5 text-[10px] bg-red-500 text-white hover:bg-red-600 transition-colors">隐藏/软删除稿件</button>
        </div>
      )}

      {/* 🌟 文章元数据 */}
      <div className="bg-white border border-gray-200 p-8 mb-8">
        
        {/* 标题 & 话题徽章 */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {isStone && <span className="text-3xl" title="构石 / The Stone">🪨</span>}
          <h2 className="text-2xl font-serif font-bold">{displayTitle}</h2>
          
          {displayTopic && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-300 whitespace-nowrap shrink-0 mt-1">
              {displayTopic}
            </span>
          )}
        </div>

        {/* 详细信息网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Author / 作者</span>
            <p className="text-charcoal">{displayAuthor}</p>
          </div>
          
          {displayInstitution && (
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Institution / 单位</span>
              <p className="text-charcoal">{displayInstitution}</p>
            </div>
          )}
          
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Tag / 标签</span>
            <p className="inline-block px-2 py-0.5 border border-gray-200 bg-gray-50 text-charcoal rounded text-xs">
              {displayTag}
            </p>
          </div>
          
          {disciplineLabel && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                Discipline / 学科
              </span>
              {isAdmin(profile?.role) ? (
                <div className="flex items-center gap-2">
                  <CustomSelect
                    ariaLabel="Admin discipline / 学科"
                    className="min-w-[208px]"
                    disabled={savingDiscipline}
                    options={disciplineOptions}
                    size="sm"
                    value={editingDiscipline ?? preprint.discipline}
                    onChange={value => setEditingDiscipline(value)}
                  />
                  <button
                    disabled={savingDiscipline}
                    onClick={async () => {
                      const newDiscipline = editingDiscipline ?? preprint.discipline;
                      setSavingDiscipline(true);
                      try {
                        await API.admin.reviewArticle(preprint.id, { discipline: newDiscipline });
                        setPreprint({ ...preprint, discipline: newDiscipline });
                        setEditingDiscipline(null);
                        setSystemNotice('学科已由管理员修正。');
                      } catch (e: any) { alert(e.message || "修改失败"); }
                      setSavingDiscipline(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-accent-gold text-white hover:bg-charcoal transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingDiscipline ? '...' : 'Fix / 修正'}
                  </button>
                </div>
              ) : (
                <p className="text-charcoal">{disciplineLabel.cn} / {disciplineLabel.en}</p>
              )}
            </div>
          )}
          
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Submitted / 提交时间</span>
            <p className="text-charcoal">{new Date(preprint.created_at).toLocaleString()}</p>
          </div>

          {displaySocialMedia && (
             <div>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Social Media / 社交媒体</span>
               <p className="text-charcoal">{displaySocialMedia}</p>
             </div>
          )}
        </div>

        {coAuthors.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Co-Authors / 共同作者</span>
            <div className="space-y-2">
              {coAuthors.map((ca: any, i: number) => {
                 const caName = isValidText(ca.name) ? ca.name : 'Unknown';
                 const caInst = isValidText(ca.institution) ? ca.institution : null;
                 return (
                   <p key={i} className="text-sm text-charcoal flex items-center">
                     {caName} {caInst && <span className="text-gray-500 ml-1">· {caInst}</span>}
                     {ca.contribution === 'co-first' && (
                       <span className="ml-2 px-1 py-0.5 text-[9px] font-bold bg-yellow-50 text-accent-gold rounded">
                         共一
                       </span>
                     )}
                   </p>
                 );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 评分区 */}
      <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="order-2 lg:order-1">
          {user ? (
            isLatrine ? <LatrineRatingWidget currentRating={preprint.my_score} ratingCount={preprint.rating_count} isOwnSubmission={isOwnSubmission} getImpactTarget={getRatingImpactTarget} onRate={handleRate} />
                      : <RatingWidget currentRating={preprint.my_score} weightedScore={preprint.avg_score} ratingCount={preprint.rating_count} isOwnSubmission={isOwnSubmission} getImpactTarget={getRatingImpactTarget} onRate={handleRate} />
          ) : (
            <div className="bg-white border border-gray-200 p-6 flex items-center gap-4">
              <span className="text-sm text-gray-500">登录后可参与评分 / Sign in to rate</span>
              <Link to="/login" className="px-4 py-1.5 text-[10px] font-bold bg-accent-gold text-white uppercase tracking-widest hover:bg-charcoal transition-colors">登录</Link>
            </div>
          )}
        </div>

        <aside className="order-1 h-full bg-white border border-gray-200 p-4 lg:order-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions / 操作</p>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-1">
            {user ? (
              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={favoritePending || !FAVORITES_ENABLED}
                className={favoriteButtonClass}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {preprint.is_favorited ? '🔖' : '📑'}
                </span>
                {!FAVORITES_ENABLED
                  ? 'Unavailable / 收藏暂不可用'
                  : favoritePending
                  ? 'Saving... / 保存中'
                  : preprint.is_favorited
                    ? 'Saved / 已收藏'
                    : 'Save / 收藏'}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className={`${actionButtonClass} ${isOwnSubmission ? 'col-span-2 lg:col-span-1' : ''} border-gray-200 bg-gray-100 text-gray-400`}
              >
                <span aria-hidden="true" className="text-base leading-none">📑</span>
                Unavailable / 收藏暂不可用
              </button>
            )}

            {!isOwnSubmission && (
              <button
                type="button"
                onClick={() => openReportDialog({ type: 'article' })}
                className={`${actionButtonClass} border-gray-300 text-gray-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600`}
              >
                <span aria-hidden="true" className="text-base leading-none">🚩</span>
                Report / 举报
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* PDF Viewer */}
      <div ref={manuscriptTargetRef} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-bold">Manuscript / 全文</h3>
        </div>
        <PdfViewer pdfPath={preprint.pdf_url} />
      </div>

      {/* ============================================================== */}
      {/* 评论区 */}
      {/* ============================================================== */}
      <div className="bg-white border border-gray-200 p-6">
        
        {/* 输入框顶部 */}
        {!maintenance.comment ? (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-sm text-amber-700">评论功能维护中，暂时关闭</div>
        ) : user?.id ? (
          <div className="mb-6">
            <textarea ref={textareaRef} value={replyTarget ? '' : content} onChange={e => { if (!replyTarget) setContent(e.target.value); }} onFocus={() => { if (replyTarget) setReplyTarget(null); }} placeholder="理性发言，禁止涉政、暴力、色情等违规内容" maxLength={100} rows={3} className="w-full border border-gray-200 rounded p-3 text-sm resize-none focus:outline-none focus:border-accent-gold transition-colors" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-gray-400">{content.length}/100</span>
              <button onClick={handleSubmitTopLevel} disabled={!content.trim() || submitting || !!replyTarget} className="px-5 py-1.5 text-[11px] font-bold bg-accent-gold text-white rounded hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? '发布中...' : '发布'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-500">登录后可参与讨论 / Sign in to comment</span>
            <Link to="/login" state={{ from: location.pathname }} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent-gold text-white hover:bg-charcoal transition-colors">登录</Link>
          </div>
        )}

        {/* 排序与计数器 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-charcoal font-bold">{comments.length} 条评论</span>
          <div className="flex items-center gap-1">
            <button onClick={() => handleSortChange('hot')} className={`px-2 py-1 text-[11px] font-bold transition-colors ${sortMode === 'hot' ? 'text-charcoal' : 'text-gray-400 hover:text-charcoal'}`}>默认</button>
            <button onClick={() => handleSortChange('newest')} className={`px-2 py-1 text-[11px] font-bold transition-colors ${sortMode === 'newest' ? 'text-charcoal' : 'text-gray-400 hover:text-charcoal'}`}>最新</button>
          </div>
        </div>

        <div className="border-t border-gray-100 mb-4" />

        {/* 评论列表 */}
        {visibleTopLevel.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">暂无评论 / No comments yet</p>
        ) : (
          <div className="space-y-5">
            {visibleTopLevel.map(comment => {
              const replies = repliesByParent[comment.id] || [];
              const visibleCount = getReplyVisibleCount(comment.id);
              const visibleReplies = replies.slice(0, visibleCount);
              const remainingReplies = replies.length - visibleCount;

              return (
                <div key={comment.id} className="pb-5 border-b border-gray-50 last:border-b-0">
                  <CommentItem
                    comment={comment}
                    isReply={false}
                    isAuthor={comment.user?.id === preprint.author?.id}
                    isLiked={comment.is_liked_by_me}
                    currentUserId={user?.id}
                    canDeleteAny={canDeleteAny}
                    onReply={() => startReply(comment.id, comment.id, comment.user?.display_name || '匿名')}
                    onDelete={() => handleDeleteComment(comment.id, comment.user?.id === user?.id)}
                    onToggleLike={() => handleToggleLike(comment.id)}
                    onReport={() => openReportDialog({ type: 'comment', commentId: comment.id })}
                    hideScores={isLatrine}
                  />

                  {visibleReplies.length > 0 && (
                    <div className="ml-6 mt-3 space-y-3">
                      {visibleReplies.map(reply => {
                        let replyToName = comment.user?.display_name;
                        if (reply.reply_to_id && reply.reply_to_id !== comment.id) {
                          const target = replies.find(r => r.id === reply.reply_to_id);
                          if (target) replyToName = target.user?.display_name;
                        }

                        return (
                          <CommentItem
                            key={reply.id}
                            comment={reply}
                            isReply
                            isAuthor={reply.user?.id === preprint.author?.id}
                            showReplyTo={reply.reply_to_id !== reply.parent_id}
                            replyToName={replyToName}
                            isLiked={reply.is_liked_by_me}
                            currentUserId={user?.id}
                            canDeleteAny={canDeleteAny}
                            onReply={() => startReply(comment.id, reply.id, reply.user?.display_name || '匿名')}
                            onDelete={() => handleDeleteComment(reply.id, reply.user?.id === user?.id)}
                            onToggleLike={() => handleToggleLike(reply.id)}
                            onReport={() => openReportDialog({ type: 'comment', commentId: comment.id })}
                            hideScores={isLatrine}
                          />
                        )
                      })}
                    </div>
                  )}

                  {remainingReplies > 0 && (
                    <button onClick={() => expandReplies(comment.id)} className="mt-2 ml-6 text-[11px] font-bold text-accent-gold hover:text-charcoal transition-colors">
                      展开更多 {Math.min(remainingReplies, REPLY_EXPAND_STEP)} 条回复 {remainingReplies > REPLY_EXPAND_STEP && ` (共${replies.length}条)`}
                    </button>
                  )}

                  {replyTarget?.parentId === comment.id && user?.id && (
                    <ReplyInput
                      ref={replyTextareaRef}
                      replyToName={replyTarget.replyToName}
                      submitting={submitting}
                      onSubmit={handleSubmitReply}
                      onCancel={() => setReplyTarget(null)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {remainingTopLevel > 0 && (
          <button onClick={() => setTopLevelVisible(prev => prev + TOP_LEVEL_PAGE_SIZE)} className="w-full mt-4 py-3 text-[11px] font-bold text-accent-gold hover:text-charcoal transition-colors">
            查看更多评论 ({remainingTopLevel})
          </button>
        )}
      </div>

      {reportDialog && (
        <ReportDialog
          type={reportDialog.type}
          reason={reportReason}
          error={reportError}
          submitting={reportSubmitting}
          onReasonChange={value => {
            setReportReason(value);
            if (reportError) setReportError('');
          }}
          onCancel={closeReportDialog}
          onSubmit={handleSubmitReport}
        />
      )}

      {systemNotice && (
        <div className="fixed right-4 top-4 z-[70] w-[min(92vw,420px)] animate-searchPanelIn">
          <div
            role="status"
            aria-live="polite"
            className="border border-emerald-200 bg-white shadow-2xl"
          >
            <div className="flex items-start gap-3 px-4 py-4">
              <span aria-hidden="true" className="material-symbols-outlined text-emerald-600">check_circle</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  System Notice / 系统提示
                </p>
                <p className="mt-1 text-sm text-charcoal">{systemNotice}</p>
              </div>
              <button
                type="button"
                onClick={() => setSystemNotice('')}
                className="ml-auto text-gray-400 transition-colors hover:text-charcoal"
                aria-label="关闭系统提示"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 辅助函数与子组件
// ==========================================
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const diffMs = new Date().getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 1) return '刚刚';
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHour < 24) return `${diffHour}小时前`;
  if (diffDay < 30) return `${diffDay}天前`;
  return date.toLocaleDateString('zh-CN');
};

const CommentItem: React.FC<any> = ({ 
  comment, isReply, isAuthor, showReplyTo, replyToName, isLiked, 
  currentUserId, canDeleteAny, onReply, onDelete, onToggleLike, hideScores, onReport
}) => {
  const authorBadge = comment.user?.author_badge;
  const isSnifferToday = comment.user?.is_sniffer_today;
  const userScore = comment.user?.user_score; 

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`font-bold text-charcoal ${isReply ? 'text-xs' : 'text-sm'}`}>
          {comment.user?.display_name || '匿名用户'}
        </span>
        {isAuthor && <span className="text-[10px] font-bold text-accent-gold bg-yellow-50 px-1.5 py-0.5 rounded">作者</span>}
        {isSnifferToday && <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded" title="今日嗅探兽">🐽</span>}
        {authorBadge === 'stone' && <span className="text-[10px] font-bold text-accent-gold bg-yellow-50 px-1.5 py-0.5 rounded" title="造粪王">🏆 造粪王</span>}
        {authorBadge === 'septic' && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded" title="造粪机">🏭 造粪机</span>}
        {!hideScores && userScore != null && <span className="text-xs" title={`${userScore}/5`}>{'💩'.repeat(userScore)}</span>}
      </div>

      <p className={`text-charcoal whitespace-pre-wrap ${isReply ? 'text-xs' : 'text-sm'}`}>
        {showReplyTo && replyToName && <span className="text-accent-gold font-bold">回复 {replyToName}：</span>}
        {comment.content}
      </p>

      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400">{formatTime(comment.created_at)}</span>
          {currentUserId && comment.user?.id !== "deleted" && <button onClick={onReply} className="text-[10px] font-bold text-gray-400 hover:text-accent-gold transition-colors">回复</button>}
          {(currentUserId === comment.user?.id || canDeleteAny) && comment.user?.id !== "deleted" && <button onClick={onDelete} className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors">删除</button>}
          {currentUserId && comment.user?.id !== currentUserId && comment.user?.id !== "deleted" && (
            <button onClick={onReport} className="text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors">
              举报
            </button>
          )}
        </div>
        <button onClick={currentUserId && comment.user?.id !== "deleted" ? onToggleLike : undefined} className={`flex items-center gap-1 text-xs transition-all ${currentUserId ? 'cursor-pointer' : 'cursor-default'} ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
          <span className={`text-sm transition-all ${isLiked ? 'scale-110' : 'grayscale opacity-40'}`} style={isLiked ? {} : { filter: 'grayscale(100%)' }}>💩</span>
          {comment.like_count > 0 && <span>{comment.like_count}</span>}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 独立的高级回复框组件
// ==========================================
const ReplyInput = React.forwardRef<HTMLTextAreaElement, any>(({ replyToName, submitting, onSubmit, onCancel }, ref) => {
  const [text, setText] = useState('');
  return (
    <div className="ml-6 mt-3">
      <div className="text-[10px] text-gray-400 mb-1">回复 {replyToName}</div>
      <textarea ref={ref} value={text} onChange={e => setText(e.target.value)} placeholder="写下你的回复..." maxLength={100} rows={2} className="w-full border border-gray-200 rounded p-2 text-sm resize-none focus:outline-none focus:border-accent-gold transition-colors" />
      <div className="flex items-center justify-end gap-2 mt-1">
        <button onClick={onCancel} className="px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-charcoal transition-colors">取消</button>
        <button onClick={() => onSubmit(text)} disabled={!text.trim() || submitting} className="px-3 py-1 text-[10px] font-bold bg-accent-gold text-white rounded hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed">{submitting ? '发布中...' : '回复'}</button>
      </div>
    </div>
  );
});

const ReportDialog: React.FC<{
  type: 'article' | 'comment';
  reason: string;
  error: string;
  submitting: boolean;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ type, reason, error, submitting, onReasonChange, onCancel, onSubmit }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm">
    <div className="w-full max-w-lg border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">Report / 举报</p>
          <h3 className="mt-2 font-serif text-2xl text-charcoal">
            {type === 'article' ? '举报这篇文章 / Report this article' : '举报这条评论 / Report this comment'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            请简要说明举报原因。举报内容会提交给管理员审核。
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            Briefly explain the reason for your report. Your report will be reviewed by an administrator.
          </p>
          {type === 'article' && (
            <div className="mt-3 border border-red-100 bg-red-50/60 px-3 py-2">
              <p className="text-sm font-medium text-red-500">
                注意：确定要举报该文章吗？恶意举报可能导致账号被封禁。
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-400">
                Warning: Are you sure you want to report this article? Malicious or bad-faith reports may result in account suspension.
              </p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="text-gray-400 transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="关闭举报弹窗"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="px-6 py-5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Reason / 举报理由
        </label>
        <textarea
          value={reason}
          onChange={event => onReasonChange(event.target.value)}
          placeholder="请填写举报原因，例如：人身攻击、恶意刷屏、明显违规内容等"
          rows={5}
          maxLength={200}
          className="mt-3 w-full resize-none border border-gray-200 px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-red-300"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">{reason.length}/200</span>
          {error && <span className="text-[11px] text-red-500">{error}</span>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="border border-gray-300 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 transition-colors hover:border-charcoal hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel / 取消
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || reason.trim().length < 4}
          className="bg-red-500 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting... / 提交中' : 'Submit Report / 提交举报'}
        </button>
      </div>
    </div>
  </div>
);
ReplyInput.displayName = 'ReplyInput';
