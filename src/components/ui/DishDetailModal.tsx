import { X, Wine, Flame, Sparkles, Plus, Check, Calendar } from 'lucide-react';
import { MenuItem } from '../../types/restaurant';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToTasting: (dish: MenuItem) => void;
  onReserveForDish: (dishTitle: string) => void;
  isAdded: boolean;
}

export default function DishDetailModal({
  dish,
  onClose,
  onAddToTasting,
  onReserveForDish,
  isAdded
}: DishDetailModalProps) {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Optional Image Header */}
        {dish.image && (
          <div className="relative h-64 sm:h-72 w-full bg-neutral-950 shrink-0">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <span>{dish.category}</span>
            {dish.origin && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-400">{dish.origin}</span>
              </>
            )}
            {dish.dietary.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-400">{dish.dietary.join(' / ')}</span>
              </>
            )}
          </div>

          {/* Title & Price */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                {dish.name}
              </h3>
              {dish.frenchName && (
                <div className="text-sm text-neutral-400 italic font-serif mt-1">
                  {dish.frenchName}
                </div>
              )}
            </div>
            <div className="font-mono text-2xl font-semibold text-amber-300 shrink-0 tabular-nums">
              £{dish.price}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 mt-3">
            {dish.description}
          </p>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2.5">
                Key Terroir & Ingredients:
              </div>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs text-neutral-200 bg-white/5 px-3 py-1 rounded-md border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technique */}
          {dish.technique && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Preparation Technique</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {dish.technique}
              </p>
            </div>
          )}

          {/* Wine Pairing */}
          {dish.winePairing && (
            <div className="mb-6 p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono mb-1">
                <Wine className="w-3.5 h-3.5 text-amber-400" />
                <span>Master Sommelier Recommendation</span>
              </div>
              <p className="text-xs text-neutral-200">
                {dish.winePairing}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onAddToTasting(dish)}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
              isAdded
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Tasting Selection</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add to Tasting List</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              onReserveForDish(dish.name);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table for this Dish</span>
          </button>
        </div>

      </div>
    </div>
  );
}
