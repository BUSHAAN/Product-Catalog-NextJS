import useCart from "@/hooks/useCart";
import { CircleAlert, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { base_URL } from "@/services/sevices.constants";
import { Product } from "@/types/product";
import ProductImage from "./ImageComponent";

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  return (
    <motion.div
      key="cart-modal"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded shadow-lg w-[90%] md:w-[40%] h-[70%] flex flex-col overflow-hidden relative">
        <CartModalHead onClose={onClose} />
        <div className="shadow-inner-custom flex-1 overflow-y-auto mx-4 rounded-md">
          <CartModalBody />
        </div>
        <CartModalFooter />
      </div>
    </motion.div>
  );
};

export default CartModal;

const CartModalHead = ({ onClose }: { onClose: () => void }) => (
  <div className="p-4 flex justify-between items-center">
    <h2 className="text-lg font-bold">Shopping Cart</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-red-600">
      <X />
    </button>
  </div>
);

const CartModalBody = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="h-full flex-1 flex items-center justify-center text-gray-500 gap-2">
        <CircleAlert />
        <span>Your cart is empty</span>
      </div>
    );
  }

  return (
    <div className=" px-4 py-2 space-y-3">
      {cartItems.map(({ product, quantity }) => (
        <CartItemCard key={product.id} product={product} quantity={quantity} />
      ))}
    </div>
  );
};

const CartItemCard = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

  return (
    <div className="flex items-center border border-gray-200 rounded p-2 shadow-sm pr-5">
      <ProductImage
        src={`${base_URL}${product.imageUrl}`}
        alt={product.title}
        width={70}
        height={70}
        isMessageVisible={false}
      />
      <div className="flex-1 ml-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center mt-2 gap-2">
        <button
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
          onClick={() => removeItemFromCart(product)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
          onClick={() => addItemToCart(product)}
        >
          +
        </button>
      </div>
      <button
        className="text-red-500 ml-4 hover:text-red-700"
        onClick={() => clearItemFromCart(product)}
      >
        <Trash2 />
      </button>
    </div>
  );
};

const CartModalFooter = () => {
  const { cartItems, clearEntireCart } = useCart();

  const total = cartItems
    .reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
    .toFixed(2);

  return (
    <div className="px-4 py-3 sticky bottom-0 bg-white flex justify-between items-center">
      <button
        onClick={clearEntireCart}
        className="bg-red-100 hover:bg-red-200 transform-colors p-2 rounded-md text-white text-sm"
      >
        Clear Cart
      </button>
      <span className="font-bold text-lg">Total: ${total}</span>
    </div>
  );
};
