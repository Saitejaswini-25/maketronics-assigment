const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="🔍 Search..."
    className="p-2 border rounded shadow-sm w-full md:w-auto"
  />
);

export default SearchBar;
