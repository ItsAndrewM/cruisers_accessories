import styles from "./attributesFilter.module.css";

const SkeletonFilter = () => {
  return (
    <div className={styles.wrapper}>
      <form>
        <span
          style={{
            display: "block",
            width: "150px",
            height: "50px",
            borderRadius: "25px",
            backgroundColor: "lightGrey",
            marginBottom: ".5em",
          }}
        ></span>
        <div className={styles.buttonBox}>
          <button
            style={{
              width: "85px",
              height: "40px",
              backgroundColor: "lightGrey",
              border: "none",
            }}
          ></button>
        </div>
        <div className={styles.container}>
          <ul>
            <li className={styles.summary}>
              <details className={styles.accordian}>
                <summary
                  style={{
                    height: "56px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      height: "56px",
                      width: "100%",
                      borderRadius: "25px",
                      backgroundColor: "lightgrey",
                      color: "lightgrey",
                    }}
                  >
                    This is a skeleton
                  </span>
                </summary>
              </details>

              <div className={styles.content}></div>
            </li>
            <li className={styles.summary}>
              <details className={styles.accordian}>
                <summary
                  style={{
                    height: "56px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      height: "56px",
                      width: "100%",
                      borderRadius: "25px",
                      backgroundColor: "lightgrey",
                      color: "lightgrey",
                    }}
                  >
                    This is a skeleton
                  </span>
                </summary>
              </details>

              <div className={styles.content}></div>
            </li>
            <li className={styles.summary}>
              <details className={styles.accordian}>
                <summary
                  style={{
                    height: "56px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      height: "56px",
                      width: "100%",
                      borderRadius: "25px",
                      backgroundColor: "lightgrey",
                      color: "lightgrey",
                    }}
                  >
                    This is a skeleton
                  </span>
                </summary>
              </details>

              <div className={styles.content}></div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default SkeletonFilter;
