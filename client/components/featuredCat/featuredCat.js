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
      swell.init(
        process.env.NEXT_PUBLIC_SWELL_STORE_ID,
        "pk_By1MsSwBSiM1eFL4HPR8IWkRpO9N9m2C"
      );
      const props = await swell.categories.list({
        limit: 25,
        page: 1,
      });
      //   const filtered = props.results.filter((ele) => {
      //     return ele.images !== null;
      //   });
      const results = props.results.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setItems(results);
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
                      alt=""
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
