import { Flame, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function StorySection() {
  const pillars = [
    {
      icon: Flame,
      title: 'White Binchotan Hearth',
      description: 'Our open kitchen centers around Japanese Kishu binchotan white charcoal burning steadily at 800°C without flare or odor, sealing natural moisture and lending an elusive smoky purity.'
    },
    {
      icon: Compass,
      title: 'Biodynamic Terroir & Provenance',
      description: 'We partner directly with twenty generational biodynamic purveyors across Brittany, Dorset, Hokkaido, and Piedmont, harvesting produce mere hours before dinner service.'
    },
    {
      icon: Sparkles,
      title: 'Subterranean Grand Cru Vault',
      description: 'Cared for by Master Sommelier Elena Rostova, our temperature-stabilized cellar houses 1,800+ collectible vintages spanning historic Bordeaux first growths to elusive Jura naturals.'
    },
    {
      icon: ShieldCheck,
      title: 'Relais & Châteaux Hospitality',
      description: 'Every guest is welcomed into an atmosphere of quiet discretion, bespoke acoustic design, and attentive white-glove table choreography that honors the art of dining.'
    }
  ];

  return (
    <section id="story" className="py-24 md:py-32 px-6 bg-[#0a0b0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Narrative Split: Top Half */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
              The Aurelia Philosophy
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6 leading-[1.1]">
              Rooted in Fire, Soil, and the Deep
            </h2>
            <p className="text-base text-neutral-300 font-light leading-relaxed mb-6">
              Founded in Mayfair with a singular vision: to strip away culinary ostentation and reconnect fine dining with primal purity. At Aurelia, food is not merely assembled; it is transformed by elemental fire, seasonal cadence, and ancestral Japanese-French gastronomy.
            </p>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              We reject frozen imports and greenhouse produce. Every mushroom is foraged in damp deciduous forests; every scallop is harvested by licensed free-divers in sub-zero Hokkaido waters.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/src/assets/images/wine_cellar_ambiance_1793791700147.jpg"
                alt="Aurelia Private Wine Cellar and Dining Salon"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-xs font-mono text-amber-200/90 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                The 1,800-Bottle Subterranean Vault & Private Tasting Salon
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-neutral-900/40 border border-white/5 hover:border-amber-400/30 rounded-xl p-6 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-white font-normal mb-2 group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Accolades Banner */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
          {RESTAURANT_INFO.accolades.map((acc, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-amber-400 font-serif text-lg">✦</span>
              <span className="text-xs tracking-wider uppercase font-mono text-neutral-300">
                {acc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
