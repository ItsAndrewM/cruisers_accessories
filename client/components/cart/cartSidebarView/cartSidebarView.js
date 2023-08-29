import { Text, Card, Grid, Divider, NavLink } from "theme-ui";
import { useEffect, useState } from "react";
import Bag from "../../icons/bag";
import { useCart } from "../../../lib/hooks/useCart"
import { useCheckoutUrl } from "../../../lib/hooks/useCheckoutUrl"
import CartItem from "../cartItem/cartItem";
import { BuilderComponent, builder } from "@builder.io/react";
import env from "../../../config/env";
import { getPrice } from "../../../lib/utils/product";
import styles from "./cartSidebarView.module.css"

const CartSidebarView = () => {
  const checkoutUrl = useCheckoutUrl();
  const cart = useCart();
  const subTotal = getPrice(cart?.sub_total, cart?.currency ?? "USD");
  const total = getPrice(cart?.grand_total, cart?.currency ?? "USD");
  const shippingTotal = getPrice(cart?.shipment_total, cart?.currency ?? "USD");
  const taxTotal = getPrice(cart?.tax_total, cart?.currency ?? "USD");

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;
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
      className={`${styles.wrapper} ${isEmpty ? styles.justifyContent : ""}`}
    >
      {isEmpty ? (
        <>
          <Bag />
          Your cart is empty
          <Text>
            Continue browsing!
          </Text>
        </>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={cart?.currency ?? "USD"}
            />
          ))}
          <Card sx={{ marginLeft: "auto", minWidth: "10rem", paddingLeft: 5 }}>
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
          <BuilderComponent content={cartUpsell} model="cart-upsell-sidebar" />
          {checkoutUrl && (
            <NavLink
              variant="nav"
              sx={{ width: "100%", m: 2, p: 12, textAlign: "center" }}
              href={checkoutUrl}
            >
              Proceed to Checkout
            </NavLink>
          )}
        </>
      )}
    </div>
  );
};

export default CartSidebarView;
