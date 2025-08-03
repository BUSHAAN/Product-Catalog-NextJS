import { Product } from "@/types/product";
import { AnimatePresence, motion } from "motion/react";
import { base_URL } from "@/services/sevices.constants";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import ProductImage from "./ImageComponent";

interface ProductCardProps {
  product: Product;
  ref?: React.Ref<HTMLDivElement>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, ref }) => {
  const router = useRouter();
  const { addItemToCart } = useCart();
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      key={product.id}
      layoutId={`card-${product.id}`}
      className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-101 transition-transform duration-200 flex flex-col"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="self-center flex flex-1 items-center justify-center bg-gray-100">
        <ProductImage
          src={`${base_URL}${product.imageUrl}`}
          alt={product.title}
          width={300}
          height={300}
        />
      </div>
      <div className="p-4 ">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-lg font-bold text-red-100">${product.price}</p>
        <p className="text-sm text-gray-700 mt-2">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>
        <button
          className="mt-4 w-full bg-red-100 text-white px-4 py-2 rounded hover:bg-red-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            addItemToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
  );
};

export default ProductCard;
