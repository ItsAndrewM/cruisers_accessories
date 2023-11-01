import Link from "next/link";
import styles from "../checkout.module.css";
import CartActions from "../cartActions/cartActions";
import { useState } from "react";
import swell from "swell-js";
import swellConfig from "@/swell.config";
import { useRouter } from "next/router";

const ShippingMethod = ({ id, cart, shipping_method }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const handleShippingMethod = async (e) => {
    e.preventDefault();
    const isValid = e.target.checkValidity();
    const formData = new FormData(e.currentTarget);
    if (isValid) {
      // here you do what you need to do if is valid
      const data = Array.from(formData.keys()).reduce((acc, key) => {
        acc[key] = formData.get(key);
        return acc;
      }, {});

      // const shipping_method = shipping_methods.find((method) => {
      //   return method.id === data.shipping_method;
      // });

      try {
        await swell.init(swellConfig.storeId, swellConfig.publicKey);
        const response = await swell.cart.update({
          shipping: {
            service: data.shipping_method,
            // price: shipping_method.price,
            // service_name: data.shipping_method.includes("standard_shipping")
            //   ? "Standard Shipping"
            //   : "Express Shipping",
          },
        });
        if (!response) {
          throw new Error(`Invalid response: ${response.status}`);
        }
        router.push(`/checkout/${response.checkout_id}/billing`);
      } catch (err) {
        console.error(err);
        alert(
          "We can't submit the form, please review your answers and try again."
        );
      }
    } else {
      setErrors(validationMessages);
    }
  };
  return (
    <form onSubmit={handleShippingMethod}>
      <section className={styles.cartSection}>
        <div className={styles.cartReview}>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Contact</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.account.email}
            </div>
            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/shipping`}>Change</Link>
            </div>
          </section>
          <section className={styles.cartReviewSection}>
            <div className={styles.cartReviewSectionTitle}>Shipping</div>
            <div className={styles.cartReviewSectionBody}>
              {cart.shipping.name}, {cart.shipping.address1}{" "}
              {cart.shipping.city} {cart.shipping.state && cart.shipping.state}{" "}
              {cart.shipping.zip} ({cart.shipping.country})
            </div>
            <div className={styles.cartReviewSectionAction}>
              <Link href={`/checkout/${id}/shipping`}>Change</Link>
            </div>
          </section>
        </div>
      </section>
      <section className={styles.cartSection}>
        <h2>Shipping Method</h2>
        <div className={styles.cartRadioOptions}>
          <ul>
            {shipping_method.map((method, index) => {
              return (
                <li key={method.id}>
                  <div>
                    <input
                      type="radio"
                      id={`shipping_method.${method.id}`}
                      name="shipping_method"
                      value={method.id}
                      placeholder={method.name}
                      required
                      defaultChecked={index === 0 ? true : false}
                    />
                    <label htmlFor={`shipping_method.${method.id}`}>
                      {method.name}
                    </label>
                  </div>
                  <span>${method.price.toFixed(2)}</span>
                </li>
              );
            })}
            {/* <li>
              <div>
                <input
                  type="radio"
                  id="shipping_method.standard_shipping"
                  name="shipping_method"
                  value={"standard_shipping"}
                  placeholder="Standard Shipping"
                  required
                  defaultChecked
                />
                <label htmlFor="shipping_method.standard_shipping">
                  Standard Shipping
                </label>
              </div>
              <span>$20.00</span>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  id="shipping_method.express_shipping"
                  name="shipping_method"
                  value={"express_shipping"}
                  placeholder="Express Shipping"
                  required
                />
                <label htmlFor="shipping_method.express_shipping">
                  Express Shipping
                </label>
              </div>
              <span>$50.00</span>
            </li> */}
          </ul>
        </div>
      </section>
      <CartActions
        buttonText={"Continue to billing"}
        linkText={"Back"}
        link={`/checkout/${id}/billing`}
      />
    </form>
  );
};

export default ShippingMethod;
