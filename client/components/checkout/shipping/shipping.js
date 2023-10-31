import { useEffect, useState } from "react";
import styles from "../checkout.module.css";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { Country, State, City } from "country-state-city";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import CustomerInfo from "../customerInfo/customerInfo";
import { useRouter } from "next/router";
import CartActions from "../cartActions/cartActions";

const Shipping = () => {
  const [countries, setCountries] = useState([]);
  const [selectecCountry, setSelectedCountry] = useState();
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [keepInfo, setKeepInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const [updatedFormData, setUpdatedFormData] = useState();
  const router = useRouter();

  const cart = useCart();
  const handlChange = (e) => {
    setKeepInfo(e.target.checked);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      await swell.init(swellConfig.storeId, swellConfig.publicKey);
      const settings = await swell.cart.getSettings();
      if (!settings.countries.length) {
        const allCountries = await Country.getAllCountries();
        setCountries(allCountries);
      } else {
        setCountries(settings.countries);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      const states = await State.getStatesOfCountry(selectecCountry);
      setStates(states);
    };

    if (selectecCountry) {
      fetchState();
    }
  }, [selectecCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = e.target.checkValidity();
    const form = e.target;
    const formData = new FormData(e.currentTarget);
    const validationMessages = Array.from(formData.keys()).reduce(
      (acc, key) => {
        acc[key] = form.elements[key].validationMessage;
        return acc;
      },
      {}
    );
    if (isValid) {
      // here you do what you need to do if is valid
      const data = Array.from(formData.keys()).reduce((acc, key) => {
        acc[key] = formData.get(key);
        return acc;
      }, {});
      const shipping = Array.from(formData.keys()).reduce((acc, key) => {
        if (key.includes("shipping")) {
          acc[key.split(".")[1]] = formData.get(key);
        }
        return acc;
      }, {});

      const account = Array.from(formData.keys()).reduce((acc, key) => {
        if (key.includes("account")) {
          acc[key.split(".")[1]] = formData.get(key);
        }
        return acc;
      }, {});
      try {
        await swell.init(swellConfig.storeId, swellConfig.publicKey);
        const response = await swell.cart.update({
          shipping: shipping,
          account: account,
        });
        if (!response) {
          throw new Error(`Invalid response: ${response.status}`);
        }
        router.push(`/checkout/${response.checkout_id}/shipping-method`);
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
    <form onSubmit={handleSubmit}>
      <CustomerInfo />

      <section className={styles.cartSection}>
        <h2>Shipping Address</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                id="field_shipping.first_name"
                type="text"
                autoComplete="given-name"
                name="shipping.first_name"
                placeholder="First Name"
                required
                className={styles.formField}
              />
              <label
                htmlFor="field_shipping.first_name"
                className={`${styles.formLabel} `}
              >
                First Name
              </label>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                id="field_shipping.last_name"
                type="text"
                autoComplete="family-name"
                name="shipping.last_name"
                placeholder="Last Name"
                required
                className={styles.formField}
              />
              <label
                htmlFor="field_shipping.last_name"
                className={styles.formLabel}
              >
                Last Name
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Company (optional)"
                name="shipping.company"
                id="field_shipping.company"
                autoComplete="organization"
                className={styles.formField}
              />
              <label
                htmlFor="field_shipping.company"
                className={styles.formLabel}
              >
                Company (optional)
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                type="search"
                placeholder="Address"
                name="shipping.address1"
                id="field_shipping.address1"
                autoComplete="street-address"
                className={styles.formField}
                required
              />
              <label
                htmlFor="field_shipping.address1"
                className={styles.formLabel}
              >
                Address
              </label>
            </div>
          </div>
          <div className={`${styles.col} ${styles.col33}`}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Apt, etc. (optional)"
                name="shipping.address2"
                id="field_shipping.address2"
                className={styles.formField}
              />
              <label
                htmlFor="field_shipping.address2"
                className={styles.formLabel}
              >
                Apt, etc. (optional)
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="City"
                name="shipping.city"
                id="field_shipping.city"
                autoComplete="home city"
                className={styles.formField}
                required
              />
              <label htmlFor="field_shipping.city" className={styles.formLabel}>
                City
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.col40}${styles.col}`}>
            <div className={styles.formGroup}>
              <select
                id="field_shipping.country"
                className={styles.formField}
                placeholder="Country"
                name="shipping.country"
                onChange={(e) => setSelectedCountry(e.target.value)}
                defaultValue={"Country"}
              >
                <option value={"Country"} disabled>
                  Country
                </option>
                {countries.map((country) => {
                  return (
                    <option
                      key={country.isoCode}
                      label={country.name}
                      value={country.isoCode}
                    >
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="field_shipping.country"
                className={`${!selectecCountry ? styles.hide : styles.show} ${
                  styles.formLabel
                }`}
              >
                Country
              </label>
            </div>
          </div>
          <div className={`${styles.col} ${styles.col30}`}>
            <div className={styles.formGroup}>
              <select
                type="text"
                placeholder="State/province"
                name="shipping.state"
                id="field_shipping.state"
                className={styles.formField}
                onChange={(e) => setSelectedState(e.target.value)}
                defaultValue={"State/province"}
              >
                <option value={"State/province"} disabled>
                  State/province
                </option>
                {!states.length ? (
                  <option value="Select a country">Select a country</option>
                ) : (
                  states.map((state) => {
                    return (
                      <option
                        value={state.isoCode}
                        label={state.name}
                        key={state.isoCode}
                      >
                        {state.name}
                      </option>
                    );
                  })
                )}
              </select>
              <label
                htmlFor="field_shipping.state"
                className={` ${!selectedState ? styles.hide : styles.show} ${
                  styles.formLabel
                }`}
              >
                State/province
              </label>
            </div>
          </div>
          <div className={`${styles.col} ${styles.col20}`}>
            <div className={styles.formGroup}>
              <input
                id="field_shipping.zip"
                type="text"
                placeholder="Zip/postal"
                name="shipping.zip"
                className={styles.formField}
                autoComplete="postal-code"
              />
              <label htmlFor="field_shipping.zip" className={styles.formLabel}>
                Zip/postal
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Phone number (optional)"
                name="shipping.phone"
                id="field_shipping.phone"
                autoComplete="tel"
                className={styles.formField}
              />
              <label
                htmlFor="field_shipping.phone"
                className={styles.formLabel}
              >
                Phone number (optional)
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <textarea
                type="text"
                placeholder="Comments (optional)"
                name="comments"
                id="field_comments"
                className={`${styles.comments} ${styles.formField}`}
              ></textarea>
              <label htmlFor="field_comments" className={styles.formLabel}>
                Comments (optional)
              </label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.hint}>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                placeholder="Save my information for next time"
                name="account_info_saved"
                id="field_account_info_saved"
                onChange={handlChange}
                // className={` ${styles.formField}`}
              />
              <label
                htmlFor="field_account_info_saved"
                // className={styles.formLabel}
              >
                Save my information for next time
              </label>
            </div>
          </div>
        </div>
        {!keepInfo ? (
          <></>
        ) : (
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Create a password"
                  name="account.password"
                  id="field_account.password"
                  autoComplete="off"
                  className={` ${styles.formField}`}
                />
                <label
                  htmlFor="field_account.password"
                  className={styles.formLabel}
                >
                  Create a password
                </label>
              </div>
            </div>
          </div>
        )}
      </section>

      <CartActions
        buttonText={"Continue to shipping method"}
        linkText={"Return to store"}
        link={"/"}
      />
    </form>
  );
};

export default Shipping;
