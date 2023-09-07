import { useState } from "react";
import { NextSeo } from "next-seo";
import styles from "../collectionViewHome/collectionViewHome.module.css";
import { AllProductsGrid } from "../allProductsGrid/allProductsGrid";

const ProductsViewHome = ({ productGridOptions, renderSeo }) => {
  const title = "CAS Products collections";
  const description = "CAS Products collections";
  console.log(productGridOptions);

  return (
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
        <AllProductsGrid {...productGridOptions} />
      </div>
    </div>
  );
};

export default ProductsViewHome;
