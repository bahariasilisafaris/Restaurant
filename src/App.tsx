import { useState, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import FoodStage3D from './components/3d/FoodStage3D';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuSection from './components/sections/MenuSection';
import ChefSpecialSection from './components/sections/ChefSpecialSection';
import StorySection from './components/sections/StorySection';
import GallerySection from './components/sections/GallerySection';
import ReservationSection from './components/sections/ReservationSection';
import ContactFooterSection from './components/sections/ContactFooterSection';
import DishDetailModal from './components/ui/DishDetailModal';
import TastingCartDrawer from './components/ui/TastingCartDrawer';
import LightboxModal from './components/ui/LightboxModal';
import { MenuItem, GalleryItem } from './types/restaurant';
import { GALLERY_ITEMS } from './data/restaurantData';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [tastingCart, setTastingCart] = useState<MenuItem[]>([]);
  const [isTastingCartOpen, setIsTastingCartOpen] = useState(false);
  const [activeDishModal, setActiveDishModal] = useState<MenuItem | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);
  const [prefilledDish, setPrefilledDish] = useState<string>('');

  const stage3dRef = useRef<HTMLDivElement>(null);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // Section intersection determination
      const sections = ['hero', 'stage-3d', 'signature', 'menu', 'chef-special', 'story', 'gallery', 'reservation', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tasting cart handlers
  const handleAddToTasting = (item: MenuItem) => {
    setTastingCart(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromTasting = (id: string) => {
    setTastingCart(prev => prev.filter(i => i.id !== id));
  };

  const handleClearTastingCart = () => {
    setTastingCart([]);
  };

  // Reservation redirection handlers
  const scrollToReservation = (dishName?: string) => {
    if (dishName) {
      setPrefilledDish(dishName);
    }
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo3D = () => {
    if (stage3dRef.current) {
      stage3dRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedFromTastingToReservation = () => {
    const dishSummary = tastingCart.map((item, idx) => `${idx + 1}. ${item.name} (£${item.price})`).join(', ');
    setPrefilledDish(`Curated Tasting Course Selection: ${dishSummary}`);
    scrollToReservation();
  };

  const addedItemIds = tastingCart.map(item => item.id);

  return (
    <div className="min-h-screen bg-[#08090a] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        onOpenReservation={() => scrollToReservation()}
        tastingCartCount={tastingCart.length}
        onOpenTastingCart={() => setIsTastingCartOpen(true)}
      />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection
          onExploreMenu={scrollToMenu}
          onReserveTable={() => scrollToReservation()}
          onScrollTo3D={scrollTo3D}
        />
      </div>

      {/* 3D SCROLL & INTERACTIVE CULINARY STAGE (Three.js Skill & User Requirement) */}
      <div id="stage-3d" ref={stage3dRef} className="relative z-10 border-y border-white/5 bg-[#090a0c]">
        {/* Section lead text banner */}
        <div className="pt-16 pb-4 px-6 text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2">
            Dynamic 3D Scroll Gastronomy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
            The Interactive Culinary Canvas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
            Scroll to rotate and transform our signature creations, or switch to 360° inspection mode to examine layers, lighting, and ingredients.
          </p>
        </div>

        {/* 3D WebGL Canvas Component */}
        <FoodStage3D
          scrollProgress={scrollProgress}
          activeSection={activeSection}
          onSelectDishForReservation={(dishName) => scrollToReservation(dishName)}
        />
      </div>

      {/* Signature Dishes Showcase */}
      <SignatureDishesSection
        onSelectDish={(dish) => {
          setActiveDishModal({
            id: dish.id,
            name: dish.title,
            category: 'grill',
            description: dish.description,
            price: dish.price,
            dietary: ['Signature'],
            ingredients: dish.ingredients,
            winePairing: dish.winePairing,
            technique: dish.technique,
            image: dish.image
          });
        }}
        onAddToTasting={handleAddToTasting}
        onReserveForDish={(title) => scrollToReservation(title)}
        addedItemIds={addedItemIds}
      />

      {/* Interactive Menu Experience */}
      <MenuSection
        onOpenDishDetail={(dish) => setActiveDishModal(dish)}
        onAddToTasting={handleAddToTasting}
        addedItemIds={addedItemIds}
      />

      {/* Chef's Special & 10-Course Tasting Symphony */}
      <ChefSpecialSection
        onReserveTasting={() => scrollToReservation("The Aurelia Odyssey: 10-Course Symphony")}
      />

      {/* Story & Philosophy */}
      <StorySection />

      {/* Interactive Photo Gallery */}
      <GallerySection
        onOpenLightbox={(item) => setActiveGalleryItem(item)}
      />

      {/* Luxury Table Reservation */}
      <ReservationSection
        prefilledDish={prefilledDish}
        onClearPrefilledDish={() => setPrefilledDish('')}
      />

      {/* Contact, Google Maps & Footer */}
      <ContactFooterSection
        onReserveClick={() => scrollToReservation()}
      />

      {/* Modals & Slide-out Drawers */}
      <DishDetailModal
        dish={activeDishModal}
        onClose={() => setActiveDishModal(null)}
        onAddToTasting={handleAddToTasting}
        onReserveForDish={(dishTitle) => scrollToReservation(dishTitle)}
        isAdded={activeDishModal ? addedItemIds.includes(activeDishModal.id) : false}
      />

      <TastingCartDrawer
        isOpen={isTastingCartOpen}
        onClose={() => setIsTastingCartOpen(false)}
        items={tastingCart}
        onRemoveItem={handleRemoveFromTasting}
        onClearAll={handleClearTastingCart}
        onProceedToReservation={handleProceedFromTastingToReservation}
      />

      <LightboxModal
        item={activeGalleryItem}
        items={GALLERY_ITEMS}
        onClose={() => setActiveGalleryItem(null)}
        onNavigate={(newItem) => setActiveGalleryItem(newItem)}
      />

    </div>
  );
}
