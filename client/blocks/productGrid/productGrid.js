import { useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import ProductCard from "../../components/productCard/productCard";
import ProductCardDemo from "../../components/productCard/productCardDemo";
import { getCollection, getProduct } from "../../lib/operations-swell";
import builderConfig from "../../builder.config";
import styles from "../allProductsGrid/allProductsGrid.module.css";
import PaginationBar from "@/components/paginationBar/paginationBar";
import CollectionCard from "@/components/collectionCard/collectionCard";
import { useRouter } from "next/router";
import CategoryBar from "../categoryBar/categoryBar";
import Loading from "./loading";

export const ProductGrid = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const [collectionProducts, setCollectionProducts] = useState(
    initialProducts || []
  );
  const [loading, setLoading] = useState(false);
  const [pageNums, setPageNums] = useState(1);
  const [collectionChildren, setCollectionChildren] = useState();
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const promises = productsList
        .map((entry) => entry.product)
        .filter((handle) => typeof handle === "string")
        .map(async (handle) => {
          return await getProduct({ slug: handle });
        });
      const result = await Promise.all(promises);
      setCollectionProducts(result);
      setLoading(false);
    };
    if (productsList && !initialProducts) {
      getProducts();
    }
  }, [productsList, initialProducts]);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      const result = await getCollection(builderConfig, {
        handle: collection?.slug,
        pageNum: router.query?.page || 1,
      });
      if (!result.children.length) {
        console;
        setCollectionChildren(null);
      } else {
        setCollectionChildren(result.children);
      }
      setCollectionProducts(result.products);
      setPageNums(result.page_count);
      setLoading(false);
    };
    if (collection) {
      fetchCollection();
    }
  }, [collection, router.query]);

  return (
    <>
      {!collectionChildren ? (
        <></>
      ) : (
        <CategoryBar children={!collectionChildren ? [] : collectionChildren} />
      )}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {loading ? (
            <Loading />
          ) : (
            <Grid
              gap={2}
              width={["40%", "40%", "24%"]}
              className={styles.gridBorder}
            >
              {collectionProducts.map((product, i) => (
                <CollectionCard
                  key={String(product.id) + i}
                  {...(highlightCard?.index === i ? highlightCard : cardProps)}
                  category={product}
                />
              ))}
            </Grid>
          )}
          <PaginationBar
            query={"collection"}
            page_count={pageNums}
            handle={collection.slug}
          />
        </div>
      </div>
    </>
  );
};
