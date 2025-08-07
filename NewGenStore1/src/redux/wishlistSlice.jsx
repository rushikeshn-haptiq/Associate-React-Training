import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const loadWishlist = () => {
  const stored = localStorage.getItem("wishlist");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // If parsing fails, return empty array
      return [];
    }
  }
  return [];
};

// Save wishlist to localStorage
const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        saveWishlist(state); // Save after mutation
      }
    },
    removeFromWishlist: (state, action) => {

      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveWishlist(state); // Save after mutation
      }

    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
