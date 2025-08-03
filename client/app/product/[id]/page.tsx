"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Product } from "@/types/product";
import { base_URL } from "@/services/sevices.constants";
import { useEffect } from "react";
import { selectProductById } from "@/store/selectors/productSelectors";
import Heading from "@/components/Heading";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import useCart from "@/hooks/useCart";
import { ChevronLeft } from "lucide-react";
import ProductImage from "@/components/ImageComponent";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = useAppSelector(selectProductById(id));

  useEffect(() => {
    if (!product) {
      router.push("/");
    }
  }, [product, router]);

  const { totalnumberOfItems, toggleCartVisibility, addItemToCart } = useCart();

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="sticky top-0 z-10 w-full h-20 bg-black-100 pr-15 pl-7 flex gap-6 items-center justify-between">
        <ChevronLeft
          color="white"
          size={32}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <Heading title="Product Details" />
        <div className="flex-1" />
        <ShoppingCartButton
          itemCount={totalnumberOfItems}
          onButtonClick={toggleCartVisibility}
        />
      </div>
      {product && (
        <div className="flex flex-col lg:flex-row gap-6 items-center p-6 w-[80%]">
          <ProductImage
            src={`${base_URL}${product.imageUrl}`}
            alt={product.title}
            width={400}
            height={400}
          />
          <div className="ml-8 flex-1">
            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <p className="text-2xl font-semibold text-red-100 mb-3">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-black-100 text-lg mb-4">{product.description}</p>
            <p className="text-black-100 text-md mb-4">{`Category: ${product.category}`}</p>
            <button
                onClick={() => addItemToCart(product)}
                className=" bg-red-100 rounded-md py-2 px-4 w-fit hover:bg-red-200 transition-colors"
            >
              <p className="text-white text-md">{`Add to Cart`}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
