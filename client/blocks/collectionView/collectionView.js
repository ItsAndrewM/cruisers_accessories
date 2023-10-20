import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import builderConfig from "@/builder.config";
import { ProductGrid } from "../productGrid/productGrid";
import { getCollection } from "../../lib/operations-swell";
import styles from "./collectionView.module.css";
import SkeletonGrid from "./skeletonGrid";
import { useRouter } from "next/router";
import Loading from "./loading";
import accordionStyles from "@/components/accordion/accordion.module.css";

const CollectionView = ({ collection, productGridOptions, renderSeo }) => {
  const router = useRouter();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [pageNums, setPageNums] = useState(1);
  const [children, setChildren] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 600
  );
  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", handleResize);
  }, []);
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
    <div className={styles.wrapper} key={!collection?.id ? "" : collection.id}>
      {renderSeo && (
        <NextSeo
          title={!collection?.name ? "" : `CAS | ${collection?.name}`}
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
            {!isMobile ? (
              <>
                <h1>{collection.name}</h1>

                <div
                  dangerouslySetInnerHTML={{ __html: collection.description }}
                />
              </>
            ) : (
              <>
                <details className={`${accordionStyles.accordian}`}>
                  <summary>
                    <h1>{collection.name}</h1>
                  </summary>
                </details>
                <div
                  className={accordionStyles.content}
                  style={{ border: "none" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: collection.description }}
                  />
                </div>
              </>
            )}
          </span>
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
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionView;
