import Image from "next/image";
import styles from "./filterBar.module.css";
import filter from "@/assets/icons/filter.svg";
import { useState } from "react";
import { useRouter } from "next/router";

const FilterBar = ({ setSort }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    router.push({ query: { sort: e.target.value } });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button onClick={() => setOpen(!open)}>
          <Image src={filter} height={50} width={50} alt="filter icon" />
        </button>
        <h3>Sort</h3>
      </div>
      <form
        className={`${styles.filterForm} ${open ? styles.open : styles.close}`}
        onChange={handleChange}
      >
        <ul>
          <li>
            <input type="radio" value={"name asc"} name={"filter"} />
            <label htmlFor="filter">Alphabetical, A to Z</label>
          </li>
          <li>
            <input type="radio" value={"name desc"} name={"filter"} />
            <label htmlFor="filter">Alphabetical, Z to A</label>
          </li>
          <li>
            <input type="radio" value={"price asc"} name={"filter"} />
            <label htmlFor="filter">Price, Lowest to highest</label>
          </li>
          <li>
            <input type="radio" value={"price desc"} name={"filter"} />
            <label htmlFor="filter">Price, Highest to lowest</label>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default FilterBar;
