'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CheckoutModal() {
  const { isCheckoutModalOpen, closeCheckoutModal, checkoutType, cartItems } = useStore();
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<Record<string, any> | null>(null);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 1999;

  const sendOrderToMake = async (data: Record<string, any>) => {
    const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/64qrljh8irr6ophwq6ctfagreryym4d7';
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error sending order to Make.com', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.cart = JSON.stringify(cartItems);
    data.total = totalAmount.toString();
    data.paymentMethod = checkoutType;
    setOrderData(data);
    
    if (checkoutType === 'upi') {
      setStep('payment');
      // Auto-trigger the UPI deep link for mobile devices
      if (typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `upi://pay?pa=7080626215@ptsbi&pn=mx.Myopix&am=${totalAmount}&cu=INR`;
      }
    } else {
      setIsSubmitting(true);
      sendOrderToMake(data).finally(() => {
        setIsSubmitting(false);
        setStep('success');
      });
    }
  };

  const handleUpiPayment = () => {
    setIsSubmitting(true);
    sendOrderToMake(orderData || {}).finally(() => {
      setIsSubmitting(false);
      setStep('success');
    });
  };

  const handleClose = () => {
    closeCheckoutModal();
    // Reset state after animation
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-800">Secure Checkout</span>
                </div>
                <button onClick={handleClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                {step === 'form' && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      {checkoutType === 'cod' ? (
                        <Banknote className="w-6 h-6 text-black" />
                      ) : (
                        <CreditCard className="w-6 h-6 text-black" />
                      )}
                      <h3 className="text-xl font-bold text-black">
                        {checkoutType === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input name="fullName" required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" placeholder="John Doe" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input name="email" required type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" placeholder="john@example.com" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input name="phone" required type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" placeholder="+91 9876543210" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
                        <textarea name="address" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none resize-none h-24" placeholder="House No, Street, Landmark..."></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                        <input name="city" required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">PIN Code</label>
                        <input name="pincode" required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                        <input name="state" required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none" />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center mb-4">
                      <span className="font-bold text-gray-600">Total to pay:</span>
                      <span className="font-black text-xl text-black">Rs. {totalAmount}</span>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors disabled:opacity-70 flex items-center justify-center"
                    >
                      {isSubmitting ? 'Processing...' : (checkoutType === 'cod' ? 'CONFIRM ORDER' : 'PROCEED TO PAY')}
                    </button>
                  </form>
                )}

                {step === 'payment' && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <h3 className="text-xl font-bold text-black mb-2">Scan to Pay via UPI</h3>
                    <p className="text-gray-500 mb-8">Amount: Rs. {totalAmount}</p>
                    
                    {/* Actual QR Code */}
                    <div className="w-56 h-56 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-4 p-2 shadow-sm">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=7080626215@ptsbi&pn=mx.Myopix&am=${totalAmount}&cu=INR&size=200x200`}
                        alt="UPI Payment QR Code"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>

                    <div className="bg-green-50 text-green-800 text-sm font-semibold px-4 py-2 rounded-lg border border-green-200 mb-6 flex items-center gap-2">
                       <span>UPI ID:</span>
                       <span className="font-bold font-mono tracking-tight">7080626215@ptsbi</span>
                    </div>

                    {/* Mobile Deep Link */}
                    <a 
                      href={`upi://pay?pa=7080626215@ptsbi&pn=mx.Myopix&am=${totalAmount}&cu=INR`}
                      className="w-full bg-green-600 text-white font-black py-4 rounded-xl text-lg hover:bg-green-700 transition-colors mb-4 flex items-center justify-center gap-2 shadow-lg shadow-green-600/30"
                    >
                      OPEN UPI APP NATIVELY
                    </a>

                    <button 
                      onClick={handleUpiPayment}
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors disabled:opacity-70 mb-4"
                    >
                      {isSubmitting ? 'Verifying Payment...' : 'SIMULATE PAYMENT SUCCESS'}
                    </button>
                    
                    <button 
                      onClick={() => setStep('form')}
                      className="text-sm font-semibold text-gray-500 hover:text-black transition-colors"
                    >
                      Back to details
                    </button>
                  </div>
                )}

                {step === 'success' && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-black mb-2">Order Confirmed!</h3>
                    <p className="text-gray-600 mb-8 max-w-[250px]">
                      Thank you for your purchase. We've received your order and will begin processing it shortly.
                    </p>
                    <button 
                      onClick={handleClose}
                      className="w-full bg-black text-white font-bold py-4 rounded-xl text-lg hover:bg-gray-900 transition-colors"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
