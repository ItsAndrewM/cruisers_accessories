import CartActions from "../cartActions/cartActions";
import styles from "../checkout.module.css";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { useRouter } from "next/router";

const Billing = ({ id, cart }) => {
  const [countries, setCountries] = useState([]);
  const [selectecCountry, setSelectedCountry] = useState();
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [keepInfo, setKeepInfo] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSameShippingSubmit = async (e) => {
    e.preventDefault();
    if (!billingAddress) {
      try {
        await swell.init(swellConfig.storeId, swellConfig.publicKey);
        const billing = Object.keys(cart.shipping)
          .filter((key) => {
            if (key !== "account_address_id" && key !== "service") {
              return key;
            }
          })
          .reduce((obj, key) => {
            obj[key] = cart.shipping[key];
            return obj;
          }, {});
        const response = await swell.cart.update({
          billing: billing,
        });
        if (!response) {
          throw new Error(`Invalid response: ${response.status}`);
        }
        router.push(`/checkout/${response.checkout_id}/payment`);
      } catch (err) {
        console.error(err);
        alert(
          "We can't submit the form, please review your answers and try again."
        );
      }
    }
  };

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
      const billing = Array.from(formData.keys()).reduce((acc, key) => {
        if (key.includes("billing")) {
          acc[key.split(".")[1]] = formData.get(key);
        }
        return acc;
      }, {});

      try {
        await swell.init(swellConfig.storeId, swellConfig.publicKey);
        const response = await swell.cart.update({
          billing: billing,
        });
        if (!response) {
          throw new Error(`Invalid response: ${response.status}`);
        }
        router.push(`/checkout/${response.checkout_id}/payment`);
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

  const handleRadioButton = (e) => {
    setBillingAddress(!billingAddress);
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

  return (
    <section className={styles.cartSection}>
      <div className={styles.cartSectionHeader}>
        <h2>Billing Address</h2>
        <span className={`${styles.muted} ${styles.hint}`}>
          This address will be used for tax calculation
        </span>
      </div>
      <form onChange={handleRadioButton} onSubmit={handleSameShippingSubmit}>
        <div className={styles.cartRadioOptions}>
          <ul>
            <li>
              <div>
                <input
                  type="radio"
                  id="billing.same_as_shipping"
                  name="billing_address"
                  value={false}
                  placeholder="Same as shipping address"
                  defaultChecked
                />
                <label htmlFor="billing.same_as_shipping">
                  Same as shipping address
                </label>
              </div>
              <span></span>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  id="billing.new_shipping"
                  name="billing_address"
                  value={true}
                  placeholder="Use a different billing address"
                />
                <label htmlFor="billing.new_shipping">
                  Use a different billing address
                </label>
              </div>
              <span></span>
            </li>
          </ul>
        </div>
        {!billingAddress ? (
          <CartActions
            linkText={"Back"}
            link={`/checkout/${id}/payment`}
            buttonText={"Continue to payment"}
          />
        ) : (
          <></>
        )}
      </form>
      {!billingAddress ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <input
                  id="field_billing.first_name"
                  type="text"
                  autoComplete="given-name"
                  name="billing.first_name"
                  placeholder="First Name"
                  required
                  className={styles.formField}
                />
                <label
                  htmlFor="field_billing.first_name"
                  className={`${styles.formLabel} `}
                >
                  First Name
                </label>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <input
                  id="field_billing.last_name"
                  type="text"
                  autoComplete="family-name"
                  name="billing.last_name"
                  placeholder="Last Name"
                  required
                  className={styles.formField}
                />
                <label
                  htmlFor="field_billing.last_name"
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
                  name="billing.company"
                  id="field_billing.company"
                  autoComplete="organization"
                  className={styles.formField}
                />
                <label
                  htmlFor="field_billing.company"
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
                  name="billing.address1"
                  id="field_billing.address1"
                  autoComplete="street-address"
                  className={styles.formField}
                  required
                />
                <label
                  htmlFor="field_billing.address1"
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
                  name="billing.address2"
                  id="field_billing.address2"
                  className={styles.formField}
                />
                <label
                  htmlFor="field_billing.address2"
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
                  name="billing.city"
                  id="field_billing.city"
                  autoComplete="home city"
                  className={styles.formField}
                  required
                />
                <label
                  htmlFor="field_billing.city"
                  className={styles.formLabel}
                >
                  City
                </label>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col40}${styles.col}`}>
              <div className={styles.formGroup}>
                <select
                  id="field_billing.country"
                  className={styles.formField}
                  placeholder="Country"
                  name="billing.country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option
                    disabled={true}
                    value={null}
                    defaultValue
                    key={"Country"}
                  >
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
                  htmlFor="field_billing.country"
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
                  name="billing.state"
                  id="field_billing.state"
                  className={styles.formField}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option
                    disabled={true}
                    value={null}
                    defaultValue
                    key={"State/province"}
                  >
                    State/province
                  </option>
                  {!states.length ? (
                    <option disabled={true} value="" key={"Select a country"}>
                      Select a country
                    </option>
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
                  htmlFor="field_billing.state"
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
                  id="field_billing.zip"
                  type="text"
                  placeholder="Zip/postal"
                  name="billing.zip"
                  className={styles.formField}
                  autoComplete="postal-code"
                />
                <label htmlFor="field_billing.zip" className={styles.formLabel}>
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
                  name="billing.phone"
                  id="field_billing.phone"
                  autoComplete="tel"
                  className={styles.formField}
                />
                <label
                  htmlFor="field_billing.phone"
                  className={styles.formLabel}
                >
                  Phone number (optional)
                </label>
              </div>
            </div>
          </div>
          <CartActions
            linkText={"Back"}
            link={`/checkout/${id}/payment`}
            buttonText={"Continue to payment"}
          />
        </form>
      )}
    </section>
  );
};

export default Billing;
