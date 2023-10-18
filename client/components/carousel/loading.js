import styles from "./carousel.module.css";

const Loading = () => {
  return (
    <div
      className={styles.wrapper}
      style={{
        minWidth: "575px",
        width: "100%",
        maxWidth: "575px",
        maxHeight: "575px",
        minHeight: "575px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: "475px",
          width: "100%",
          maxWidth: "475px",
          maxHeight: "475px",
          minHeight: "475px",
          backgroundColor: "lightgrey",
        }}
      ></div>
    </div>
  );
};

export default Loading;
