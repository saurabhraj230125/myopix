import Header from '@/components/Header';
import ProductHero from '@/components/ProductHero';
import ShippingTimeline from '@/components/ShippingTimeline';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialSlider from '@/components/TestimonialSlider';
import Footer from '@/components/Footer';
import StickyActionBar from '@/components/StickyActionBar';
import CartSidebar from '@/components/CartSidebar';
import CheckoutModal from '@/components/CheckoutModal';

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-1 w-full flex flex-col pb-24 md:pb-0">
        <ProductHero />
        <ShippingTimeline />
        <FeaturesSection />
        <TestimonialSlider />
      </main>

      <Footer />
      
      {/* Overlays and Modals */}
      <StickyActionBar />
      <CartSidebar />
      <CheckoutModal />
    </>
  );
}
