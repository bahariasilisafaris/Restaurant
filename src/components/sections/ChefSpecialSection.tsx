import { Award, Flame, Sparkles, Star, Calendar } from 'lucide-react';
import { CHEF_INFO } from '../../data/restaurantData';

interface ChefSpecialSectionProps {
  onReserveTasting: () => void;
}

export default function ChefSpecialSection({ onReserveTasting }: ChefSpecialSectionProps) {
  const tastingCourses = [
    { num: '01', title: 'Imperial Ossetra Caviar & Smoked Quail Egg', note: 'Brittany buckwheat tartlet' },
    { num: '02', title: 'Hokkaido Diver Scallop & Saffron Emulsion', note: 'Foraged samphire oil' },
    { num: '03', title: 'Foie Gras Poêlé & Mirabelles de Lorraine', note: 'Sichuan pepper reduction' },
    { num: '04', title: 'Wild Brittany Turbot in Sea Kelp Broth', note: 'Champagne butter emulsion' },
    { num: '05', title: 'Pyrenean Milk-Fed Lamb Saddle', note: 'Sweetbread cromesquis & artichoke' },
    { num: '06', title: 'Palate Cleanser: Calamondin Citrus & Pine', note: 'Granité with botanical gin' },
    { num: '07', title: 'A5 Miyazaki Wagyu over Binchotan Embers', note: 'Winter black truffle & glazed morels' },
    { num: '08', title: 'Affineur Comte 40-Month & Truffle Honey', note: 'Wild walnut sourdough' },
    { num: '09', title: 'Soleil: Valrhona Dark Cacao & Bergamot', note: '24-Karat gold spun halo' },
    { num: '10', title: 'Mignardises & Smoked Tonka Canelés', note: 'Single-origin Jamaican Blue Mountain' }
  ];

  return (
    <section id="chef-special" className="py-24 md:py-32 px-6 bg-[#08090a] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Grand Chef Recommendation</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
            The 10-Course Tasting Symphony
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Curated daily by Executive Chef {CHEF_INFO.name}, this immersive ten-act gastronomic progression celebrates the pinnacle of fire, earth, and oceanic terroir.
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Chef Craft Visual with Quote */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/src/assets/images/chef_plating_kitchen_1793791699900.jpg"
                alt="Chef Marcus Vance plating signature dish"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-amber-400 text-xs font-mono uppercase tracking-widest mb-1">
                  Executive Chef & Director
                </div>
                <div className="font-serif text-2xl text-white mb-2">
                  {CHEF_INFO.name}
                </div>
                <p className="text-xs text-neutral-300 italic font-serif leading-relaxed">
                  {CHEF_INFO.quote}
                </p>
              </div>
            </div>

            {/* Floating Accolade Box */}
            <div className="mt-4 p-4 bg-neutral-900/80 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Tasting Menu</div>
                <div className="text-lg font-serif text-amber-300">£{CHEF_INFO.tastingPrice} per guest</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Grand Cru Pairing</div>
                <div className="text-lg font-serif text-neutral-200">£{CHEF_INFO.winePairingPrice} per guest</div>
              </div>
            </div>
          </div>

          {/* Right Column: 10-Course Progression Timeline */}
          <div className="lg:col-span-7 bg-neutral-900/30 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>The Course Sequence</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">3.5 Hours Experience</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {tastingCourses.map((c) => (
                <div
                  key={c.num}
                  className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-amber-400/30 transition-all group"
                >
                  <span className="font-mono text-xs font-bold text-amber-400/80 pt-0.5 group-hover:text-amber-300">
                    {c.num}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
                      {c.title}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 font-light">
                      {c.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reservation CTA Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 font-light text-center sm:text-left">
                Strictly limited to 24 covers per evening. Advance booking recommended.
              </div>
              <button
                onClick={onReserveTasting}
                className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Tasting Experience</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
