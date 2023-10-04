import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { searchProducts } from "../../../lib/operations-swell";
import { throttle } from "lodash";
import LoadingDots from "../loadingDots/loadingDots";
import styles from "./searchInput.module.css";
import Link from "next/link";

const SearchInput = ({ props }) => {
  const [search, setSearch] = useState(
    props && props.initialSearch && String(props.initialSearch)
  );
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getProducts = async (searchTerm) => {
    setLoading(true);
    if (searchTerm.length === 0) {
      setProducts([]);
    } else {
      const results = await searchProducts(
        String(searchTerm),
        // TODO: pagination
        20,
        0
      );
      const names = results.results.map((result) => {
        return { name: result.name, slug: result.slug };
      });
      setSearch(searchTerm);
      setProducts(names);
      setLoading(false);
      //   if (searchTerm && props) {
      //     props.onSearch(searchTerm);
      //   }
    }
  };

  useEffect(() => {
    if (search) {
      getProducts(search);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const throttleSearch = useCallback(throttle(getProducts), []);
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        name="search"
        //   defaultValue={props && props.initialSearch}
        placeholder={
          isMobile
            ? "Search for a product..."
            : "Search for a product, part, or sailboat model..."
        }
        onChange={(event) => throttleSearch(event.target.value)}
        onKeyDown={props.handleSearch}
        autoComplete="off"
      />
      {/* 
      <ul className={styles.dropdown}>
        {products.map((product) => {
          return (
            <li key={product.slug} className={styles.listItem}>
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default SearchInput;
