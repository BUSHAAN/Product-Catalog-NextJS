import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ShoppingCartButtonProps {
  itemCount: number;
  onButtonClick: () => void;
}

const ShoppingCartButton = ({
  itemCount,
  onButtonClick,
}: ShoppingCartButtonProps) => {
  return (
    <div
      onClick={onButtonClick}
      className="relative flex items-center justify-center w-12 h-12 cursor-pointer"
    >
      <ShoppingCart color="#ffffff" size={36} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full"
          >
            <span className="text-xs">{itemCount}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCartButton;
