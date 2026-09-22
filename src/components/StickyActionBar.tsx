'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, openCheckoutModal, setCheckoutType } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the main hero buttons
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: 'panca-galaxy-projector',
      name: 'PANCA Galaxy Star Projector',
      price: 1999,
      quantity: 1,
      image: '/media_1790063093310.jpg'
    });
  };

  const handleBuyNow = () => {
    setCheckoutType('cod');
    openCheckoutModal();
  };

  const handleBuyUpi = () => {
    setCheckoutType('upi');
    openCheckoutModal();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-2xl z-40 md:px-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Desktop Product Info */}
            <div className="hidden md:flex items-center gap-4">
              <img 
                src="/media_1790063093310.jpg" 
                alt="Product thumbnail" 
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-black">PANCA Galaxy Star Projector</span>
                <span className="text-sm font-bold text-gray-600">Rs. 1,999.00</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={handleBuyUpi}
                className="flex-1 md:flex-none bg-green-600 text-white font-bold py-3 px-4 rounded-lg active:scale-95 transition-transform text-sm md:w-48 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                Buy via UPI
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 md:flex-none bg-black text-white font-bold py-3 px-4 rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm md:w-32 whitespace-nowrap shadow-md"
              >
                COD
              </button>
              <button 
                onClick={handleAddToCart}
                className="hidden sm:block flex-1 md:flex-none bg-white border border-gray-300 text-black font-bold py-3 px-4 rounded-lg active:scale-95 transition-transform text-sm md:w-32"
              >
                Cart
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
