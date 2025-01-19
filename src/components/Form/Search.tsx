import { Dispatch, SetStateAction, useState } from "react";

type Props<T> = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setFiltered: Dispatch<SetStateAction<T[]>>;
  searchData: (query: string) => Promise<T[]>;
};

const Search = <T,>({
  searchQuery,
  setSearchQuery,
  setFiltered,
  searchData,
}: Props<T> ) => {

  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchLoading(true);

    if (query) {
      const data = await searchData(query);
      setFiltered(data);
    } else {
      setFiltered([]);
    }

    setSearchLoading(false);
  };

  return (
    <div className="relative">
      <input
        className="input border-gray-300 md:w-80"
        type="text"
        placeholder="Search blog title"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchLoading && (
        <div className="text-center absolute top-2.5 end-3">
          <div className="loading loading-spinner loading-sm" />
        </div>
      )}
    </div>
  );
};

export default Search;
