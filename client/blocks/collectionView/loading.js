import styles from "./collectionView.module.css";

const Loading = () => {
  return (
    <div
      className={styles.wrapper}
      style={{
        minWidth: "1400px",
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        gap: ".25em",
      }}
    >
      <span
        style={{
          height: "50px",
          width: "200px",
          backgroundColor: "lightGrey",
          borderRadius: "25px",
        }}
      ></span>
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          gap: ".25em",
        }}
      >
        <span
          style={{
            width: "100%",
            height: "25px",
            backgroundColor: "lightGrey",
            borderRadius: "25px",
          }}
        ></span>
        <span
          style={{
            width: "100%",
            height: "25px",
            backgroundColor: "lightGrey",
            borderRadius: "25px",
          }}
        ></span>
        <span
          style={{
            width: "25%",
            height: "25px",
            backgroundColor: "lightGrey",
            borderRadius: "25px",
          }}
        ></span>
      </div>
    </div>
  );
};

export default Loading;
