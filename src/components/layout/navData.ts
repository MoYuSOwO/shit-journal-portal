export const NAV_LINKS_FULL = [
  { label: 'Home', cn: '主页', to: '/' },
  { label: 'News', cn: '新闻', to: '/news' },
  { label: 'Fermentation', cn: '发酵区', to: '/preprints?zone=latrine' },
  { label: 'Submit', cn: '排泄', to: '/submit' },
  { label: 'Dashboard', cn: '仪表台', to: '/dashboard', authRequired: true, userMenuOnly: true },
  { label: 'Screening', cn: '预审稿', to: '/screening', authRequired: true, editorOnly: true, userMenuOnly: true },
  { label: 'Feedback', cn: '反馈箱', to: '/admin/feedback', authRequired: true, editorOnly: true, userMenuOnly: true },
  { label: 'Admin Actions', cn: '管理操作', to: '/admin/actions', authRequired: true, adminOnly: true, userMenuOnly: true },
  { label: 'User Management', cn: '用户管理', to: '/admin/users', authRequired: true, superAdminOnly: true, userMenuOnly: true },
  { label: 'Community Guard', cn: '社区挑粪人', to: '/community-guard' },
  { label: 'Journals', cn: '子刊', to: '/journals' },
];
