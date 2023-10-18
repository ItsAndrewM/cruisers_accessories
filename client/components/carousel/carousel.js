import styles from "./carousel.module.css";
import { Suspense, useEffect, useState } from "react";
import arrowRight from "@/assets/icons/arrowRight.svg";
import arrowLeft from "@/assets/icons/arrowLeft.svg";
import Image from "next/image";
import LoadingDots from "../ui/loadingDots/loadingDots";

const Carousel = ({ product }) => {
  const [pixels, setPixels] = useState(0);
  const [pics, setPics] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 600
  );

  const [limit, setLimit] = useState((pics.length - 1) * 250);

  const handleDecrease = (e) => {
    e.preventDefault();
    if (pixels >= 250) {
      setPixels(pixels - 250);
    }
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    if (pixels < limit) {
      setPixels(pixels + 250);
    }
  };

  useEffect(() => {
    if (product) {
      const { id, name } = product;

      let items = [];
      items.push(
        product.images.length
          ? { id, name, ...product.images[0] }
          : { id, name, file: { url: "https://placehold.co/475/jpeg" } }
      );
      if (product.variants) {
        // const mapped = product.variants.map((variant) => {
        //   if (variant.images) {
        //     return variant.images[0];
        //   }
        // });
        product.variants.forEach((variant) => {
          const { name, id } = variant;
          console.log(!variant.images);

          items.push(
            !variant.images
              ? { id, name, file: { url: "https://placehold.co/475/jpeg" } }
              : { id, name, ...variant.images[0] }
          );
        });
        setPics(items);
      } else {
        setPics(items);
      }
    }
  }, [product]);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  if (!pics.length) {
    return <LoadingDots />;
  }

  return (
    <div>
      <ul className={styles.wrapper}>
        {pics.map((product) => {
          return (
            <li key={product.id} style={{ right: `${pixels}px` }}>
              <Image
                src={product.file.url}
                width={475}
                height={475}
                alt={product.name}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.container}>
        <ul className={styles.buttons}>
          {pics.length > 1 &&
            pics.map((product, index) => {
              // console.log(product);
              return (
                <li key={product.id}>
                  <button
                    onClick={() => setPixels(index * (isMobile ? 325 : 575))}
                    className={styles.button}
                    style={{
                      border:
                        pixels === index * (isMobile ? 325 : 575)
                          ? "2px solid var(--casBlue)"
                          : "2px solid var(--cream)",
                    }}
                  >
                    <Image
                      src={product.file.url}
                      width={75}
                      height={75}
                      alt={product.name}
                    />
                  </button>
                  <small>{product.name}</small>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
