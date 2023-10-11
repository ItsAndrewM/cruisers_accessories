"use client";

import { Suspense, useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import {
  getAllAttributes,
  getFilteredProducts,
  getPageCount,
  getPaginatedItems,
  searchProducts,
} from "../../lib/operations-swell";
import CollectionCard from "../../components/collectionCard/collectionCard";
import styles from "./allProductsGrid.module.css";
import { useRouter } from "next/router";
import PaginationBar from "@/components/paginationBar/paginationBar";
import AttributesFilter from "@/components/attributesFilter/attributesFilter";
import CategorySidebar from "@/components/categorySidebar/categorySidebar";
import SkeletonGrid from "@/components/skeletonGrid/skeletonGrid";
import SkeletonPagination from "../collectionGrid/skeletonPagination";
import SkeletonFilter from "@/components/attributesFilter/skeletonFilter";
import FilterBar from "@/components/filterBar/filterBar";
import accordianStyles from "../../components/accordion/accordion.module.css";

export const AllProductsGrid = ({
  offset = 1,
  limit = 24,
  cardProps,
  highlightCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [pageNums, setPageNums] = useState(1);
  const [attributes, setAttributes] = useState();
  const [results, setResults] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const query = router.asPath.split("?")[1];
      const filtered = await getFilteredProducts(query);
      const data = await filtered.json();
      if (data.data.count > 0) {
        setAllProducts(data.data.results);
        setPageNums(data.data.page_count);
      } else {
        const result = await getPaginatedItems(
          router.query?.page || 1,
          "products",
          router.query?.sort || "name asc"
        );
        const paginationData = await getPageCount("products");
        setPageNums(paginationData.page_count);
        setAllProducts(result);
      }
      setLoading(false);
    };
    if (!router.query.search) {
      fetchAllProducts();
    } else {
      const fetchSearchedProducts = async () => {
        setLoading(true);
        const data = await searchProducts(
          router.query.search,
          router.query.page || 1
        );
        setResults(data.count);
        setAllProducts(data.results);
        setPageNums(data.page_count);
        setLoading(false);
      };
      fetchSearchedProducts();
    }
  }, [router.query]);

  useEffect(() => {
    const fetchAllAttributes = async () => {
      const allAttributes = await getAllAttributes();
      setAttributes(allAttributes);
    };
    fetchAllAttributes();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.desktop}>
        <CategorySidebar />
        {!attributes ? (
          <SkeletonFilter />
        ) : (
          <AttributesFilter attributes={attributes} />
        )}
      </div>
      <div className={styles.mobile}>
        <details className={`${accordianStyles.accordian}`}>
          <summary>Filters</summary>
        </details>
        <div className={accordianStyles.content}>
          <details className={`${accordianStyles.accordian}`}>
            <summary>Categories</summary>
          </details>
          <div className={accordianStyles.content}>
            <CategorySidebar />
          </div>
          <details className={`${accordianStyles.accordian}`}>
            <summary>Filters</summary>
          </details>
          <div className={accordianStyles.content}>
            {!attributes ? (
              <SkeletonFilter />
            ) : (
              <AttributesFilter attributes={attributes} />
            )}
          </div>
        </div>
      </div>

      <div className={styles.wrapper} style={{ padding: "2em 0" }}>
        <div>
          <FilterBar />

          {results ? (
            <h2>
              {results > 24 ? (
                <span>
                  Displaying 24 of {results} results for{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {router.query.search}
                  </span>
                </span>
              ) : (
                <span>
                  Displaying {results} results for{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      textTransform: "uppercase",
                    }}
                  >
                    {router.query.search}
                  </span>
                </span>
              )}
            </h2>
          ) : (
            <></>
          )}
        </div>
        {!allProducts.length ? (
          <SkeletonGrid />
        ) : (
          <Grid
            gap={2}
            width={["40%", "40%", "24%"]}
            className={styles.productGrid}
          >
            {allProducts.map((products, i) => {
              return (
                <CollectionCard
                  key={String(products.id) + i}
                  category={products}
                  type={"products"}
                />
              );
            })}
          </Grid>
        )}
        {!pageNums && loading ? (
          <SkeletonPagination />
        ) : (
          <PaginationBar query={"products"} page_count={pageNums} />
        )}
      </div>
    </div>
  );
};
