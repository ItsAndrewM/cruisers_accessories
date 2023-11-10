import Layout from "@/components/layout/layout";
import CheckoutLayout from "../layout";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { useEffect, useState } from "react";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";
import styles from "@/styles/checkout.module.css";
import Order from "@/components/checkout/order/order";

export const getServerSideProps = async (context) => {
  const id = context.query.cartId;
  const data = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.precisioncruisingaccessories.com/api/swell/order-details/${id}`
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
  const [loading, setLoading] = useState(true);
  const cart = useCart();

  useEffect(() => {
    if (cart && id) {
      setLoading(false);
    }
  }, [cart, id]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <progress className={styles.pureMaterialProgressCircular} />
      </div>
    );
  }

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
