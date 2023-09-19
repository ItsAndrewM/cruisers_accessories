import { useEffect } from "react";
import styles from "./searchByBoat.module.css";

const BoatSelect = ({
  values,
  label,
  setState,
  defaultVal,
  name,
  getError,
  required,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };
  return (
    <div className={styles.dropdown}>
      <label>
        {label}
        {required ? <span>{"*"}</span> : <></>}
      </label>
      <select
        onChange={handleChange}
        defaultValue={defaultVal}
        style={{ textTransform: "capitalize" }}
        name={name}
        required={required ? true : false}
        className={getError(name) ? styles.invalid : ""}
      >
        <option
          value={defaultVal}
          disabled
          style={{ textTransform: "capitalize" }}
        >
          {defaultVal}
        </option>
        {!values.length ? (
          <></>
        ) : (
          values.map((val, index) => {
            return (
              <option key={`${val} + ${index}`} value={val}>
                {val}
              </option>
            );
          })
        )}
      </select>
      <span className={styles.error}>{getError(name)}</span>
    </div>
  );
};

export default BoatSelect;
