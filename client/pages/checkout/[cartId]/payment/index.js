import Payment from "@/components/checkout/payment/payment";
import Layout from "@/components/layout/layout";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import CheckoutLayout from "../layout";
import styles from "@/styles/checkout.module.css";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
  const id = context.query.cartId;
  return {
    props: {
      id: id,
      ...(await getLayoutProps()),
    },
  };
};

const Page = ({ id }) => {
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
      {!cart ? (
        <></>
      ) : (
        <>
          <div className={styles.column}>
            <Payment id={id} cart={cart} />
          </div>
          <div className={styles.column}>
            <CartTotal cart={cart} />
          </div>
        </>
      )}
    </CheckoutLayout>
  );
};

Page.Layout = Layout;

export default Page;
