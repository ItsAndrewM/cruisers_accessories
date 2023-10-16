import { Text, Card, Grid, Divider, NavLink } from "theme-ui";
import { useEffect, useState } from "react";
import { useCart } from "../../../lib/hooks/useCart";
import { useCheckoutUrl } from "../../../lib/hooks/useCheckoutUrl";
import CartItem from "../cartItem/cartItem";
import { BuilderComponent, builder } from "@builder.io/react";
import env from "../../../config/env";
import { getPrice } from "../../../lib/utils/product";
import styles from "./cartSidebarView.module.css";
import Cart from "@/components/icons/cart";
import Button from "@/components/button/button";
import Link from "next/link";
import searchByBoatStyles from "../../searchByBoat/searchByBoat.module.css";
import LoadingDots from "@/components/ui/loadingDots/loadingDots";
import utilStyles from "@/styles/utils.module.css";

const CartSidebarView = () => {
  const checkoutUrl = useCheckoutUrl();
  const cart = useCart();
  const subTotal = getPrice(cart?.sub_total, cart?.currency ?? "USD");
  const total = getPrice(cart?.grand_total, cart?.currency ?? "USD");
  const shippingTotal = getPrice(cart?.shipment_total, cart?.currency ?? "USD");
  const taxTotal = getPrice(cart?.tax_total, cart?.currency ?? "USD");

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0 ? true : false;
  const [cartUpsell, setCartUpsell] = useState();

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.items || [];
      const cartUpsellContent = await builder
        .get("cart-upsell-sidebar", {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item) => item.product?.slug),
          },
        })
        .toPromise();
      setCartUpsell(cartUpsellContent);
    }
    fetchContent();
  }, [cart?.items]);

  return (
    <div
      className={`${styles.container} ${isEmpty ? styles.justifyContent : ""}`}
      style={{ flexDirection: "column", alignItems: "center" }}
    >
      {isEmpty ? (
        <div className={styles.container}>
          <div className={`${styles.wrapper}`}>
            <div className={styles.header}>
              <h2>Cart</h2>
            </div>
            <div className={styles.empty}>
              <small>Your cart is currently empty.</small>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={`${styles.wrapper} `}>
              <div className={styles.header}>
                <h2>Cart</h2>
              </div>
              <div className={styles.cartItemsWrapper}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency ?? "USD"}
                  />
                ))}
              </div>
              <div className={styles.borderBottom}></div>
            </div>
            <div className={`${styles.wrapper}`}>
              <div className={styles.totals}>
                <small className={`${utilStyles.uppercase} ${utilStyles.bold}`}>
                  Subtotal
                </small>
                <small>{subTotal}</small>
              </div>
              <div>
                <small>
                  Shipping, taxes, and discount codes calculated at checkout.
                </small>
              </div>
            </div>
          </div>
          <div className={styles.wrapper}>
            {checkoutUrl && (
              <Link href={checkoutUrl} className={styles.checkout}>
                Proceed to Checkout
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebarView;
