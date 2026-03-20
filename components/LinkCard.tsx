import React from 'react';
import { LucideIcon } from 'lucide-react';
import { trackClick } from '../services/analytics';

interface LinkCardProps {
  text: string;
  url: string;
  icon: LucideIcon;
}

export const LinkCard: React.FC<LinkCardProps> = ({ text, url, icon: Icon }) => {
  const handleClick = () => {
    trackClick(text, url);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative block w-full bg-white/[0.02] backdrop-blur-md h-[76px] text-white no-underline transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden font-body font-bold text-[1.1rem] md:text-[1.2rem] tracking-wider cyber-clip border border-white/5 hover:bg-primary/5 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] active:scale-[0.98]"
    >
      {/* Background Layer 0: Animated Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          animation: 'cardGridScroll 3s linear infinite'
        }}
      />

      {/* Background Layer 1: Animated Scanline */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-0"></div>

      {/* Background Layer 2: Ambient Large Icon (Depth) - Size Reduced */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 -rotate-12 text-primary opacity-[0.03] z-0 pointer-events-none transition-all duration-1000 ease-out group-hover:opacity-10 group-hover:rotate-0 group-hover:scale-110 group-hover:-translate-x-2">
        <Icon strokeWidth={1} size={72} />
      </div>

      {/* Background Layer 3: Hover Glow Spot */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,240,255,0.08),transparent_60%)] pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center px-5">

        {/* Prominent Icon Box with Layered Glass Effect */}
        <div className="relative flex items-center justify-center w-12 h-12 mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[5deg]">
          {/* Icon Frame Background */}
          <div className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300"></div>

          {/* The Main Icon */}
          <div className="relative z-10 text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.9)] transition-all duration-300">
            <Icon size={24} strokeWidth={2.5} />
          </div>

          {/* Corner Decorative Dots */}
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-primary/60 rounded-full group-hover:scale-150 transition-transform"></div>
          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-primary/60 rounded-full group-hover:scale-150 transition-transform"></div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left relative overflow-hidden">
          <span className="block transition-transform duration-500 group-hover:translate-x-2 group-hover:text-white drop-shadow-sm">
            {text}
          </span>
          {/* Subtle underline hint on hover */}
          <div className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-primary/40 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Right Arrow/Indicator */}
        <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary/60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes cardGridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 24px 24px; }
        }
      `}} />
    </a>
  );
};