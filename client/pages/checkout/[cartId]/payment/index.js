import CheckBreadcrumbs from "@/components/checkout/checkBreadcrumbs/checkBreadcrumbs";
import Payment from "@/components/checkout/payment/payment";
import Layout from "@/components/layout/layout";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import CheckoutLayout from "../layout";
import styles from "@/styles/checkout.module.css";
import CartTotal from "@/components/checkout/cartTotal/cartTotal";

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
