import styles from "./searchBar.module.css";
import swell from "swell-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// https://nextjs.org/docs/app/api-reference/functions/use-search-params

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const search = searchParams.get("search");

  useEffect(() => {
    const searchProducts = async (search) => {
      swell.init(
        process.env.NEXT_PUBLIC_SWELL_STORE_ID,
        process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
      );
      const props = await swell.products.list({
        // search: search, // Any text string
        where: {
          $or: [
            { "attributes.boat_model": { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
          ],
        },
        // boat_model: [search]
        limit: 25, // Max. 100
        page: 1,
      });
      setItems(props.results);
    };
    searchProducts(search);
  }, [search]);

  useEffect(() => {
    setItems([]);
  }, []);

  return (
    <>
      <div role="search">
        <form>
          <label htmlFor="site-search">Search the site:</label>
          <input type="search" name="search" id="site-search" />
          <input type="submit" value={"Search"} />
        </form>
      </div>
      {/* <p>Sort By</p> */}

      {/* using useRouter */}
      {/* <button
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('sort', 'asc'))
                }}
            >
                ASC
            </button> */}
      {/* <button
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('sort', 'desc'))
                }}
            >
                DESC
            </button> */}
      {/* using <Link> */}
      {/* <Link
                href={
                    // <pathname>?sort=desc
                    pathname + '?' + createQueryString('sort', 'desc')
                }
            >
                DESC
            </Link> */}
      <ul>
        {items &&
          items.map((val, index) => {
            return (
              <li key={index}>
                {val.name}
                <ul style={{ marginLeft: "1em" }}>
                  <li>{val.id}</li>
                  <li>{val.sku}</li>
                  <li>{val.slug}</li>
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default SearchBar;
