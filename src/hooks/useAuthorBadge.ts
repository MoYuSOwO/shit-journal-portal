import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type AuthorBadge = 'stone' | 'septic';

interface AuthorBadgeResult {
  badge: AuthorBadge | null;
  loading: boolean;
}

/**
 * Hook to check if a single user has an author badge (造粪机/造粪王).
 * stone (构石) = 造粪王, septic (化粪池) = 造粪机. Stone takes priority.
 */
export function useAuthorBadge(userId: string | undefined): AuthorBadgeResult {
  const [badge, setBadge] = useState<AuthorBadge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('submissions')
      .select('promoted_to_stone_at, promoted_to_septic_at')
      .eq('user_id', userId)
      .or('promoted_to_stone_at.not.is.null,promoted_to_septic_at.not.is.null')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const hasStone = data.some(s => s.promoted_to_stone_at != null);
          setBadge(hasStone ? 'stone' : 'septic');
        }
        setLoading(false);
      });
  }, [userId]);

  return { badge, loading };
}

/**
 * Batch fetch author badges for multiple users (used in CommentSection).
 * Returns a Map of userId -> highest badge level.
 */
export async function fetchAuthorBadges(userIds: string[]): Promise<Map<string, AuthorBadge>> {
  if (userIds.length === 0) return new Map();

  const { data } = await supabase
    .from('submissions')
    .select('user_id, promoted_to_stone_at, promoted_to_septic_at')
    .in('user_id', userIds)
    .or('promoted_to_stone_at.not.is.null,promoted_to_septic_at.not.is.null');

  const result = new Map<string, AuthorBadge>();
  if (!data) return result;

  for (const row of data) {
    const current = result.get(row.user_id);
    if (row.promoted_to_stone_at != null) {
      result.set(row.user_id, 'stone');
    } else if (row.promoted_to_septic_at != null && current !== 'stone') {
      result.set(row.user_id, 'septic');
    }
  }

  return result;
}
