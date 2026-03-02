import React from 'react';
import { Link } from 'react-router-dom';
interface StickyHeaderProps {
  onToggleMenu: () => void;
  hasUnread: boolean;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ onToggleMenu, hasUnread }) => {

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50 shadow-lg animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between relative">
        <div className="flex items-center relative">
          <span className="material-symbols-outlined text-white text-xl cursor-pointer" onClick={onToggleMenu}>menu</span>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-science-red rounded-full" />
          )}
        </div>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-end gap-1 hover:text-accent-gold transition-colors">
          <span className="text-white font-serif font-black text-2xl tracking-tighter leading-[0.85]">S.H.I.T</span>
          <div className="hidden sm:flex flex-col justify-between text-gray-400 self-stretch py-px">
            <span className="text-[5px] font-black tracking-wide leading-none">Sciences</span>
            <span className="text-[5px] font-black tracking-wide leading-none">Humanities</span>
            <span className="text-[5px] font-black tracking-wide leading-none">Information</span>
            <span className="text-[5px] font-black tracking-wide leading-none">Technology</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white text-xl cursor-pointer hover:text-accent-gold transition-colors">search</span>
          <a className="px-4 py-1.5 bg-science-red text-white text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-red-700 transition-colors hidden sm:block" href="#">
            Member / 会员
          </a>
        </div>
      </div>
    </div>
  );
};
