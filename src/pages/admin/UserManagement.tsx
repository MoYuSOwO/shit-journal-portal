import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { ASSIGNABLE_ROLES, ROLE_LABELS, type Role } from '../../lib/roles';

interface UserRow {
  id: string;
  display_name: string;
  email: string;
  role: Role;
  created_at: string;
}

const PAGE_SIZE = 20;

export const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [updating, setUpdating] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase.rpc('admin_list_users', {
      search_term: debouncedSearch.trim() || null,
      role_filter: roleFilter === 'all' ? null : roleFilter,
      page_offset: page * PAGE_SIZE,
      page_limit: PAGE_SIZE,
    });

    if (!error && data) {
      const rows = data as any[];
      setUsers(rows.map(r => ({
        id: r.id,
        display_name: r.display_name,
        email: r.email || '',
        role: r.role,
        created_at: r.created_at,
      })));
      setTotal(rows.length > 0 ? rows[0].total_count : 0);
      setError(null);
    } else {
      console.error('admin_list_users error:', error);
      setUsers([]);
      setTotal(0);
      setError(error?.message || 'Unknown error');
    }
    setLoading(false);
  }, [page, debouncedSearch, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Reset page when search/filter changes
  useEffect(() => { setPage(0); }, [debouncedSearch, roleFilter]);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    if (userId === user?.id) return;
    setUpdating(userId);
    setError(null);
    const { error: updateError } = await supabase.rpc('admin_update_user_role', {
      target_user_id: userId,
      new_role: newRole,
    });
    if (!updateError) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      console.error('Role update error:', updateError);
      setError(`角色修改失败: ${updateError.message}`);
    }
    setUpdating(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-1">User Management</h2>
        <h3 className="chinese-serif text-xl text-charcoal-light">用户管理</h3>
        <p className="text-sm text-gray-400 mt-2">{total} 位用户</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索邮箱或用户名 / Search by email or name..."
          className="flex-1 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-accent-gold transition-colors"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-accent-gold bg-white cursor-pointer"
        >
          <option value="all">全部角色</option>
          {(['super_admin', 'admin', 'editor', 'community_guard', 'reviewer', 'author'] as Role[]).map(r => (
            <option key={r} value={r}>{ROLE_LABELS[r].cn} / {ROLE_LABELS[r].en}</option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 mb-6 text-sm text-red-700">
          <span className="font-bold">RPC Error:</span> {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-20">
          <img src="/LOGO2.png" alt="Loading" className="w-9 h-9 animate-pulse inline-block" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200">
          <p className="text-gray-500">无匹配用户 / No users found</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-gray-500">用户</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-gray-500">邮箱</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-gray-500">当前角色</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-gray-500">注册时间</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isSelf = u.id === user?.id;
                const isSuperAdmin = u.role === 'super_admin';
                return (
                  <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-bold text-charcoal">{u.display_name}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${
                        u.role === 'super_admin' ? 'bg-red-50 text-red-600' :
                        u.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                        u.role === 'editor' ? 'bg-blue-50 text-blue-600' :
                        u.role === 'community_guard' ? 'bg-green-50 text-green-600' :
                        u.role === 'reviewer' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {ROLE_LABELS[u.role]?.cn ?? u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(u.created_at).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-4 py-3">
                      {isSelf ? (
                        <span className="text-xs text-gray-400">本人</span>
                      ) : isSuperAdmin ? (
                        <span className="text-xs text-gray-400">不可修改</span>
                      ) : (
                        <select
                          value={u.role}
                          onChange={e => handleRoleChange(u.id, e.target.value as Role)}
                          disabled={updating === u.id}
                          className="border border-gray-200 px-2 py-1 text-xs bg-white focus:outline-none focus:border-accent-gold cursor-pointer disabled:opacity-50"
                        >
                          {ASSIGNABLE_ROLES.map(r => (
                            <option key={r} value={r}>{ROLE_LABELS[r].cn}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 text-sm">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
            className="px-4 py-2 border border-gray-200 text-xs font-bold disabled:opacity-30 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span className="text-xs text-gray-400">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-gray-200 text-xs font-bold disabled:opacity-30 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
};
