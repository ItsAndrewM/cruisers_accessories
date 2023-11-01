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
import { useShippingRates } from "@/lib/hooks/useShippingRates";

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
  const cart = useCart();
  const [shippingRates, setShippingRates] = useState([]);
  const { swell } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await swell.cart.getShippingRates();
        if (!result) {
          throw new Error(
            "Product delivery requires 'shipment' value or country ISO code is required"
          );
        }
        setShippingRates(result.services);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!id || !cart || !shippingRates.length) {
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
          {!cart.shipping || !cart.account ? (
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
          ) : (
            <ShippingMethod
              id={id}
              cart={cart}
              shipping_method={shippingRates}
            />
          )}
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
