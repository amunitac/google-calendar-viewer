const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <input
      type="text"
      placeholder="Search events..."
      className="border border-gray-300 rounded-md p-2 flex-grow"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;