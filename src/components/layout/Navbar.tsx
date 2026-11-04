import { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  tastingCartCount: number;
  onOpenTastingCart: () => void;
}

export default function Navbar({
  onOpenReservation,
  tastingCartCount,
  onOpenTastingCart
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Signature Dishes', href: '#signature' },
    { label: 'The Experience', href: '#story' },
    { label: "Chef's Table", href: '#chef-special' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark (Top Bar Contract) */}
        <a 
          href="#" 
          className="font-serif text-2xl md:text-3xl font-normal tracking-[0.2em] text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 uppercase"
        >
          {RESTAURANT_INFO.name}
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-widest uppercase text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + tasting cart indicator */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Tasting Cart Button */}
          <button
            onClick={onOpenTastingCart}
            className="relative p-2 text-neutral-300 hover:text-amber-300 transition-colors rounded-lg hover:bg-white/5"
            title="View Selected Tasting Courses"
            aria-label="View tasting selections"
          >
            <UtensilsCrossed className="w-4 h-4" />
            {tastingCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {tastingCartCount}
              </span>
            )}
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-200 shadow-md shadow-amber-500/10 whitespace-nowrap shrink-0 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve a Table</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-white/10 px-6 py-6 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-amber-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
