import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import styles from "../../styles/test.module.css";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";
import { getProduct } from "@/lib/operations-swell";
import Carousel from "@/components/carousel/carousel";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const product = await getProduct({
    slug: "cc-26-spinnaker-sheet-single",
  });
  return {
    props: {
      product: product || null,
    },
  };
}

const Page = ({ product }) => {
  const [pics, setPics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      let items = [];
      items.push(product.images[0]);
      const mapped = product.variants.map((variant) => {
        return variant.images[0];
      });
      items = items.concat(mapped);
      setPics(items);
    }
  }, [product]);

  return (
    <div className={styles.wrapper}>
      <Carousel product={product} />
    </div>
  );
};

Page.Layout = Layout;

export default Page;
