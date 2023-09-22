import styles from "./accordion.module.css";

const Accordion = ({ tabs, title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{title}</h1>
      </div>
      <div className={styles.container}>
        <ul className={`${styles.eventList}`}>
          {/* {tabs.map((val, index) => {
            return (
              <li key={index}>
                <details className={`${styles.accordian}`}>
                  <summary>{val.summary}</summary>
                </details>
                <div className={styles.content}>
                  <p>{val.content}</p>
                </div>
              </li>
            );
          })} */}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
