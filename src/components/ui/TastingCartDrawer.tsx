import { X, Trash2, UtensilsCrossed, Calendar, Clock, ArrowRight } from 'lucide-react';
import { MenuItem } from '../../types/restaurant';

interface TastingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onProceedToReservation: () => void;
}

export default function TastingCartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onProceedToReservation
}: TastingCartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const estimatedHours = Math.max(1.5, (items.length * 20 + 30) / 60).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-xl text-white font-normal">
                Curated Tasting Selection
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Course List */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 text-neutral-400">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-neutral-500">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div className="font-serif text-lg text-white mb-1">Your Tasting List is Empty</div>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Explore our menu and add courses to curate your personalized culinary progression.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-white/5">
                  <span>{items.length} Selected {items.length === 1 ? 'Course' : 'Courses'}</span>
                  <button
                    onClick={onClearAll}
                    className="text-neutral-500 hover:text-rose-400 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-start justify-between gap-3 p-3.5 bg-neutral-900/60 border border-white/5 rounded-xl group hover:border-white/15 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400/90 uppercase">
                        <span>Course #{index + 1}</span>
                        <span>·</span>
                        <span className="text-neutral-400">{item.category}</span>
                      </div>
                      <div className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors mt-0.5">
                        {item.name}
                      </div>
                      <div className="font-mono text-xs text-amber-300 mt-1">
                        £{item.price}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors rounded hover:bg-white/5"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer with Calculation & Booking Transfer */}
          {items.length > 0 && (
            <div className="p-6 bg-neutral-900/90 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Experience Pacing:</span>
                </div>
                <span className="text-white font-semibold">~{estimatedHours} Hours</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-sm">
                <span className="text-neutral-300 font-serif">Curated Menu Total:</span>
                <span className="font-mono text-xl font-semibold text-amber-300">
                  £{subtotal}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToReservation();
                }}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table with this Tasting</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-neutral-500 font-mono">
                Your selections will be pre-filled in your reservation notes for Chef Marcus Vance.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
