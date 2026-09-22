'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">Quick links</h4>
            <nav className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Search</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Information</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">Subscribe to our emails</h4>
            <p className="text-gray-400 text-sm">Join our email list for exclusive offers and the latest news.</p>
            <form className="flex gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="flex-1 bg-white/10 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
              />
              <button 
                type="submit"
                className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026, mx. Myopix
          </p>
          <div className="flex gap-4">
            {/* Payment icons could go here */}
            <span className="text-gray-600 font-medium text-xs">Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
