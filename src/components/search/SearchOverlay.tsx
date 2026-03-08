import React, { useEffect, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QUICK_TAG_SEARCHES, SEARCH_SCOPE_OPTIONS, type SearchScope, createSearchParams } from '../../lib/search';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectId = useId();
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('anywhere');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nextQuery = params.get('q') ?? '';
    const nextScope = (params.get('type') as SearchScope | null) ?? 'anywhere';

    setQuery(nextQuery);
    setScope(nextScope === 'article' || nextScope === 'author' || nextScope === 'tag' ? nextScope : 'anywhere');
    setError('');
  }, [location.search, open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const submitSearch = (nextQuery: string, nextScope: SearchScope) => {
    const trimmed = nextQuery.trim();
    if (trimmed.length < 2) {
      setError('请输入至少 2 个字符 / Please enter at least 2 characters.');
      return;
    }

    setError('');
    onClose();
    navigate(`/search?${createSearchParams(trimmed, nextScope).toString()}`);
  };

  return (
    <section
      aria-label="Expanded search panel"
      className="bg-black text-white border-b border-white/10 animate-searchPanelIn"
    >
      <div className="md:hidden border-b border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-base">arrow_back_ios</span>
          Back To Home / 返回首页
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-9">
        <form
          onSubmit={event => {
            event.preventDefault();
            submitSearch(query, scope);
          }}
          className="space-y-6"
        >
          <div className="grid gap-5">
            <div className="space-y-2">
              <input
                autoFocus
                value={query}
                onChange={event => {
                  setQuery(event.target.value);
                  if (error) setError('');
                }}
                placeholder="请输入搜索词"
                className="w-full border-b border-white/35 bg-transparent pb-3 text-xl italic text-white placeholder:text-white/80 focus:border-white focus:outline-none md:text-3xl"
              />
              {error && <p className="text-[13px] text-red-300">{error}</p>}
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <label htmlFor={selectId} className="text-base font-bold uppercase tracking-widest text-white/80 md:text-[12px]">
                  Searching / 搜索范围:
                </label>
                <div className="relative">
                  <select
                    id={selectId}
                    value={scope}
                    onChange={event => setScope(event.target.value as SearchScope)}
                    className="w-full min-w-[200px] appearance-none rounded-full border border-white/25 bg-transparent px-4 py-2.5 text-base text-white focus:border-white focus:outline-none md:text-sm"
                  >
                    {SEARCH_SCOPE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value} className="bg-black text-white">
                        {option.label} / {option.labelCn}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/75">
                    expand_more
                  </span>
                </div>
              </div>

              <button
                type="submit"
                aria-label="Search / 搜索"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-science-red px-7 py-2.5 text-base font-bold uppercase tracking-widest text-white transition-all duration-300 hover:translate-x-0.5 hover:bg-red-700 md:text-[12px]"
              >
                Search / 搜索
                <span aria-hidden="true" className="material-symbols-outlined text-lg md:text-sm">arrow_forward_ios</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">Tag Search / 标签搜索:</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {QUICK_TAG_SEARCHES.map(tag => (
              <button
                key={tag.query}
                type="button"
                onClick={() => submitSearch(tag.query, 'tag')}
                className="rounded-full border border-white/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/8"
              >
                {tag.label} / {tag.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
