import styles from "@/blocks/productView/productView.module.css";
import { useEffect } from "react";

const Option = ({
  value,
  index,
  isMobile,
  setPixels,
  pixels,
  option,
  setVariant,
  variants,
}) => {
  useEffect(() => {
    if (pixels === (option.values.length - index) * (isMobile ? 325 : 575)) {
      const selected = variants.find((val) => {
        const ele = val.name.replace(" -", "");
        return ele.includes(value.name);
      });
      setVariant(selected);
    }
  }, [pixels]);
  return (
    <li
      key={value.id}
      onClick={() =>
        setPixels((option.values.length - index) * (isMobile ? 325 : 575))
      }
    >
      <label
        style={{
          border:
            pixels === (option.values.length - index) * (isMobile ? 325 : 575)
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
};

export default Option;
