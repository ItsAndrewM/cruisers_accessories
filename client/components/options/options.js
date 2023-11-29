import styles from "@/blocks/productView/productView.module.css";
import Option from "./option/option";
import { Fragment } from "react";

const Options = ({
  option,
  handleChange,
  target,
  pixels,
  setPixels,
  isMobile,
  setVariant,
  variants,
}) => {
  return (
    <Fragment key={option.name}>
      <p className={styles.textHeader}>{option.name}</p>
      <form onChange={handleChange}>
        <ul className={styles.options}>
          {option.values.map((value, index) => {
            return (
              <Option
                key={value.id}
                option={option}
                value={value}
                index={index}
                pixels={pixels}
                setPixels={setPixels}
                isMobile={isMobile}
                setVariant={setVariant}
                variants={variants}
              />
            );
          })}
        </ul>
      </form>
    </Fragment>
  );
};

export default Options;
