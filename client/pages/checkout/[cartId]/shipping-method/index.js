import Layout from "@/components/layout/layout";
import { BuilderComponent } from "@builder.io/react";
import { useRouter } from "next/router";
import { useThemeUI } from "theme-ui";
import { getShippingRates } from "@/lib/operations-swell";
import { useCart } from "@/lib/hooks/useCart";
import { useContext, useEffect, useState } from "react";
import ShippingMethod from "@/components/checkout/shippingMethod/shippingMethod";
import CheckBreadcrumbs from "@/components/checkout/checkBreadcrumbs/checkBreadcrumbs";
import { getLayoutProps } from "@/lib/get-layout-props";
import CheckoutLayout from "../layout";
import styles from "@/styles/checkout.module.css";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";
import { Context } from "@/lib/context";

export const getServerSideProps = async (context) => {
  const data = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.SITE_URL}api/swell/shipping-method`
      : "http://localhost:3000/api/swell/shipping-method"
  );
  const result = await data.json();
  const id = context.query.cartId;
  return {
    props: {
      id: id,
      shipping_methods: result.data,
      ...(await getLayoutProps()),
    },
  };
};
const Page = ({ id, shipping_methods }) => {
  const cart = useCart();

  // const { cart, swell } = useContext(Context);

  // useEffect(() => {
  //   const fetchGetStuff = async () => {
  //     const stuff = await swell.cart.getShippingRates();
  //     console.log(stuff);
  //     console.log(cart);
  //   };
  //   if (swell && cart) {
  //     fetchGetStuff();
  //   }
  // }, [swell, cart]);

  if (!id || !cart) {
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
        <div className={styles.column}>
          <ShippingMethod id={id} cart={cart} />
        </div>
      )}
      {!cart ? (
        <></>
      ) : (
        <div className={styles.column}>
          <CartTotal cart={cart} />
        </div>
      )}
    </CheckoutLayout>
  );
};

Page.Layout = Layout;

export default Page;
