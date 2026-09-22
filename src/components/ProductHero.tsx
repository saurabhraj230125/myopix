'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ShoppingCart, Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';

const IMAGES = [
  "/media_1790063093310.jpg",
  "/productvid.mp4",
  "/media_1790064639614.jpg",
  "/media_1790064650542.jpg",
  "/media_1790064655084.jpg",
  "/media_1790064660034.jpg"
];

export default function ProductHero() {
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, openCheckoutModal, setCheckoutType } = useStore();

  const handleAddToCart = () => {
    addToCart({
      id: 'panca-galaxy-projector',
      name: 'PANCA Galaxy Star Projector',
      price: 1999,
      quantity: 1,
      image: IMAGES[0]
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
    <section className="w-full max-w-7xl mx-auto px-0 md:px-8 py-6 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
      {/* Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Mobile Carousel (Scroll Snap) & Desktop Grid / Main View */}
        <div className="relative w-full aspect-square overflow-hidden md:rounded-2xl">
          <div className="flex w-full h-full snap-x snap-mandatory overflow-x-auto no-scrollbar md:hidden">
            {IMAGES.map((src, i) => (
              src.endsWith('.mp4') ? (
                <video
                  key={i}
                  src={src}
                  className="w-full h-full object-cover shrink-0 snap-center"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setActiveImage(i)}
                />
              ) : (
                <img
                  key={i}
                  src={src}
                  alt={`Product view ${i + 1}`}
                  className="w-full h-full object-cover shrink-0 snap-center"
                  onLoad={() => setActiveImage(i)}
                />
              )
            ))}
          </div>
          {/* Desktop Main Image */}
          <div className="hidden md:block w-full h-full bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {IMAGES[activeImage].endsWith('.mp4') ? (
                  <video
                    src={IMAGES[activeImage]}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={IMAGES[activeImage]}
                    alt="Main product view"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Desktop Thumbnails */}
        <div className="hidden md:flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImage === i ? 'border-black' : 'border-transparent hover:border-gray-300'
              }`}
            >
              {src.endsWith('.mp4') ? (
                <video src={src} className="w-full h-full object-cover" muted playsInline />
              ) : (
                <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 px-4 md:px-0 flex flex-col">
        {/* Reviews Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">(2,378+) Reviews</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight mb-4 tracking-tight">
          PANCA Galaxy Star Projector Night Light USB LED 360° Rotation Lamp
        </h1>

        {/* Pricing */}
        <div className="flex items-center flex-wrap gap-3 mb-6">
          <span className="text-3xl font-black text-black">Rs. 1,999.00</span>
          <span className="text-xl text-gray-400 line-through font-semibold">Rs. 2,999.00</span>
          <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
            <span>🏷️</span> SAVE 33%
          </span>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-6">
          {[
            "Create Your Own Galaxy",
            "Stepless Brightness Control",
            "USB Powered"
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-800 font-medium">
              <CheckCircle2 className="w-5 h-5 text-black" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Urgency Element */}
        <div className="mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-red-600 font-bold text-sm animate-pulse flex items-center gap-1">
              🔥 Selling Fast!
            </span>
            <span className="text-sm font-bold text-red-600">Only 12 left in stock</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-red-200">
            <div className="bg-red-500 h-full w-[12%]" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button 
            onClick={handleBuyUpi}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-lg md:text-xl py-4 rounded-xl transition-transform active:scale-[0.98] shadow-lg shadow-green-600/30 flex flex-col items-center justify-center border-2 border-transparent leading-tight"
          >
            <span>BUY NOW VIA UPI</span>
            <span className="text-xs font-semibold text-green-200">Get Extra 5% Off Automatically!</span>
          </button>

          <button 
            onClick={handleBuyNow}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold text-lg py-4 rounded-xl transition-transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
          >
            <Truck className="w-5 h-5" />
            ORDER VIA CASH ON DELIVERY
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white hover:bg-gray-50 text-black font-bold text-lg py-3 rounded-xl transition-transform active:scale-[0.98] border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            ADD TO CART
          </button>
        </div>

        {/* Safe Checkout Badges */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-500 mt-2">
          <span>🔒 Secure Checkout</span>
          <span>•</span>
          <span>Free Shipping</span>
          <span>•</span>
          <span>7-Day Returns</span>
        </div>
      </div>
    </section>
  );
}
