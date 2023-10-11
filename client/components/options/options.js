import styles from "@/blocks/productView/productView.module.css";

const Options = ({ option, variants }) => {
  return (
    <>
      <p className={styles.textHeader}>{option.name}</p>
      <form onChange={handleChange}>
        <ul className={styles.options}>
          {option.values.map((value) => {
            return (
              <li key={value.id}>
                <label>
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
    </>
  );
};

export default Options;
