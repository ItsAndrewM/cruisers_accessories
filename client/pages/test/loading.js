import styles from "../../styles/test.module.css";

const Loading = () => {
  const arr = new Array(24);
  return (
    <ul className={styles.list}>
      {arr.map((val, index) => {
        return (
          <li key={index}>
            <div className={`${styles.skeleton}`}></div>
          </li>
        );
      })}
    </ul>
  );
};

export default Loading;
