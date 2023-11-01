import Layout from "@/components/layout/layout";
import CheckoutLayout from "../layout";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { useEffect } from "react";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";
import styles from "@/styles/checkout.module.css";
import Order from "@/components/checkout/order/order";

export const getServerSideProps = async (context) => {
  const id = context.query.cartId;
  const data = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.SITE_URL}api/swell/order-details/${id}`
      : `http://localhost:3000/api/swell/order-details/${id}`
  );
  const results = await data.json();
  return {
    props: {
      id: id,
      order: results || null,
      ...(await getLayoutProps()),
    },
  };
};
const Page = ({ id, order }) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await swell.init(swellConfig.storeId, swellConfig.publicKey);
  //     const orderData = await swell.cart.getOrder("654159f6f464860011eba1f5");
  //     console.log(orderData);
  //   };
  //   fetchData();
  // }, []);

  return (
    <CheckoutLayout id={id}>
      {!order ? (
        <></>
      ) : (
        <>
          <div className={styles.column}>
            <Order cart={order.data} />
          </div>
          <div className={styles.column}>
            <CartTotal cart={order.data} />
          </div>
        </>
      )}
    </CheckoutLayout>
  );
};

Page.Layout = Layout;

export default Page;
