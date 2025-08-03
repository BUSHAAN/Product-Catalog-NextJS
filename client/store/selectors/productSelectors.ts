import { productsApi } from "@/services/api/productsApi";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";

export const selectProductById = (id: string) => (state: RootState): Product | undefined => {
  const cacheState = productsApi.util.selectCachedArgsForQuery(state, "getProducts");
  if (!cacheState) return undefined;

  for (const args of cacheState) {
    const result = productsApi.endpoints.getProducts.select(args)(state);
    const product = result.data?.data?.find((p: Product) => p.id.toString() === id);
    if (product) return product;
  }

  return undefined;
};
