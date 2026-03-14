import { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  onSearch: (text: string) =>  void;
}

export const SearchInput = ({
  onSearch,
}: SearchInputProps) => {
  const [searchvalue, setSearchValue] = useState('');
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!hasTyped.current) return;

    const id = setTimeout(() => {
      onSearch?.(searchvalue);
    }, 500);
    return () => clearTimeout(id);
  }, [searchvalue, onSearch]);

  return (
    <input 
      type="search" 
      className="bg-inherit rounded-lg border border-white text-white p-1 outline-none px-4 py-1" 
      onChange={(e) => {
        hasTyped.current = true;
        setSearchValue(e.target.value);
      }}
      value={searchvalue}
    />
  );
}