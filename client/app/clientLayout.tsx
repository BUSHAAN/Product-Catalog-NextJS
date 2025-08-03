"use client";

import CartModal from "@/components/CartModal";
import useCart from "@/hooks/useCart";
import { AnimatePresence } from "motion/react";
import { Toaster } from "react-hot-toast";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isCartModalOpen, toggleCartVisibility } = useCart();
  return (
    <>
      {children}
      {/* Cart Modal */}
      <AnimatePresence>
        {isCartModalOpen && <CartModal onClose={toggleCartVisibility} />}
      </AnimatePresence>
      <Toaster
          position="bottom-right"
        />
    </>
  );
};

export default ClientLayout;
