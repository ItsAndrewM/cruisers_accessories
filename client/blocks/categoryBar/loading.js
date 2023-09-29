import styles from "./categoryBar.module.css";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.box}>
        <li className={styles.listItem} style={{ gap: ".5em" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "lightGrey",
            }}
          ></div>
          <span
            style={{
              width: "100px",
              height: "25px",
              backgroundColor: "lightGrey",
              borderRadius: "25px",
            }}
          ></span>
        </li>
        <li className={styles.listItem}>
          <div
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "lightGrey",
            }}
          ></div>
          <span
            style={{
              width: "100px",
              height: "25px",
              backgroundColor: "lightGrey",
              borderRadius: "25px",
            }}
          ></span>
        </li>
        <li className={styles.listItem}>
          <div
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "lightGrey",
            }}
          ></div>
          <span
            style={{
              width: "100px",
              height: "25px",
              backgroundColor: "lightGrey",
              borderRadius: "25px",
            }}
          ></span>
        </li>
      </ul>
    </div>
  );
};

export default Loading;
