import { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/restaurantData';
import { GalleryItem } from '../../types/restaurant';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export default function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  const [filter, setFilter] = useState<'all' | 'plating' | 'atmosphere' | 'cellar' | 'kitchen'>('all');

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-[#08090a] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
              Visual Chronicles
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Atmosphere & Plating Gallery
            </h2>
          </div>
          
          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg overflow-x-auto no-scrollbar">
            {(['all', 'plating', 'atmosphere', 'kitchen', 'cellar'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Captures' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className={`relative group rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                } min-h-[300px] md:min-h-[360px]`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </div>

                {/* Caption info */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-mono mb-1">
                    {item.category}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300/80 line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
