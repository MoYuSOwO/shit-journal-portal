import React from 'react';
import { createPortal } from 'react-dom';

export interface RatingImpact {
  id: number;
  x: number;
  y: number;
  delayMs: number;
  durationMs: number;
  deltaX: number;
  deltaY: number;
  cp1X: number;
  cp1Y: number;
  cp2X: number;
  cp2Y: number;
  rotationStartDeg: number;
  rotationMidDeg: number;
  rotationEndDeg: number;
}

interface RatingImpactBurstProps {
  impacts: RatingImpact[];
}

export const RatingImpactBurst: React.FC<RatingImpactBurstProps> = ({ impacts }) => {
  if (typeof document === 'undefined' || impacts.length === 0) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {impacts.map(impact => (
        <span
          key={impact.id}
          aria-hidden="true"
          className="rating-impact-burst"
          style={{
            left: `${impact.x}px`,
            top: `${impact.y}px`,
            animationDelay: `${impact.delayMs}ms`,
            animationDuration: `${impact.durationMs}ms`,
            ['--impact-x' as string]: `${impact.deltaX}px`,
            ['--impact-y' as string]: `${impact.deltaY}px`,
            ['--impact-cp1-x' as string]: `${impact.cp1X}px`,
            ['--impact-cp1-y' as string]: `${impact.cp1Y}px`,
            ['--impact-cp2-x' as string]: `${impact.cp2X}px`,
            ['--impact-cp2-y' as string]: `${impact.cp2Y}px`,
            ['--impact-rotate-start' as string]: `${impact.rotationStartDeg}deg`,
            ['--impact-rotate-mid' as string]: `${impact.rotationMidDeg}deg`,
            ['--impact-rotate-end' as string]: `${impact.rotationEndDeg}deg`,
          }}
        >
          💩
        </span>
      ))}
    </div>,
    document.body,
  );
};
