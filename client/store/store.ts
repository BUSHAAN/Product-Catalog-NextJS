import { productsApi } from '@/services/api/productsApi';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/features/cart/cartSlice'; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;