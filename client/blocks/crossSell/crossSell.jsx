import styles from "./crossSell.module.css";
import utilStyles from "@/styles/utils.module.css";
import CrossSellCard from "./crossSellCard/crossSellCard";
import LoadingDots from "@/components/ui/loadingDots/loadingDots";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProduct } from "@/lib/operations-swell";

const CrossSell = () => {
  const router = useRouter();
  const [cross_sells, setCross_sells] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct({
        slug: router.query.product,
      });
      setProduct(product);
      if (product.cross_sell && product.cross_sell.length) {
        setCross_sells(product.cross_sell);
      }
    };
    if (router.query && router.query.product) {
      fetchProduct();
    }
  }, []);

  if (!product.cross_sell) {
    return <></>;
  }

  return (
    <>
      {!cross_sells.length ? (
        <LoadingDots />
      ) : (
        <>
          <h3 className={utilStyles.uppercase}>You may also like</h3>
          <ul className={styles.grid}>
            {cross_sells.map((item) => {
              return <CrossSellCard item={item} key={item.id} />;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default CrossSell;
