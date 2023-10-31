import Link from "next/link";
import styles from "../checkout.module.css";
import { useState } from "react";

const CustomerInfo = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <section className={styles.cartSection}>
      <h2>
        Customer Information{" "}
        <span className={styles.hint}>
          Already have an account?{" "}
          <Link href={"/checkout/1690ce1f8b71aa384890c37369167531/login"}>
            Log in
          </Link>
        </span>
      </h2>
      <div className={`${styles.formGroup}`}>
        <input
          type="text"
          id="field_account.email"
          required
          placeholder="Email Address"
          name="account.email"
          onChange={handleChange}
          className={styles.formField}
          // value={""}
        />
        <label htmlFor="field_account.email" className={`${styles.formLabel} `}>
          Email Address
        </label>
      </div>
      <div className={styles.hint}>
        <div className={styles.formCheck}>
          <input
            id="field_account.email_optin"
            placeholder="Keep me up to date with news and special offers"
            name="account.email_optin"
            type="checkbox"
          />
          <label htmlFor="field_account.email_optin">
            Keep me up to date with news and special offers
          </label>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfo;
