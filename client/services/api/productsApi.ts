"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./config";
import { Product } from "@/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery("products"),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "",
        method: "GET",
        params: {
          page,
          limit,
          search,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((product: Product) => ({
                type: "Product" as const,
                id: product.id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
