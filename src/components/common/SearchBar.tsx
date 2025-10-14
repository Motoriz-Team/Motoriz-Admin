import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Cari data..." 
}: SearchBarProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchBar;