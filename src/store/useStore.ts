import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface StoreState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  
  // Checkout flow
  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
  checkoutType: 'cod' | 'upi' | null;
  setCheckoutType: (type: 'cod' | 'upi' | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
        isCartOpen: true
      };
    }
    return { 
      cartItems: [...state.cartItems, item],
      isCartOpen: true
    };
  }),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cartItems: state.cartItems.map(i => 
      i.id === id ? { ...i, quantity } : i
    )
  })),

  isCheckoutModalOpen: false,
  openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
  closeCheckoutModal: () => set({ isCheckoutModalOpen: false, checkoutType: null }),
  checkoutType: null,
  setCheckoutType: (type) => set({ checkoutType: type }),
}));
