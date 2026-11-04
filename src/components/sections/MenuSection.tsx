import React, { useState } from 'react';
import { 
  Wine, 
  Plus, 
  Check, 
  Sparkles, 
  Eye, 
  Flame, 
  Fish, 
  Utensils, 
  Coffee, 
  GlassWater 
} from 'lucide-react';
import { MENU_ITEMS } from '../../data/restaurantData';
import { MenuItem } from '../../types/restaurant';

interface MenuSectionProps {
  onOpenDishDetail: (dish: MenuItem) => void;
  onAddToTasting: (dish: MenuItem) => void;
  addedItemIds: string[];
}

type MenuCategory = 'all' | 'starters' | 'mains' | 'seafood' | 'grill' | 'desserts' | 'drinks';

export default function MenuSection({
  onOpenDishDetail,
  onAddToTasting,
  addedItemIds
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Complete Collection', icon: Utensils },
    { id: 'starters', label: 'Starters', icon: Sparkles },
    { id: 'mains', label: 'Main Courses', icon: Utensils },
    { id: 'seafood', label: 'Seafood', icon: Fish },
    { id: 'grill', label: 'Grilled Specialties', icon: Flame },
    { id: 'desserts', label: 'Desserts', icon: Coffee },
    { id: 'drinks', label: 'Drinks & Cocktails', icon: GlassWater },
  ];

  const filteredDishes = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.frenchName && item.frenchName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-[#0c0d0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
            Seasonal Haute Carte
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
            The Interactive Dining Menu
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Select a category to explore our curated dishes. Click any course to view origin, sommelier pairings, and culinary notes, or curate your tasting course list.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as MenuCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Tilted Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDishes.map((dish) => {
            const isAdded = addedItemIds.includes(dish.id);
            return (
              <DishCard
                key={dish.id}
                dish={dish}
                isAdded={isAdded}
                onOpenDetail={() => onOpenDishDetail(dish)}
                onAdd={() => onAddToTasting(dish)}
              />
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center text-xs text-neutral-500 font-mono">
          Prices exclude discretionary 15% service charge · Complete tasting menus require full table participation
        </div>

      </div>
    </section>
  );
}

// Interactive 3D Card with Tilt on Mouse Move
interface DishCardProps {
  dish: MenuItem;
  isAdded: boolean;
  onOpenDetail: () => void;
  onAdd: () => void;
}

function DishCard({ dish, isAdded, onOpenDetail, onAdd }: DishCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;
    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 0.15s ease-out' }}
      className="group bg-neutral-900/60 border border-white/10 hover:border-amber-400/40 rounded-xl p-6 flex flex-col justify-between transition-colors backdrop-blur-md relative overflow-hidden"
    >
      {/* Top ambient highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/50 to-transparent transition-all duration-300" />

      <div>
        {/* Unboxed Metadata (Frontend Design Skill §1.A) */}
        <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mb-2 uppercase tracking-wider">
          <span className="text-amber-400/90">{dish.category}</span>
          {dish.origin && (
            <>
              <span aria-hidden="true">·</span>
              <span>{dish.origin}</span>
            </>
          )}
          {dish.dietary.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">{dish.dietary.join(' / ')}</span>
            </>
          )}
        </div>

        {/* Dish Title & Price Header */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-amber-300 transition-colors">
              {dish.name}
            </h3>
            {dish.frenchName && (
              <div className="text-xs text-neutral-400 italic font-serif mt-0.5">
                {dish.frenchName}
              </div>
            )}
          </div>
          <div className="font-mono text-base font-medium text-amber-300 shrink-0 tabular-nums">
            £{dish.price}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-neutral-300/80 leading-relaxed font-light mt-3 mb-4">
          {dish.description}
        </p>

        {/* Sommelier Recommendation snippet */}
        {dish.winePairing && (
          <div className="flex items-center gap-1.5 text-xs text-amber-200/70 font-mono pt-3 border-t border-white/5">
            <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{dish.winePairing}</span>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between gap-3 pt-5 mt-4 border-t border-white/5">
        <button
          onClick={onOpenDetail}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors group/btn"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>View Notes</span>
        </button>

        <button
          onClick={onAdd}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            isAdded
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-white/5 text-neutral-300 hover:text-amber-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Tasting</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
