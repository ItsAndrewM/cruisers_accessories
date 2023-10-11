import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import LoadingDots from "@/components/ui/loadingDots/loadingDots";
import builderConfig from "@/builder.config";
import { ProductGrid, ProductGridProps } from "../productGrid/productGrid";
import { getCollection } from "../../lib/operations-swell";
import styles from "./collectionView.module.css";
import CardSkeleton from "@/components/ui/cardSkeleton/cardSkeleton";
import SkeletonGrid from "./skeletonGrid";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";
import Loading from "./loading";

const CollectionView = ({ collection, productGridOptions, renderSeo }) => {
  const router = useRouter();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [pageNums, setPageNums] = useState(1);
  const [children, setChildren] = useState([]);
  // useEffect(() => setCollection(initialCollection), [initialCollection]);
  useEffect(() => {
    const fetchCollection = async () => {
      const result = await getCollection(builderConfig, {
        handle: collection?.slug,
      });
      setCategory(result);
      setLoading(false);
    };
    // if (typeof collection === "string") {
    fetchCollection();
    // }
  }, [collection]);

  return (
    <>
      <div
        className={styles.wrapper}
        key={!collection?.id ? "" : collection.id}
      >
        {renderSeo && (
          <NextSeo
            title={!collection?.name ? "" : collection?.name}
            description={!collection?.description ? "" : collection.description}
            openGraph={{
              type: "website",
              // name,
              // description,
            }}
          />
        )}
        {(!category && loading) || (!collection && loading) ? (
          <Loading />
        ) : (
          <div className={`${styles.wrapper} ${styles.first}`}>
            <span style={{ marginTop: 0, marginBottom: 2 }}>
              <h1>{collection.name}</h1>
            </span>
            <div dangerouslySetInnerHTML={{ __html: collection.description }} />
          </div>
        )}
        <div className={styles.padding5}>
          {!collection?.products ? (
            <SkeletonGrid />
          ) : (
            <ProductGrid
              {...productGridOptions}
              products={!collection?.products ? [] : collection?.products}
              collection={collection}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CollectionView;
