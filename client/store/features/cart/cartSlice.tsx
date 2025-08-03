import { CartItem } from "@/types/cartItem";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  isCartModalOpen?: boolean;
}

const initialState: CartState = {
  items: [],
  isCartModalOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCartModal: (state) => {
      state.isCartModalOpen = !state.isCartModalOpen;
    },
  },
});

export const { addItem, removeItem, clearItem, clearCart, toggleCartModal } =
  cartSlice.actions;
export default cartSlice.reducer;
