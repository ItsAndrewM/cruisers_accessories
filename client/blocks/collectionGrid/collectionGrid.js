import { useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import ProductCard from "../../components/productCard/productCard";
import ProductCardDemo from "../../components/productCard/productCardDemo";
import {
  getAllCollections,
  getPaginatedItems,
} from "../../lib/operations-swell";
import builderConfig from "../../builder.config";
import CollectionCard from "../../components/collectionCard/collectionCard";
import PaginationBar from "@/components/paginationBar/paginationBar";
import { useRouter } from "next/router";

export const CollectionGrid = ({
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();

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
      setCategories(result);
      setLoading(false);
    };
    fetchCollection();
  }, [router.query]);

  // useEffect(() => {

  // }, [collection])
  // const CollectionComponent =
  // process.env.IS_DEMO
  // ? ProductCardDemo
  // CollectionCard;
  if (loading || !categories) {
    return <LoadingDots />;
  } else {
    const arr = categories.slice(offset, limit);
    console.log(arr);
    return (
      <Grid gap={2} width={["100%", "40%", "24%"]}>
        {categories.slice(offset, limit).map((category, i) => {
          return (
            <CollectionCard
              key={String(category.id) + i}
              // {...(highlightCard?.index === i ? highlightCard : cardProps)}
              category={category}
              type={"collection"}
            />
          );
        })}
        <PaginationBar query={"collection"} />
      </Grid>
    );
  }
};
