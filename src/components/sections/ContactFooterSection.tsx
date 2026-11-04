import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Navigation, 
  ExternalLink, 
  ArrowUp, 
  Check, 
  Calendar 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface ContactFooterSectionProps {
  onReserveClick: () => void;
}

export default function ContactFooterSection({ onReserveClick }: ContactFooterSectionProps) {
  const [mapMode, setMapMode] = useState<'map' | 'directions'>('map');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#060708] text-white pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Split: Contact Info & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Location & Hospitality Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
                Mayfair Residence
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-6">
                Visit & Contact Aurelia
              </h2>

              <div className="space-y-6 text-sm text-neutral-300 font-light">
                
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Mayfair Promenade</div>
                    <div className="text-neutral-400 text-xs mt-0.5">{RESTAURANT_INFO.address}</div>
                    <div className="text-neutral-500 text-[11px] font-mono mt-0.5">Valet Entrance: Curzon Street</div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`} 
                        className="hover:text-amber-300 transition-colors font-mono"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                      <button
                        onClick={copyPhoneToClipboard}
                        className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-neutral-400 hover:text-white"
                        title="Copy phone"
                      >
                        {copiedPhone ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-neutral-500 text-[11px]">Direct Concierge Line</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <a 
                      href={`mailto:${RESTAURANT_INFO.email}`} 
                      className="hover:text-amber-300 transition-colors font-mono"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                    <div className="text-neutral-500 text-[11px]">Private Salons & Sommelier Enquiries</div>
                  </div>
                </div>

                {/* WhatsApp Concierge */}
                <div className="flex items-center gap-3.5">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <a 
                      href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>Connect with Head Concierge on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="text-neutral-500 text-[11px]">Instant table changes & dietary notes</div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider mb-2.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Service Hours</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {RESTAURANT_INFO.openingHours.map((h, i) => (
                      <div key={i} className="flex justify-between text-neutral-400">
                        <span>{h.days}:</span>
                        <span className="text-neutral-200 font-mono">
                          {h.dinner !== 'Closed' ? `Dinner ${h.dinner}` : h.dinner}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onReserveClick}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Mayfair Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Luxury Interactive Embed */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>51°30'26.6"N 0°08'40.1"W · MAYFAIR, LONDON</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMapMode('map')}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase transition-colors ${
                    mapMode === 'map' ? 'bg-amber-400 text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Satellite Map
                </button>
                <button
                  onClick={() => setMapMode('directions')}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase transition-colors ${
                    mapMode === 'directions' ? 'bg-amber-400 text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Arrival Guide
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 flex-1 min-h-[380px] bg-neutral-900 group">
              {mapMode === 'map' ? (
                <>
                  <iframe
                    title="Aurelia Mayfair Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.4326588961726!2d-0.1492349233829037!3d51.50527371151603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052f6c0d65b7%3A0xb3bf4849206771d9!2sCurzon%20St%2C%20Mayfair%2C%20London%20W1J%208HQ%2C%20UK!5e0!3m2!1sen!2suk!4v1714000000000!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[420px]"
                  />
                  {/* Styled Floating Pin Marker Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-neutral-950/90 border border-white/15 p-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-white">AURELIA Haute Cuisine</div>
                      <div className="text-[11px] text-neutral-400 font-mono">42 Mayfair Promenade, London</div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Curzon+Street+Mayfair+London"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                /* Directions & Transit Guide View */
                <div className="p-8 h-full flex flex-col justify-between bg-neutral-950">
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-4">Arrival & Valet Services</h3>
                    <div className="space-y-4 text-xs text-neutral-300">
                      <div>
                        <div className="font-semibold text-amber-300 mb-1 font-mono uppercase">Private Chauffeured & Valet:</div>
                        <p className="text-neutral-400 leading-relaxed">
                          Pull up directly to our covered porte-cochère on Curzon Street. Our uniformed valet team will attend to your vehicle upon arrival.
                        </p>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-300 mb-1 font-mono uppercase">London Underground:</div>
                        <p className="text-neutral-400 leading-relaxed">
                          Green Park Station (Piccadilly, Victoria & Jubilee lines) is a 4-minute walk through Berkeley Square.
                        </p>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-300 mb-1 font-mono uppercase">Helicopter Transfers:</div>
                        <p className="text-neutral-400 leading-relaxed">
                          Private transfers available from London Battersea Heliport with our Rolls-Royce Phantom house car.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Curzon+Street+Mayfair+London"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 mt-6"
                  >
                    <span>Open in Google Maps Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Clean Footer Bottom (Frontend Design Skill §1.B) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-mono">
          
          <div className="flex items-center gap-4">
            <span className="text-white font-serif tracking-widest uppercase">{RESTAURANT_INFO.name}</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} Aurelia Mayfair Group Ltd.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#menu" className="hover:text-neutral-300 transition-colors">Menu</a>
            <a href="#signature" className="hover:text-neutral-300 transition-colors">Signatures</a>
            <a href="#story" className="hover:text-neutral-300 transition-colors">Philosophy</a>
            <a href="#reservation" className="hover:text-neutral-300 transition-colors">Reservations</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
