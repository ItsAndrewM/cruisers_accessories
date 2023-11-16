import { useState } from "react";
import { NextSeo } from "next-seo";
import styles from "./collectionViewHome.module.css";
import { CollectionGrid } from "../collectionGrid/collectionGrid";

const CollectionViewHome = ({ productGridOptions, renderSeo }) => {
  const title = "PCA category collections";
  const description = "PCA category collections";

  return (
    <>
      <div className={styles.wrapper}>
        {renderSeo && (
          <NextSeo
            title={title}
            description={description}
            openGraph={{
              type: "website",
              title,
              description,
            }}
          />
        )}
        <div className={styles.wrapper}>
          <span style={{ marginTop: 0, marginBottom: 2 }}>
            <h1>{title}</h1>
          </span>
          {/* <div dangerouslySetInnerHTML={{ __html: collection.description }} /> */}
        </div>
        <div className={styles.padding5}>
          <CollectionGrid {...productGridOptions} />
        </div>
      </div>
    </>
  );
};

export default CollectionViewHome;
