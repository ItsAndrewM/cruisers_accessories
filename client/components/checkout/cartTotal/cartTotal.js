import CartItem from "@/components/cart/cartItem/cartItem";
import styles from "../../cart/cartSidebarView/cartSidebarView.module.css";
import checkoutStyles from "../checkout.module.css";
import { useRouter } from "next/router";
import OrderItem from "@/components/cart/orderItem/orderItem";

const CartTotal = ({ cart }) => {
  const router = useRouter();
  console.log(cart);
  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.cartItemsWrapper}>
        {cart.items.map((item) => {
          if (router.asPath.includes("order")) {
            return <OrderItem key={item.id} item={item} />;
          } else {
            return (
              <CartItem
                key={item.id}
                item={item}
                currencyCode={cart?.currency ?? "USD"}
              />
            );
          }
        })}
      </div>
      <div className={styles.borderBottom}></div>
      <div className={checkoutStyles.total}>
        <ul>
          <li>
            <span>Subtotal</span>
            <span>
              ${!cart?.sub_total ? "-" : `${(cart?.sub_total).toFixed(2)}`}
            </span>
          </li>
          <li>
            <span>Shipping</span>
            <span>
              {!cart?.shipment_total
                ? "-"
                : `$${(cart?.shipment_total).toFixed(2)}`}
            </span>
          </li>
          {!cart.billing && !cart?.billing?.country.includes("CA") ? (
            <></>
          ) : (
            <li>
              <span>Taxes</span>
              <span>
                {!cart?.tax_total ? "-" : `$${(cart?.tax_total).toFixed(2)}`}
              </span>
            </li>
          )}
          <li className={checkoutStyles.grandTotal}>
            <h3>Total</h3>
            <h3>
              <span>{cart?.currency}</span>${(cart?.grand_total).toFixed(2)}
            </h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartTotal;
