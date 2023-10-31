import Link from "next/link";
import styles from "../checkout.module.css";
import CartActions from "../cartActions/cartActions";
import { useEffect, useState } from "react";
import swell from "swell-js";
import swellConfig from "@/swell.config";
import { useRouter } from "next/router";
import Check from "@/components/icons/check";

const Order = ({ cart }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState();
  console.log(cart);
  useEffect(() => {
    const fetchAccountData = async () => {
      const results = await fetch(
        // process.env.NODE_ENV === "production"
        //   ? `${process.env.SITE_URL}/api/swell/order-details/654159f64858d100120ab3be`
        //   :
        `http://localhost:3000/api/swell/account-details/${cart.account_id}`
      );
      const data = await results.json();
      if (data.success) {
        setAccount(data.data);
      }
      console.log(data);
    };
    if (cart) {
      fetchAccountData();
    }
  }, [cart]);

  return (
    <>
      <section className={styles.cartSection}>
        <span className={`${styles.orderConfirmation} ${styles.hint}`}>
          <Check /> Order #{cart.number}
        </span>
        <h2>Thank you for your purchase!</h2>
        <small>
          Your order is confirmed and we&apos;ll notify you when it&apos;s
          shipped
        </small>
      </section>
      <section className={styles.cartSection}>
        <div className={styles.cartReview}>
          <section
            className={`${styles.cartReviewSection} ${styles.orderReview}`}
          >
            <div className={styles.orderReviewHeader}>
              <h3>Customer Information</h3>
            </div>
            <div className={styles.orderReviewInfo}>
              <div className={styles.orderReviewColumn}>
                <div className={styles.orderReviewCell}>
                  <div className={styles.orderReviewTitle}>Name</div>
                  <div>{account && account.email}</div>
                </div>
                <div className={styles.orderReviewCell}>
                  <div className={styles.orderReviewTitle}>Email Address</div>
                  <div>{account && account.name}</div>
                </div>
              </div>
              <div className={styles.orderReviewColumn}>
                <div className={styles.orderReviewCell}>
                  <div className={styles.orderReviewTitle}>Billing Address</div>
                  {cart && (
                    <div className={styles.orderReviewCell}>
                      <span>{cart.billing.name}</span>
                      <span>{cart.billing.address1}</span>
                      <span>
                        {cart.billing.city}, {cart.billing.state}{" "}
                        {cart.billing.zip}
                      </span>
                      <span>{cart.billing.country}</span>
                      {!cart.billing.phone ? (
                        <></>
                      ) : (
                        <span>{cart.billing.phone}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.orderReviewCell}>
                  <div className={styles.orderReviewTitle}>Payment Method</div>
                  <div>Paypal Checkout</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Order;
