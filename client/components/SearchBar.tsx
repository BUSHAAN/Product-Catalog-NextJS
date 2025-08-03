"use client";
import useSearchValue from "@/hooks/useSearchValue";
import { Search } from "lucide-react";

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchValue();
  return (
    <div
      style={{ borderRadius: "9999px" }}
      className="flex bg-white justify-between items-center overflow-hidden "
    >
      <div className="px-4 py-2 ">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[100] md:w-[200] bg-transparent outline-none text-black placeholder:text-gray-500"
        />
      </div>
      <div className="w-15 bg-red-100 h-10 flex items-center justify-center pr-1">
        <Search color="white" />
      </div>
    </div>
  );
};

export default SearchBar;
