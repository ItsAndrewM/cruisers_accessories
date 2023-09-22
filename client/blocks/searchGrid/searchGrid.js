import { useEffect, useState } from "react";
import LoadingDots from "@/components/ui/loadingDots/loadingDots";
import { Grid } from "@theme-ui/components";
import CollectionCard from "@/components/collectionCard/collectionCard";
import builderConfig from "@/builder.config";
import { getProduct, getCollection } from "@/lib/operations-swell";
import SearchCard from "@/components/searchCard/searchCard";

export const SearchGrid = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);

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
      setProducts(result);
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
        handle: collection,
      });
      setProducts(result.products);
      setLoading(false);
    };
    if (typeof collection === "string" && !initialProducts) {
      fetchCollection();
    }
  }, [collection]);

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <div style={{ padding: "2em" }}>
      <Grid
        gap={2}
        width={["100%", "40%", "24%"]}
        style={{ justifyItems: "center" }}
      >
        {products.slice(offset, limit).map((product, i) => (
          <SearchCard
            key={String(product.id) + i}
            {...(highlightCard?.index === i ? highlightCard : cardProps)}
            category={product}
          />
        ))}
      </Grid>
    </div>
  );
};
