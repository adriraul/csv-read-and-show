import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import { Data } from "../types";
import { searchData } from "../services/search";

const DEBOUNCE_TIME = 300;

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") || "";
  });

  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathname =
      debouncedSearch == "" ? window.location.pathname : `?q=${search}`;
    window.history.replaceState({}, "", newPathname);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!debouncedSearch) {
      setData(initialData);
      return;
    }
    searchData(debouncedSearch).then((response) => {
      const [error, newData] = response;
      if (error) {
        toast.error(error.message);
        return;
      }
      if (newData) {
        setData(newData);
      }
    });
  }, [debouncedSearch, initialData]);

  return (
    <div>
      <h1>Search</h1>{" "}
      <input
        className="search-input"
        onChange={handleSearch}
        defaultValue={search}
        type="search"
        placeholder="Buscar información..."
      />
      <ul className="data-list">
        {data.map((row, index) => (
          <li key={`${row.id}-${index}`} className="data-list-item">
            <article className="data-article">
              {Object.entries(row).map(([key, value]) => (
                <p key={`${row.id}-${key}`} className="data-entry">
                  <strong className="data-key">{key}:</strong>{" "}
                  <span className="data-value">{value}</span>
                </p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
