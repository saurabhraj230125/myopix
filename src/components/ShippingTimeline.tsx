import { ShoppingCart, Truck, Package } from 'lucide-react';

export default function ShippingTimeline() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 border-t border-gray-100">
      <h3 className="text-xl font-bold text-black mb-6 text-center md:text-left">Estimated Delivery</h3>
      
      <div className="relative flex justify-between items-center max-w-3xl mx-auto md:mx-0 pt-4">
        {/* Progress Line */}
        <div className="absolute top-[22px] left-[10%] right-[10%] h-1 bg-gray-200 -z-10">
          <div className="h-full bg-black w-1/3"></div>
        </div>

        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 w-1/3 text-center">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-black">Ordered</span>
            <span className="text-xs text-gray-500 font-medium">Sep 22nd</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2 w-1/3 text-center">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-500 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-400">Order Ready</span>
            <span className="text-xs text-gray-400 font-medium">Sep 23rd - 24th</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 w-1/3 text-center">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-500 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-400">Delivered</span>
            <span className="text-xs text-gray-400 font-medium">Oct 2nd - 4th</span>
          </div>
        </div>
      </div>
    </section>
  );
}
