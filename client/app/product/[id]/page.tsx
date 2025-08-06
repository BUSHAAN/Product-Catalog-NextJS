import Heading from "@/components/Heading";
import ProductDetailsview from "@/components/ProductDetailsview";
import ShoppingCartButton from "@/components/ShoppingCartButton";

export default function ProductDetailPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="sticky top-0 z-10 w-full h-20 bg-black-100 pr-15 pl-7 flex gap-6 items-center justify-between">
        <Heading title="Product Details" />
        <div className="flex-1" />
        <ShoppingCartButton />
      </div>
      <ProductDetailsview />
    </div>
  );
}
