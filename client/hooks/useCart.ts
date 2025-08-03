import {
  addItem,
  clearCart,
  clearItem,
  removeItem,
  toggleCartModal,
} from "@/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartModalOpen = useAppSelector((state) => state.cart.isCartModalOpen);
  // This hook can be used to manage cart state, such as adding/removing items, calculating totals, etc.
  // It can utilize Redux or any other state management solution as needed.

  const totalnumberOfItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addItemToCart = (item: Product) => {
    // Logic to add item to cart
    dispatch(addItem(item));
    toast.success(`${item.title} added to cart`);
  };
  const removeItemFromCart = (item: Product) => {
    // Logic to remove item from cart
    dispatch(removeItem(item));
    toast.success(`${item.title} removed from cart`);
  };

  const clearItemFromCart = (item: Product) => {
    // Logic to clear a specific item from the cart
    dispatch(clearItem(item));
    toast.success(`${item.title} cleared from cart`);
  };
  const clearEntireCart = () => {
    // Logic to clear the entire cart
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const toggleCartVisibility = () => {
    // Logic to toggle the cart modal visibility
    dispatch(toggleCartModal());
  }

  return {
    cartItems,
    totalnumberOfItems,
    isCartModalOpen,
    toggleCartVisibility,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    clearEntireCart,
  };
};

export default useCart;
