import CustomerInfo from "@/components/checkout/customerInfo/customerInfo";
import Shipping from "@/components/checkout/shipping/shipping";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/router";
import { useThemeUI } from "theme-ui";
import CheckoutLayout from "../layout";
import Layout from "@/components/layout/layout";
import { BuilderComponent } from "@builder.io/react";
import { getLayoutProps } from "@/lib/get-layout-props";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";
import styles from "@/styles/checkout.module.css";

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
  return (
    <CheckoutLayout id={id}>
      <div className={styles.column}>
        <Shipping />
      </div>
      {!cart ? (
        <></>
      ) : (
        <div className={styles.column}>
          <CartTotal cart={cart} />
        </div>
        // cart.items.map((item) => {
        //   console.log(item);

        //   return <p key={item.id}>{item.product.name}</p>;
        // })
      )}
    </CheckoutLayout>
  );
};

Page.Layout = Layout;

export default Page;
