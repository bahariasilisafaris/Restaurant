import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Wine, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { ReservationData } from '../../types/restaurant';

interface ReservationSectionProps {
  prefilledDish?: string;
  onClearPrefilledDish?: () => void;
}

export default function ReservationSection({
  prefilledDish,
  onClearPrefilledDish
}: ReservationSectionProps) {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days ahead default
    time: '19:30',
    guests: 2,
    seatingArea: 'Main Dining Room',
    occasion: 'Culinary Tasting',
    specialRequests: '',
    dietaryRestrictions: []
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledDish) {
      setFormData(prev => ({
        ...prev,
        specialRequests: prev.specialRequests 
          ? `${prev.specialRequests}\n[Special Request: Please prepare ${prefilledDish}]`
          : `[Special Request: Please prepare ${prefilledDish}]`
      }));
    }
  }, [prefilledDish]);

  const seatingAreas = [
    { name: 'Main Dining Room', desc: 'Candlelit tables with acoustic intimacy' },
    { name: "Chef's Counter", desc: 'Direct view of the 800°C binchotan hearth' },
    { name: 'Private Wine Salon', desc: 'Surrounded by the 1,800 bottle cellar vault' },
    { name: 'Heated Garden Terrace', desc: 'Glass-enclosed courtyard greenery' },
  ] as const;

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30',
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const occasions = [
    'Culinary Tasting',
    'Anniversary',
    'Birthday',
    'Business Dinner',
    'Casual Dining'
  ] as const;

  const dietaryOptions = [
    'None',
    'Pescatarian',
    'Vegetarian',
    'Gluten-Free',
    'Nut Allergy',
    'Shellfish Allergy',
    'Halal'
  ];

  const handleDietaryToggle = (opt: string) => {
    if (opt === 'None') {
      setFormData(prev => ({ ...prev, dietaryRestrictions: [] }));
      return;
    }
    setFormData(prev => {
      const exists = prev.dietaryRestrictions?.includes(opt);
      const updated = exists 
        ? (prev.dietaryRestrictions || []).filter(item => item !== opt)
        : [...(prev.dietaryRestrictions || []), opt];
      return { ...prev, dietaryRestrictions: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const bookingCode = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      const saved: ReservationData = {
        ...formData,
        id: bookingCode,
        createdAt: new Date().toISOString()
      };
      setConfirmedReservation(saved);
      setIsSubmitting(false);

      // Save to localStorage for persistence
      try {
        const past = JSON.parse(localStorage.getItem('aurelia_reservations') || '[]');
        localStorage.setItem('aurelia_reservations', JSON.stringify([saved, ...past]));
      } catch {
        // no-op
      }
    }, 600);
  };

  const resetForm = () => {
    setConfirmedReservation(null);
    if (onClearPrefilledDish) onClearPrefilledDish();
  };

  return (
    <section id="reservation" className="py-24 md:py-32 px-6 bg-[#0c0d0e] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
            Table Reservations
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
            Secure Your Culinary Table
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Reservations open 30 days in advance. For parties of 7 or more or exclusive private cellar takeovers, please contact our concierge directly.
          </p>
        </div>

        {/* Confirmation State */}
        {confirmedReservation ? (
          <div className="bg-neutral-900/80 border border-amber-400/30 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-mono">
              Reservation Confirmed
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 mb-2">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8 font-light">
              A bespoke tasting card and confirmation has been dispatched to{' '}
              <span className="text-amber-300 font-medium">{confirmedReservation.email}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="max-w-lg mx-auto bg-black/50 border border-white/10 rounded-xl p-6 text-left mb-8 space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-neutral-400">BOOKING REFERENCE:</span>
                <span className="text-amber-400 font-bold tracking-wider">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">GUEST NAME:</span>
                <span className="text-white">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">DATE & SEATING:</span>
                <span className="text-white">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">COVERS:</span>
                <span className="text-white">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">SEATING SALON:</span>
                <span className="text-white">{confirmedReservation.seatingArea}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">EXPERIENCE:</span>
                <span className="text-white">{confirmedReservation.occasion}</span>
              </div>
              {confirmedReservation.dietaryRestrictions && confirmedReservation.dietaryRestrictions.length > 0 && (
                <div className="flex justify-between pt-2 border-t border-white/5">
                  <span className="text-neutral-400">DIETARY NOTES:</span>
                  <span className="text-amber-300">{confirmedReservation.dietaryRestrictions.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Dress code & etiquette reminder */}
            <div className="max-w-lg mx-auto p-4 bg-white/5 rounded-lg border border-white/10 text-xs text-neutral-300 text-left mb-8 space-y-1">
              <div className="font-semibold text-amber-300 uppercase tracking-wider font-mono">
                Gentle Reminders
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {RESTAURANT_INFO.dressCode}
              </p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {RESTAURANT_INFO.valetService}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all"
              >
                Book Another Table
              </button>

              <a
                href="#menu"
                className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Review Menu Selections
              </a>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl"
          >
            {/* Seating Salon Selector */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-3">
                1. Select Preferred Seating Experience
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingAreas.map((area) => {
                  const isSelected = formData.seatingArea === area.name;
                  return (
                    <button
                      type="button"
                      key={area.name}
                      onClick={() => setFormData({ ...formData, seatingArea: area.name })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{area.name}</span>
                        {isSelected && <Sparkles className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1 font-light">
                        {area.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date, Time & Covers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Reservation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Seating Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} ({parseInt(slot) < 16 ? 'Lunch' : 'Dinner'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                    className="w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 rounded font-mono text-lg"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-mono text-sm text-amber-300 font-semibold">
                    {formData.guests} {formData.guests === 1 ? 'Cover' : 'Covers'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(10, prev.guests + 1) }))}
                    className="w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 rounded font-mono text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Guest Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Sinclair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alexander@mayfair.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Contact Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 7911 123456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Dining Occasion & Dietary Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Dietary Accommodations
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dietaryOptions.map((opt) => {
                    const isSelected = opt === 'None' 
                      ? (!formData.dietaryRestrictions || formData.dietaryRestrictions.length === 0)
                      : formData.dietaryRestrictions?.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleDietaryToggle(opt)}
                        className={`px-3 py-1 text-xs rounded-md border transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                Special Requests or Sommelier Cellar Inquiries
              </label>
              <textarea
                rows={3}
                placeholder="Discreet seating, specific vintage requests, anniversary flowers, or dietary nuances..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-amber-400/20 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Table Availability...</span>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
