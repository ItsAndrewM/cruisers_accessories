"use client";

import { Suspense, useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import { getPaginatedItems } from "../../lib/operations-swell";
import CollectionCard from "../../components/collectionCard/collectionCard";
import styles from "./allProductsGrid.module.css";
import { useRouter } from "next/router";
import PaginationBar from "@/components/paginationBar/paginationBar";

export const AllProductsGrid = ({
  offset = 1,
  limit = 24,
  cardProps,
  highlightCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [pageNums, setPageNums] = useState(1);
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
      const result = await getPaginatedItems(
        router.query?.page || 1,
        "products"
      );
      setAllProducts(result);
      setLoading(false);
    };
    fetchAllProducts();
  }, [router.query]);

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
      <div className={styles.wrapper}>
        <Grid gap={2} width={["100%", "40%", "24%"]}>
          {/* {allProducts.slice(offset, limit).map((products, i) => { */}
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
        {/* <Suspense fallback={<LoadingDots />}> */}
        <PaginationBar query={"products"} />
        {/* </Suspense> */}
      </div>
    );
  }
};
