import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EditorialDrawer from './components/EditorialDrawer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';
import ConsultationModal from './components/ConsultationModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import BoutiquePage from './pages/BoutiquePage';
import TrendsPage from './pages/TrendsPage';
import BeautyPage from './pages/BeautyPage';
import LifestylePage from './pages/LifestylePage';
import QuizPage from './pages/QuizPage';
import DossierPage from './pages/DossierPage';
import SalonPage from './pages/SalonPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md relative antialiased selection:bg-primary-container selection:text-on-primary-container">
      <ScrollToTop />

      {/* Global Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-24 pb-16 md:pb-8">
        <Routes>
          <Route path="/" element={<HomePage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/home" element={<HomePage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/shop" element={<BoutiquePage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/beauty" element={<BeautyPage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/dossier" element={<DossierPage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/salon" element={<SalonPage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="*" element={<HomePage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* Slide-out & Overlay Drawers */}
      <EditorialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
      <CartDrawer />

      {/* Modals */}
      <CheckoutModal />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

      {/* Floating Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <MainLayout />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
