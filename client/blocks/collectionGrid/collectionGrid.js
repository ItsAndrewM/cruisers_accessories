import { useEffect, useState } from "react";
import { Grid } from "@theme-ui/components";
import { getPageCount, getPaginatedItems } from "../../lib/operations-swell";
import CollectionCard from "../../components/collectionCard/collectionCard";
import PaginationBar from "@/components/paginationBar/paginationBar";
import { useRouter } from "next/router";
import styles from "../allProductsGrid/allProductsGrid.module.css";
import Loading from "./loading";

export const CollectionGrid = ({
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [pageNums, setPageNums] = useState(1);
  // useEffect(() => {
  //   // setLoading(false);
  //   if (!categories && collection) {
  //     setLoading(true);
  //     setCategories(collection);
  //     setLoading(false);
  //   }
  // }, [collection]);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      const result = await await getPaginatedItems(
        router.query?.page || 1,
        "collection"
      );
      const paginationData = await getPageCount("collection");
      setPageNums(paginationData.page_count);
      setCategories(result);
      setLoading(false);
    };
    fetchCollection();
  }, [router.query]);

  if (loading || !categories) {
    return <Loading />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Grid gap={2} width={["40%", "40%", "24%"]} className={styles.grid}>
            {categories.map((category, i) => {
              return (
                <CollectionCard
                  key={String(category.id) + i}
                  category={category}
                  type={"collection"}
                />
              );
            })}
          </Grid>
          <PaginationBar query={"collection"} page_count={pageNums} />
        </div>
      </div>
    );
  }
};
