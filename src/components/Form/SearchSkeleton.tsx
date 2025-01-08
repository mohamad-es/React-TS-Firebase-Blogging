

const SearchSkeleton = () => {
  return (
    <div className="relative">
      <input
        className="input h-10 outline-1 outline-slate-200 w-80 skeleton"
        placeholder="Search blog title"
        disabled
      />
    </div>
  );
};

export default SearchSkeleton;
