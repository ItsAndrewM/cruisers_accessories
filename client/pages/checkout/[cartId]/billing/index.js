import Billing from "@/components/checkout/billing/billing";
import Layout from "@/components/layout/layout";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import { BuilderComponent } from "@builder.io/react";
import { useRouter } from "next/router";
import { useThemeUI } from "theme-ui";
import CheckoutLayout from "../layout";
import styles from "@/styles/checkout.module.css";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";

export const getServerSideProps = async (context) => {
  const id = context.query.cartId;
  return {
    props: { id: id, ...(await getLayoutProps()) },
  };
};

const Page = ({ id }) => {
  const theme = useThemeUI;
  const router = useRouter();
  const cart = useCart();
  return (
    <CheckoutLayout id={id}>
      {!cart ? (
        <></>
      ) : (
        <>
          <div className={styles.column}>
            <Billing id={id} cart={cart} />
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
