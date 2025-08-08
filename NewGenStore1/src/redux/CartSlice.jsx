import { createSlice } from '@reduxjs/toolkit';

// Helper to get unit price from payload
function getUnitPrice(payload) {
  return typeof payload.price === 'number' ? payload.price : 0;
}

// Helper to load cart items from localStorage
function loadCartItems() {
  try {
    const item = localStorage.getItem('cartItems');
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isOpen: false,
    items: loadCartItems(),
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          unitPrice: getUnitPrice(action.payload),
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (type === 'increment') {
          item.quantity += 1;
        } else if (type === 'decrement' && item.quantity > 1) {
          item.quantity -= 1;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
  },
});

export const { openCart, closeCart, addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;