import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const loadWishlist = () => {
  const stored = localStorage.getItem("wishlist");
  return stored ? JSON.parse(stored) : [];
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
      const updated = state.filter((item) => item.id !== action.payload);
      saveWishlist(updated); // Save after mutation
      return updated;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
