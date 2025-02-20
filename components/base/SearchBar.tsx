import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Pesquisa de usuários"
      value={query}
      onChange={handleChange}
      className="w-1/2 p-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg text-black
        md:w-1/4"
    />
  );
};

export default SearchBar;
