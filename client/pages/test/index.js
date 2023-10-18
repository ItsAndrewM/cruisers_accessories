import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import styles from "../../styles/test.module.css";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";
import { getProduct } from "@/lib/operations-swell";
import Carousel from "@/components/carousel/carousel";
import { useEffect, useState } from "react";
import Link from "next/link";
import navbarStyles from "@/components/ui/navbar/navbar.module.css";

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

  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <h4>
            <Link href={"/"} className={navbarStyles.link}>
              This is a test
            </Link>
          </h4>
        </li>
      </ul>
    </div>
  );
};

Page.Layout = Layout;

export default Page;
