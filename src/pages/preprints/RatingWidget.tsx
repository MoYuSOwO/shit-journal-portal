import React, { useEffect, useRef, useState } from 'react';
import { RatingImpactBurst, type RatingImpact } from './RatingImpactBurst';

interface RatingWidgetProps {
  currentRating: number | null;
  weightedScore: number;
  ratingCount: number;
  isOwnSubmission: boolean;
  getImpactTarget: () => { x: number; y: number };
  onRate: (score: number) => void;
}

export const RatingWidget: React.FC<RatingWidgetProps> = ({
  currentRating, weightedScore, ratingCount, isOwnSubmission, getImpactTarget, onRate,
}) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [impacts, setImpacts] = useState<RatingImpact[]>([]);
  const nextImpactId = useRef(1);
  const impactTimers = useRef<number[]>([]);

  useEffect(() => () => {
    impactTimers.current.forEach(timer => window.clearTimeout(timer));
  }, []);

  const triggerImpact = (score: number, rect: DOMRect) => {
    const impactTarget = getImpactTarget();
    const created = Array.from({ length: score }, (_, index) => {
      const startX = rect.left + (rect.width / 2) + ((index - (score - 1) / 2) * 22);
      const startY = rect.top + (rect.height / 2) - 10 - ((index % 2) * 10);
      const deltaX = impactTarget.x - startX;
      const deltaY = impactTarget.y - startY;
      const arcLift = -60 - Math.random() * 48;
      const lateralSwing = (Math.random() - 0.5) * 70;
      const cp1X = deltaX * 0.22 + lateralSwing;
      const cp1Y = deltaY * 0.14 + arcLift;
      const cp2X = deltaX * 0.68 + (lateralSwing * 0.4);
      const cp2Y = deltaY * 0.82 - (12 + Math.random() * 22);
      const baseRotation = (Math.random() - 0.5) * 32;

      return {
        id: nextImpactId.current++,
        x: startX,
        y: startY,
        deltaX,
        deltaY,
        cp1X,
        cp1Y,
        cp2X,
        cp2Y,
        delayMs: index * 260,
        durationMs: 1200,
        rotationStartDeg: baseRotation,
        rotationMidDeg: baseRotation + ((Math.random() > 0.5 ? 1 : -1) * (55 + Math.random() * 55)),
        rotationEndDeg: baseRotation + ((Math.random() > 0.5 ? 1 : -1) * (95 + Math.random() * 80)),
      };
    });

    setImpacts(prev => [...prev, ...created]);

    created.forEach((impact, index) => {
      const timer = window.setTimeout(() => {
        setImpacts(prev => prev.filter(item => item.id !== impact.id));
      }, impact.durationMs + 140 + index * 260);
      impactTimers.current.push(timer);
    });
  };

  return (
    <div className="flex h-full flex-col justify-between bg-white border border-gray-200 p-4">
      <RatingImpactBurst impacts={impacts} />
      <div>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Rate / 评价
        </h3>

        {isOwnSubmission ? (
          <p className="min-h-[38px] text-sm text-gray-500 italic">
            You cannot rate your own submission. / 不能评价自己的稿件。
          </p>
        ) : (
          <div className="min-h-[38px]">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  onClick={event => {
                    triggerImpact(score, event.currentTarget.getBoundingClientRect());
                    onRate(score);
                  }}
                  onMouseEnter={() => setHoverScore(score)}
                  onMouseLeave={() => setHoverScore(null)}
                  className="cursor-pointer text-[2rem] leading-none transition-transform hover:scale-110 focus:outline-none"
                  title={`${score} / 5`}
                >
                  {score <= (hoverScore ?? currentRating ?? 0) ? '💩' : '⚪'}
                </button>
              ))}
              {currentRating && (
                <span className="relative z-[1] ml-2 text-xs text-gray-500">
                  Your rating: {currentRating}/5
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-end gap-4 border-t border-gray-100 pt-3">
        <div className="flex items-end leading-none">
          <span className="text-[2.5rem] font-serif font-bold text-charcoal tabular-nums">
            {weightedScore > 0 ? weightedScore.toFixed(2) : '—'}
          </span>
          <span className="ml-1 pb-1 text-lg text-gray-400">/ 5</span>
        </div>
        <span className="pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'} / {ratingCount}个评分
        </span>
      </div>
    </div>
  );
};
