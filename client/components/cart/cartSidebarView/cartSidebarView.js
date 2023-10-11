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
        <>
          <Cart />
          Your cart is empty
          <Text>Continue browsing!</Text>
        </>
      ) : (
        <>
          <div className={styles.container}>
            <div className={`${styles.wrapper}`}>
              {!items.length ? (
                <LoadingDots />
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency ?? "USD"}
                  />
                ))
              )}
            </div>
            <div className={`${styles.wrapper}`}>
              <Card sx={{ margin: "auto", minWidth: "10rem", paddingLeft: 5 }}>
                <Grid gap={1} columns={2} sx={{ my: 3 }}>
                  <Text>Subtotal:</Text>
                  <Text sx={{ marginLeft: "auto" }}>{subTotal}</Text>
                  <Text>Shipping:</Text>
                  <Text sx={{ marginLeft: "auto" }}>{shippingTotal}</Text>
                  <Text>Tax: </Text>
                  <Text sx={{ marginLeft: "auto" }}>{taxTotal}</Text>
                </Grid>

                <Divider />
                <Grid gap={1} columns={2}>
                  <Text variant="bold">Estimated Total:</Text>
                  <Text variant="bold" sx={{ marginLeft: "auto" }}>
                    {total}
                  </Text>
                </Grid>
              </Card>
              <BuilderComponent
                content={cartUpsell}
                model="cart-upsell-sidebar"
              />
            </div>
          </div>
          <div className={styles.container}>
            {checkoutUrl && (
              <span className={searchByBoatStyles.submit}>
                <Link href={checkoutUrl}>Proceed to Checkout</Link>
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebarView;
