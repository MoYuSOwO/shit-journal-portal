export type Role = 'author' | 'reviewer' | 'community_guard' | 'editor' | 'admin' | 'super_admin';

const ROLE_LEVEL: Record<string, number> = {
  super_admin: 50,
  admin: 40,
  editor: 30,
  community_guard: 20,
  reviewer: 10,
  author: 0,
};

export function hasRole(userRole: string | undefined, requiredRole: string): boolean {
  return (ROLE_LEVEL[userRole ?? 'author'] ?? 0) >= (ROLE_LEVEL[requiredRole] ?? 999);
}

export const isAdmin = (role?: string) => hasRole(role, 'admin');
export const isEditor = (role?: string) => hasRole(role, 'editor');
export const isSuperAdmin = (role?: string) => hasRole(role, 'super_admin');

export const ROLE_LABELS: Record<Role, { en: string; cn: string }> = {
  super_admin: { en: 'Super Admin', cn: '超级管理员' },
  admin: { en: 'Admin', cn: '管理员' },
  editor: { en: 'Editor', cn: '审稿人' },
  community_guard: { en: 'Community Guard', cn: '社区守护人' },
  reviewer: { en: 'Reviewer', cn: '评审员' },
  author: { en: 'Author', cn: '排泄者' },
};

// Roles that super_admin can assign to others (cannot assign super_admin)
export const ASSIGNABLE_ROLES: Role[] = ['author', 'reviewer', 'community_guard', 'editor', 'admin'];
