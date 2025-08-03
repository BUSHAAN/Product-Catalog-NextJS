import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CircleAlert } from "lucide-react";

interface ErrorMessageProps {
  error: SerializedError | FetchBaseQueryError | undefined;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  const errorMessage =
    (error as { data: { message: string } })?.data?.message ||
    (error && "error" in error && error.error) ||
    "Unknown error occurred";
  return (
    <div className="w-full flex justify-center items-center text-red-500 text-lg gap-6">
      <CircleAlert size={32} className="mb-4" />
      <div className="flex flex-col ">
        <h2 className="font-bold mb-2 text-2xl">Oops! Something went wrong</h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
