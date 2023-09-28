import { useRouter } from "next/router";
import styles from "./attributesFilter.module.css";
import { Fragment } from "react";
import searchByBoatStyles from "../searchByBoat/searchByBoat.module.css";

const AttributesFilter = ({ attributes }) => {
  const router = useRouter();

  const handleApply = (e) => {
    // e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = [...formData.entries()]
      .map((entry) => {
        return { [entry[0]]: entry[1] };
      })
      .reduce((acc, object) => {
        acc[Object.keys(object)[0]] ??= [];
        if (Array.isArray(acc[Object.values(object)[0]])) {
          acc[Object.keys(object)[0]].value = acc[
            Object.keys(object)[0]
          ].concat(Object.values(object)[0]);
        } else {
          acc[Object.keys(object)[0]].push(Object.values(object)[0]);
        }
        return acc;
      }, {});

    router.push({ query: data });
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleApply}>
        <h1>Filters</h1>
        <div className={styles.buttonBox}>
          <input type="submit" value={"Apply"} className={styles.submit} />
        </div>
        <div className={styles.container}>
          <ul>
            {attributes.map((attribute) => {
              if (!attribute.values.length) {
                return <Fragment key={attribute.name}></Fragment>;
              }
              return (
                <li key={attribute.id} className={styles.summary}>
                  <details className={styles.accordian}>
                    <summary>{attribute.name}</summary>
                  </details>

                  {!attribute.values.length ? (
                    <></>
                  ) : (
                    <div className={styles.content}>
                      <ul>
                        {attribute.values.map((value) => {
                          return (
                            <li
                              key={`${attribute.name} ${value}`}
                              className={styles.filterOption}
                            >
                              <input
                                type={"checkbox"}
                                id={value}
                                name={attribute.name}
                                value={value}
                              />
                              <label htmlFor={value}>{value}</label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AttributesFilter;
