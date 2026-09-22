'use client';

import { Search, User, ShoppingCart } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Header() {
  const { openCart, cartItems } = useStore();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-center py-2 text-xs md:text-sm font-semibold tracking-wide">
        <span className="text-yellow-400">⚡</span> 33% OFF - LIMITED TIME OFFER <span className="text-yellow-400">⚡</span>
      </div>
      
      {/* Main Header */}
      <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/media_1790063093317.png" alt="mx. Myopix" className="h-10 md:h-12 object-contain" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-black hover:text-gray-600 transition-colors" aria-label="Search">
            <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
          </button>
          <button className="text-black hover:text-gray-600 transition-colors hidden sm:block" aria-label="User Profile">
            <User className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
          </button>
          <button 
            className="text-black hover:text-gray-600 transition-colors relative"
            onClick={openCart}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
