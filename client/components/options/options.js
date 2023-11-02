import styles from "@/blocks/productView/productView.module.css";
import { Fragment } from "react";

const Options = ({
  option,
  handleChange,
  target,
  pixels,
  setPixels,
  isMobile,
}) => {
  return (
    <Fragment key={option.name}>
      <p className={styles.textHeader}>{option.name}</p>
      <form onChange={handleChange}>
        <ul className={styles.options}>
          {option.values.map((value, index) => {
            return (
              <li
                key={value.id}
                onClick={() =>
                  setPixels(
                    (option.values.length - index) * (isMobile ? 325 : 575)
                  )
                }
              >
                <label
                  style={{
                    border:
                      pixels ===
                      (option.values.length - index) * (isMobile ? 325 : 575)
                        ? "2px solid var(--casBlue)"
                        : "2px solid var(--cream)",
                  }}
                >
                  {value.name}
                  <input
                    type="radio"
                    value={value.id}
                    name={option.name}
                    className={styles.option}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </form>
    </Fragment>
  );
};

export default Options;
