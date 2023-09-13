"use client";

import { Suspense, useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import {
  getAllAttributes,
  getFilteredProducts,
  getPageCount,
  getPaginatedItems,
} from "../../lib/operations-swell";
import CollectionCard from "../../components/collectionCard/collectionCard";
import styles from "./allProductsGrid.module.css";
import { useRouter } from "next/router";
import PaginationBar from "@/components/paginationBar/paginationBar";
import AttributesFilter from "@/components/attributesFilter/attributesFilter";

export const AllProductsGrid = ({
  offset = 1,
  limit = 24,
  cardProps,
  highlightCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [pageNums, setPageNums] = useState(1);
  const [attributes, setAttributes] = useState();
  const [results, setResults] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   // setLoading(false);
  //   if (!categories && collection) {
  //     setLoading(true);
  //     setCategories(collection);
  //     setLoading(false);
  //   }
  // }, [collection]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      // const result = await getAllProducts(builderConfig, limit, offset);
      // console.log(result);
      // setAllProducts(result);
      const query = router.asPath.split("?")[1];
      const filtered = await getFilteredProducts(query);
      const data = await filtered.json();
      if (data.data.count > 0) {
        setAllProducts(data.data.results);
        setPageNums(data.data.page_count);
      } else {
        const result = await getPaginatedItems(
          router.query?.page || 1,
          "products"
        );
        const paginationData = await getPageCount("products");
        setPageNums(paginationData.page_count);
        setAllProducts(result);
      }
      setLoading(false);
    };
    fetchAllProducts();
  }, [router.query]);

  useEffect(() => {
    const fetchAllAttributes = async () => {
      const allAttributes = await getAllAttributes();
      setAttributes(allAttributes);
    };
    fetchAllAttributes();
  }, []);

  // useEffect(() => {

  // }, [collection])
  // const CollectionComponent =
  // process.env.IS_DEMO
  // ? ProductCardDemo
  // CollectionCard;
  if (loading || !allProducts) {
    return <LoadingDots />;
  } else {
    // const arr = allProducts.slice(offset, limit);
    // console.log(arr);
    return (
      <div className={styles.container}>
        {attributes ? <AttributesFilter attributes={attributes} /> : <></>}
        <div className={styles.wrapper}>
          <Grid gap={2} width={["100%", "40%", "24%"]}>
            {allProducts.map((products, i) => {
              return (
                <CollectionCard
                  key={String(products.id) + i}
                  // {...(highlightCard?.index === i ? highlightCard : cardProps)}
                  category={products}
                  type={"products"}
                />
              );
            })}
          </Grid>
          <PaginationBar query={"products"} page_count={pageNums} />
        </div>
      </div>
    );
  }
};
