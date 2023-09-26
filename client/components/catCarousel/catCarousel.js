import AliceCarousel from "react-alice-carousel";
import styles from "./catCarousel.module.css";
import swell from "swell-js";
import style from "../../components/catCarousel/catCarousel.module.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CatCarousel = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      swell.init(
        process.env.NEXT_PUBLIC_SWELL_STORE_ID,
        "pk_By1MsSwBSiM1eFL4HPR8IWkRpO9N9m2C"
      );
      const props = await swell.categories.list({
        limit: 100,
        page: 1,
      });
      const results = props.results.filter((prop) => {
        return prop.parent_id === null;
      });
      const categories = results.map((cats, index) => {
        return (
          // <Link href={`/products/product-category/${cats.slug}`} key={cats.id}>
          <>
            <Image
              src={
                !cats.images
                  ? "https://placehold.co/500/jpeg"
                  : cats.images[0].file.url
              }
              alt={cats.name}
              width={500}
              height={500}
              quality={100}
            />
            <div className={style.textContainer}>
              <h1>{cats.name}</h1>
              <div>
                <h4>
                  <Link
                    href={`/products/product-category/${cats.slug}`}
                    className={styles.link}
                  >
                    SHOP {cats.name}
                  </Link>
                </h4>
              </div>
            </div>
          </>
          // </Link>
        );
      });
      setItems(categories);
    };
    getCategories();
  }, []);

  const responsive = {
    0: { items: 1, itemsFit: "contain" },
    568: { items: 1, itemsFit: "contain" },
    1024: { items: 3, itemsFit: "contain" },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AliceCarousel
          mouseTracking
          items={items && items}
          responsive={responsive}
          controlsStrategy="default"
          disableButtonsControls={true}
        />
      </div>
    </div>
  );
};

export default CatCarousel;
