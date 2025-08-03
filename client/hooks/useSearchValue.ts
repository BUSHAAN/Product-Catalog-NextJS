import { useQueryState } from "nuqs";
import { useDebounce } from "react-haiku";

const useSearchValue = () => {
  const [searchValue, setSearchValue] = useQueryState("search", {
    defaultValue: "",
  });

  const debouncedSearchValue = useDebounce(searchValue, 500);

  return {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
  };
};

export default useSearchValue;
