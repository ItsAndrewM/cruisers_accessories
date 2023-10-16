import CartSidebarView from "../components/cart/cartSidebarView/cartSidebarView";
import Layout from "../components/layout/layout";
import styles from "@/styles/cart.module.css";
const Cart = () => (
  <div id={styles.cartPage}>
    <CartSidebarView />
  </div>
);
export default Cart;

Cart.Layout = Layout;
