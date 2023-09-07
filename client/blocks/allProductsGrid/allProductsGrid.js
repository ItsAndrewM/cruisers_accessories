import { useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import { getAllProducts } from "../../lib/operations-swell";
import builderConfig from "../../builder.config";
import CollectionCard from "../../components/collectionCard/collectionCard";
import styles from "./allProductsGrid.module.css";

export const AllProductsGrid = ({
  offset = 1,
  limit = 24,
  cardProps,
  highlightCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState();

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
      const result = await getAllProducts(builderConfig, limit, offset);
      console.log(result);
      setAllProducts(result);
      setLoading(false);
    };
    fetchAllProducts();
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
      </div>
    );
  }
};
