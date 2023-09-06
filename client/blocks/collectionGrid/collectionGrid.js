import { useEffect, useState } from "react";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import ProductCard from "../../components/productCard/productCard";
import ProductCardDemo from "../../components/productCard/productCardDemo";
import { getAllCollections } from "../../lib/operations-swell";
import builderConfig from "../../builder.config";
import CollectionCard from "../../components/collectionCard/collectionCard";

export const CollectionGrid = ({
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
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
      const result = await getAllCollections(builderConfig, limit, offset);
      setCategories(result);
      setLoading(false);
    };
    fetchCollection();
  }, []);

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
      </Grid>
    );
  }
};