'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartSidebar() {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    openCheckoutModal,
    setCheckoutType
  } = useStore();

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    closeCart();
    setCheckoutType('upi'); // default to online for this button, or could be a choice
    openCheckoutModal();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-black">Your Cart</h2>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={closeCart}
                    className="bg-black text-white px-6 py-2 rounded-full font-bold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm text-black leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-500 hover:text-black"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-black"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-bold text-black">Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-600">Subtotal</span>
                  <span className="font-black text-xl text-black">Rs. {totalAmount}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">Taxes and shipping calculated at checkout</p>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white font-black py-4 rounded-xl text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 flex flex-col items-center leading-tight"
                >
                  <span>BUY NOW VIA UPI</span>
                  <span className="text-xs font-semibold text-green-200">Get Extra 5% Off Automatically!</span>
                </button>
                <button 
                  onClick={() => {
                    closeCart();
                    setCheckoutType('cod');
                    openCheckoutModal();
                  }}
                  className="w-full bg-white text-black border-2 border-black font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cash on Delivery
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
