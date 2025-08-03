"use client";

import { Product } from "@/types/product";
import { useEffect, useMemo, useState } from "react";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import useSearchValue from "@/hooks/useSearchValue";
import ProductCard from "@/components/ProductCard";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import useCart from "@/hooks/useCart";
import { useGetProductsQuery } from "@/services/api/productsApi";
import ErrorMessage from "@/components/ErrorMessage";
import { useInView } from "react-intersection-observer";
import { CircleAlert, Loader } from "lucide-react";
import { motion } from "motion/react";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { debouncedSearchValue } = useSearchValue();
  const { totalnumberOfItems, toggleCartVisibility } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { ref, inView } = useInView({ threshold: 1 });

  const params = useMemo(
    () => ({
      page,
      limit: 12,
      search: debouncedSearchValue,
    }),
    [page, debouncedSearchValue]
  );

  const {
    data: { data: products = [], total } = {},
    isError,
    error,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetProductsQuery(params);

  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (products.length) {
      setAllProducts((prev) =>
        [...prev, ...products].filter(
          (product: Product, index, self: Product[]) =>
            index === self.findIndex((t) => t.id === product.id)
        )
      );
    }
    console.log("Products fetched:", products.length);
  }, [products]);

  useEffect(() => {
    if (
      inView &&
      (page * 12 < total || total === 0) &&
      !isLoading &&
      !isFetching &&
      !isUninitialized
    ) {
      setPage((prev) => prev + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="relative w-screen flex flex-col items-center">
      {/* Header */}
      <div className="sticky top-0 z-10 w-full h-20 bg-black-100 px-7 md:px-15 flex gap-2 md:gap-6 items-center justify-between">
        <Heading title="Product List" />
        <div className="flex-1" />
        <SearchBar />
        <ShoppingCartButton
          itemCount={totalnumberOfItems}
          onButtonClick={toggleCartVisibility}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-[85%]">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center w-full h-[70vh]">
            <Loader size={48} className="animate-spin text-gray-600" />
          </div>
        ) : !isUninitialized && isError ? (
          <div className="col-span-full flex justify-center items-center h-[70vh]">
            <ErrorMessage error={error} />
          </div>
        ) : allProducts.length > 0 ? (
          allProducts.map((product: Product, index) => {
            const isLastProduct = index === allProducts.length - 1;
            return (
              <ProductCard
                key={product.id}
                product={product}
                ref={isLastProduct ? ref : null}
              />
            );
          })
        ) : (
          <motion.div
            className="col-span-full text-center text-gray-500 flex justify-center items-center w-full h-[70vh] text-2xl gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }} // 500ms delay
          >
            <CircleAlert size={32} className="text-gray-500" />
            <p>No products found.</p>
          </motion.div>
        )}
      </div>
      {/* Loading spinner for new pages */}
      {isFetching && !isLoading && allProducts.length > 0 && (
        <div className="my-4">
          <Loader size={48} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
