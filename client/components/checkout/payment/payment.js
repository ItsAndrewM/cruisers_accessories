import Link from "next/link";
import styles from "../checkout.module.css";
import Billing from "../billing/billing";
import { useEffect, useState } from "react";
import CartActions from "../cartActions/cartActions";
import PayPalButton from "./paypalButton/paypalButton";

const Payment = ({ id, cart }) => {
  console.log(cart);
  const [billingAddress, setBillingAddress] = useState(false);

  const handleRadioButton = (e) => {
    setBillingAddress(!billingAddress);
  };

  return (
    <form>
      <section className={styles.cartSection}>
        <div className={styles.cartReview}>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Contact</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.account.email}, {cart.shipping.name}
            </div>

            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/shipping`}>Change</Link>
            </div>
          </section>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Shipping</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.shipping.address1} {cart.shipping.city}{" "}
              {cart.shipping.state && cart.shipping.state} {cart.shipping.zip} (
              {cart.shipping.country})
            </div>
            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/shipping`}>Change</Link>
            </div>
          </section>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Billing</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.billing.address1} {cart.billing.city}{" "}
              {cart.billing.state && cart.billing.state} {cart.billing.zip} (
              {cart.billing.country})
            </div>
            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/billing`}>Change</Link>
            </div>
          </section>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Method</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.shipping.service}
            </div>
            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/shipping-method`}>Change</Link>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.cartSection}>
        <div className={styles.cartSectionHeader}>
          <h2>Payment Method</h2>
          <span className={`${styles.muted} ${styles.hint}`}>
            All transactions are secure and encrypted
          </span>
        </div>
        <div className={styles.cartInfo}>
          <PayPalButton cart={cart} id={id} />
        </div>
      </section>
      <CartActions linkText={"Back"} link={`/checkout/${id}/shipping-method`} />
    </form>
  );
};

export default Payment;
