import styles from "./categorySidebar.module.css";
import accordianStyles from "../accordion/accordion.module.css";

const SkeletonCategory = () => {
  return (
    <div>
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
      <ul>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
        <li>
          <details className={accordianStyles.accordian}>
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
        </li>
      </ul>
    </div>
  );
};

export default SkeletonCategory;
