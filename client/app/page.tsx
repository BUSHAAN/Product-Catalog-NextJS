import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <div className="relative w-screen flex flex-col items-center">
      {/* Header */}
      <div className="sticky top-0 z-10 w-full h-20 bg-black-100 px-7 md:px-15 flex gap-2 md:gap-6 items-center justify-between">
        <Heading title="Product List" />
        <div className="flex-1" />
        <SearchBar />
        <ShoppingCartButton />
      </div>
      {/* Content */}
      <ProductGrid />
    </div>
  );
}
