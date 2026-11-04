import { useState } from 'react';
import { Wine, Flame, Thermometer, Clock, Plus, Check, ChevronRight } from 'lucide-react';
import { SIGNATURE_DISHES } from '../../data/restaurantData';
import { SignatureDish, MenuItem } from '../../types/restaurant';

interface SignatureDishesSectionProps {
  onSelectDish: (dish: SignatureDish) => void;
  onAddToTasting: (item: MenuItem) => void;
  onReserveForDish: (dishTitle: string) => void;
  addedItemIds: string[];
}

export default function SignatureDishesSection({
  onSelectDish,
  onAddToTasting,
  onReserveForDish,
  addedItemIds
}: SignatureDishesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(SIGNATURE_DISHES[0].id);

  const activeDish = SIGNATURE_DISHES.find(d => d.id === activeTab) || SIGNATURE_DISHES[0];

  const handleAddActiveToTasting = () => {
    // Map SignatureDish to MenuItem structure
    const menuItem: MenuItem = {
      id: activeDish.id,
      name: activeDish.title,
      category: 'grill',
      description: activeDish.description,
      price: activeDish.price,
      dietary: ['Signature'],
      ingredients: activeDish.ingredients,
      winePairing: activeDish.winePairing,
      technique: activeDish.technique,
      image: activeDish.image
    };
    onAddToTasting(menuItem);
  };

  const isAdded = addedItemIds.includes(activeDish.id);

  return (
    <section id="signature" className="py-24 md:py-32 px-6 bg-[#08090a] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
              Haute Gastronomie Highlights
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Signature Culinary Creations
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed font-light">
            Each creation is an exploration of rare seasonal terroir, executed with micro-precision on our white binchotan hearths.
          </p>
        </div>

        {/* Dish Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 border-b border-white/10 no-scrollbar">
          {SIGNATURE_DISHES.map((dish) => {
            const isActive = dish.id === activeDish.id;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveTab(dish.id)}
                className={`flex items-center gap-2.5 px-5 py-3 text-xs uppercase tracking-wider font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{dish.title.split('&')[0]}</span>
                <span className="opacity-70 font-mono">· £{dish.price}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Spotlight: 2-Column Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-neutral-900/40 border border-white/10 rounded-2xl overflow-hidden p-6 md:p-10 backdrop-blur-sm">
          
          {/* Left Column: Large Editorial Photography */}
          <div className="lg:col-span-7 relative group rounded-xl overflow-hidden bg-neutral-950 min-h-[380px] md:min-h-[500px]">
            <img
              src={activeDish.image}
              alt={activeDish.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Overlay Badges */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[11px] text-amber-300 font-mono tracking-wider uppercase">
                {activeDish.category}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeDish.servingTemperature}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeDish.prepTime} table rest</span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Narrative & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">
                {activeDish.subtitle}
              </div>
              
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight mb-3">
                {activeDish.title}
              </h3>

              <div className="text-2xl font-serif text-amber-300 mb-6 font-normal">
                £{activeDish.price}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                {activeDish.description}
              </p>

              {/* Signature Ingredients Breakdown */}
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2.5">
                  Signature Terroir & Ingredients:
                </div>
                <ul className="space-y-1.5">
                  {activeDish.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hearth Technique */}
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 font-mono">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Culinary Technique</span>
                </div>
                <p className="text-xs text-neutral-300/90 leading-relaxed">
                  {activeDish.technique}
                </p>
              </div>

              {/* Sommelier Pairing */}
              <div className="p-3.5 bg-amber-400/5 border border-amber-400/20 rounded-lg mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 font-mono">
                  <Wine className="w-3.5 h-3.5" />
                  <span>Sommelier Cellar Pairing</span>
                </div>
                <p className="text-xs text-neutral-200">
                  {activeDish.winePairing}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAddActiveToTasting}
                className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  isAdded
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Tasting</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add to Tasting Order</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onReserveForDish(activeDish.title)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20"
              >
                <span>Reserve Table</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
