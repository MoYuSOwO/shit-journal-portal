export const STATUS_LABELS: Record<string, { en: string; cn: string; color: string }> = {
  pending: { en: 'Pending', cn: '待预审', color: 'bg-gray-100 text-gray-500' },
  passed: { en: 'Scooper Review', cn: '铲屎官评审中', color: 'bg-yellow-50 text-yellow-700' },
  revisions: { en: 'Revisions Requested', cn: '需修改', color: 'bg-blue-50 text-blue-700' },
  flushed: { en: 'Desk Flushed', cn: '直接冲掉', color: 'bg-red-50 text-red-500' },
  deleted: { en: 'Deleted', cn: '被删除', color: 'bg-red-50 text-red-700' },
  hidden: { en: 'Deleted', cn: '被删除', color: 'bg-red-50 text-red-700' },
};

export const EDITOR_STATUS_LABELS: Record<string, { en: string; cn: string; color: string }> = {
  pending: { en: 'Pending', cn: '待预审', color: 'bg-amber-50 text-amber-700' },
  passed: { en: 'In Tank', cn: '已入池', color: 'bg-green-50 text-green-700' },
  revisions: { en: 'Revisions', cn: '需修改', color: 'bg-blue-50 text-blue-700' },
  flushed: { en: 'Desk Flushed', cn: '已拒绝', color: 'bg-red-50 text-red-500' },
  deleted: { en: 'Deleted', cn: '已删除', color: 'bg-red-50 text-red-700' },
  hidden: { en: 'Deleted', cn: '已隐藏', color: 'bg-red-50 text-red-700' },
};

export const TAG_LABELS: Record<string, string> = {
  hardcore: '硬核学术',
  meme: '纯享整活',
};

export type Zone = 'latrine' | 'septic' | 'stone' | 'sediment' | 'published';
export type Discipline = 'science' | 'engineering' | 'medical' | 'agriculture' | 'law_social' | 'humanities' | 'interdisciplinary';

export const ZONE_LABELS: Record<Zone, { en: string; cn: string; icon: string }> = {
  latrine: { en: 'The Latrine', cn: '旱厕', icon: '🚽' },
  septic: { en: 'Septic Tank', cn: '化粪池', icon: '🧪' },
  stone: { en: 'The Stone', cn: '构石', icon: '🪨' },
  sediment: { en: 'Sediment', cn: '沉淀区', icon: '🕳️' },
  published: { en: 'Published', cn: '正式见刊区', icon: '📕' },
};

export const DISCIPLINE_LABELS: Record<Discipline, { en: string; cn: string }> = {
  interdisciplinary: { en: 'Interdisciplinary', cn: '交叉' },
  science: { en: 'Science', cn: '理' },
  engineering: { en: 'Engineering', cn: '工' },
  medical: { en: 'Medical', cn: '医' },
  agriculture: { en: 'Agriculture', cn: '农' },
  law_social: { en: 'Law & Social', cn: '法社' },
  humanities: { en: 'Humanities', cn: '文' },
};

export const ZONE_THRESHOLDS = {
  LATRINE_TO_SEPTIC_COUNT: 30,
  LATRINE_TO_SEPTIC_SCORE: 3.8,
  SEPTIC_TO_STONE_COUNT: 100,
  SEPTIC_TO_STONE_SCORE: 4.5,
  SNIFFER_BADGE_THRESHOLD: 20,
} as const;
