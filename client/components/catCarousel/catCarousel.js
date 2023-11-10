import AliceCarousel from "react-alice-carousel";
import styles from "./catCarousel.module.css";
import swell from "swell-js";
import style from "../../components/catCarousel/catCarousel.module.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import searchByBoatStyles from "../searchByBoat/searchByBoat.module.css";
import rightArrow from "@/assets/icons/arrowRight.svg";
import leftArrow from "@/assets/icons/arrowLeft.svg";

const CatCarousel = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      swell.init(
        process.env.NEXT_PUBLIC_SWELL_STORE_ID,
        process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
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
          // <Link href={`/collection/${cats.slug}`} style={{ display: "block" }}>
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
                    // href={`/products/product-category/${cats.slug}`}
                    href={`/collection/${cats.slug}`}
                    className={searchByBoatStyles.submit}
                    style={{ border: "none" }}
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

  const handlePrev = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AliceCarousel
          mouseTracking
          items={items && items}
          responsive={responsive}
          controlsStrategy="default"
          disableButtonsControls={false}
          renderPrevButton={() => {
            return (
              <button
                onClick={handlePrev}
                className={styles.button}
                id={styles.prevButton}
              >
                <Image
                  src={leftArrow}
                  width={75}
                  height={75}
                  alt="previous button"
                  aria-label="previous button"
                />
              </button>
            );
          }}
          renderNextButton={() => {
            return (
              <button
                onClick={handlePrev}
                className={styles.button}
                id={styles.nextButton}
                aria-label="Next button"
              >
                <Image
                  src={rightArrow}
                  width={75}
                  height={75}
                  style={{ color: "var(--casOrange)" }}
                  alt="next button"
                />
              </button>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CatCarousel;
