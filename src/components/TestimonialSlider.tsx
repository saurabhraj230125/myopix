'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const REVIEWS = [
  {
    quote: "Raat mein ceiling par moon effect bahut beautiful lagta hai. Bedroom ke liye kaafi nice product hai.",
    author: "Priya, Pune",
    rating: 5
  },
  {
    quote: "Room ka pura vibe change ho gaya! ✨",
    author: "Rahul, Delhi",
    rating: 5
  },
  {
    quote: "Absolutely love the relaxing ambience. Best purchase for my gaming setup.",
    author: "Aarav, Mumbai",
    rating: 5
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-black text-white py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-yellow-400">Loved by Thousands</h2>
        
        <div className="relative h-64 md:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full flex flex-col items-center"
            >
              <Quote className="w-10 h-10 text-gray-700 mb-6" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 px-4 md:px-0">
                "{REVIEWS[currentIndex].quote}"
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-bold tracking-wide">— {REVIEWS[currentIndex].author}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i ? 'bg-yellow-400 w-6' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
