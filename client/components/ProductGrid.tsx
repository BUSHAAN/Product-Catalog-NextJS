"use client";

import useSearchValue from "@/hooks/useSearchValue";
import { useGetProductsQuery } from "@/services/api/productsApi";
import { Product } from "@/types/product";
import { CircleAlert, Loader } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import ErrorMessage from "./ErrorMessage";
import { motion } from "motion/react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const { debouncedSearchValue } = useSearchValue();

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
    <div className="w-full flex flex-col items-center">
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
};

export default ProductGrid;
