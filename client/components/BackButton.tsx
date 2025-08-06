'use client';
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <ChevronLeft
      color="white"
      size={32}
      className="cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default BackButton;
