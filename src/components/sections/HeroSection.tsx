import { ArrowDown, Calendar, Compass, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
  onScrollTo3D: () => void;
}

export default function HeroSection({
  onExploreMenu,
  onReserveTable,
  onScrollTo3D,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_dining_room_1793791697687.jpg"
          alt="Aurelia Grand Dining Room"
          className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_ease-out_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Deep layered gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/70 to-[#08090a]/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#08090a]/40 to-[#08090a]/90" />
      </div>

      {/* Hero Top Trust Marker: Michelin Stars */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 border border-amber-400/20 rounded-full backdrop-blur-md">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(RESTAURANT_INFO.michelinStars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-amber-200/90 tracking-widest font-mono uppercase">
            Three Michelin Stars · Mayfair London
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span>51.5074° N, 0.1278° W</span>
          <span>·</span>
          <span>EST. 2018</span>
        </div>
      </div>

      {/* Hero Main Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center py-12 md:py-16">
        
        {/* Subtle kicker text */}
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-amber-400/90 font-mono mb-4">
          Haute Gastronomy · Seasonal Terroir · Open Hearth
        </p>

        {/* Brand Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-6 leading-[1.08] text-balance">
          Where Culinary Artistry Meets Elemental Fire
        </h1>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-10 text-pretty">
          Immerse your senses in a three-Michelin-starred culinary odyssey crafted by Executive Chef Marcus Vance. 
          Rare binchotan-fired delicacies, diver-caught ocean treasures, and rare Grand Cru vintages.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onReserveTable}
            className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-md transition-all duration-200 shadow-xl shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-amber-400/40 text-xs font-semibold uppercase tracking-widest rounded-md backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Explore Our Menu</span>
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div>
            <div className="text-xl md:text-2xl font-serif text-amber-300">10-Course</div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5">Tasting Symphony</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-serif text-amber-300">800°C</div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5">Binchotan Hearth</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-serif text-amber-300">1,800+</div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5">Grand Cru Vintages</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-serif text-amber-300">#12</div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5">World's 50 Best</div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar with Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-neutral-400">
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          <span>Dinner Seatings Open Tonight from 17:30</span>
        </div>

        {/* Interactive Scroll Down Indicator */}
        <button
          onClick={onScrollTo3D}
          className="mx-auto md:mx-0 flex items-center gap-2 text-neutral-300 hover:text-amber-300 transition-colors py-2 px-3 group"
        >
          <span className="uppercase tracking-widest text-[11px] font-mono">Scroll for 3D Experience</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-1 transition-transform" />
        </button>

        <div className="hidden md:block font-mono text-[11px] text-neutral-400">
          Mayfair · London
        </div>
      </div>
    </section>
  );
}
