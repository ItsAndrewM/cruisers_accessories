import styles from "./accordion.module.css";

const Accordion = ({ tabs, title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{title}</h1>
      </div>
      <div className={styles.container}>
        <ul className={`${styles.eventList}`}>
          {!tabs.length ? (
            <></>
          ) : (
            tabs.map((tab, index) => {
              return (
                <li key={index}>
                  <details className={`${styles.accordian}`}>
                    <summary>{tab.text}</summary>
                  </details>
                  <div className={styles.content}>
                    <p>{tab.content}</p>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
