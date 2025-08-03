"use client";

import { useState } from "react";
import Image from "next/image";
import { FileWarning } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  isMessageVisible?: boolean;
}

const ProductImage = ({ src, alt, width, height, isMessageVisible = true }: ProductImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (imageError) {
    return (
      <div
        className={`flex flex-col gap-2 items-center justify-center bg-gray-300 text-gray-600 text-sm rounded-md`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <FileWarning />
        {isMessageVisible && <span>Image not available</span>}
      </div>
    );
  }

  return (
    <div style={{ width: `${width}px`, height: `${height}px`,overflow: "hidden" }} className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white animate-pulse rounded-md" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover rounded-md bg-white"
        onError={() => setImageError(true)}
        onLoadingComplete={() => setLoading(false)}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
