import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { FloralDivider } from './Ornaments';
import type { StoryMilestone } from '../types/wedding';

interface StorySectionProps {
  stories: StoryMilestone[];
}

export const StorySection: React.FC<StorySectionProps> = ({ stories }) => {
  return (
    <section id="cerita" className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-batik-card opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Jejak Langkah Cinta
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          Kisah Kami
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/80 max-w-lg mx-auto mb-12">
          Setiap pertemuan adalah takdir, dan setiap langkah adalah untaian doa yang menuntun kami pada titik ini.
        </p>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-[#d4af37]/35 ml-4 sm:ml-32 text-left space-y-12">
          {stories.map((story, index) => (
            <div key={story.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#1e150e] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-3.5 h-3.5 fill-[#d4af37]/40" />
              </div>

              {/* Year label for desktop */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                <span className="font-serif text-sm font-semibold text-[#f5df9e]">
                  {story.year}
                </span>
              </div>

              {/* Story Content Card */}
              <div className="rounded-2xl bg-[#1f1610]/90 border border-[#d4af37]/35 p-5 sm:p-6 shadow-xl backdrop-blur-sm gold-glow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                <div className="sm:hidden mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[11px] font-semibold text-[#f5df9e]">
                    {story.year}
                  </span>
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-[#f7e3a1] mb-2">
                  {story.title}
                </h3>

                {story.imageUrl && (
                  <div className="my-3 rounded-xl overflow-hidden max-h-48 w-full border border-[#d4af37]/30">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#eedbb4]/85 leading-relaxed font-serif">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
