import swell from "swell-js";
import { useEffect, useState } from "react";
import styles from "./featuredCat.module.css";
import Link from "next/link";
import blocks from "../../assets/images/blocks.png";
import electronics from "../../assets/images/electronics.png";
import furlers from "../../assets/images/furlers.png";
import rigging from "../../assets/images/rigging.png";
import sailingear from "../../assets/images/sailingear.png";
import ventilation from "../../assets/images/ventilation.png";
import winches from "../../assets/images/winches.png";
import windlasses from "../../assets/images/windlasses.png";
import Image from "next/image";

const iconArr = [
  blocks,
  electronics,
  furlers,
  rigging,
  sailingear,
  ventilation,
  winches,
  windlasses,
];

const FeaturedCat = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const props = await fetch("/api/swell/category-parents");
      const data = await props.json();
      setItems(data.data.results);
    };
    getCategories();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.container}>
        {items &&
          items.map((val, index) => {
            if (index < 8) {
              return (
                <li className={styles.listItem} key={index}>
                  <Link
                    href={`/products/product-category/${val.slug}`}
                    className={styles.imgLink}
                  >
                    <Image
                      src={iconArr[index]}
                      width={125}
                      height={125}
                      alt={val.name}
                    />
                  </Link>
                  <Link
                    href={`/products/product-category/${val.slug}`}
                    className={styles.link}
                  >
                    {val.name}
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default FeaturedCat;
