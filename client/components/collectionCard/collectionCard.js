import { Card } from "@theme-ui/components";
import ImageCarousel from "../ui/imageCarousel/lazyImageCarousel";
import Link from "../ui/link/link";
import styles from "../productCard/productCard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { getProduct } from "@/lib/operations-swell";
import SkeletonCollectionCard from "./skeletonCollectionCard";

const CollectionCard = ({
  category,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = "responsive",
  type,
}) => {
  const [imageSrc, setImageSrc] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [price, setPrice] = useState();
  const handle = category.slug;
  if (!imgWidth) {
    imgWidth = 350;
  }
  if (!imgHeight) {
    imgHeight = 400;
  }

  useEffect(() => {
    const fetchOptions = async () => {
      await swell.init(swellConfig.storeId, swellConfig.publicKey);
      if (category) {
        const options = await getProduct({ id: category.id });
        setPrice(Number(options.price));
        setImageSrc(
          !options.images.length
            ? `https://placehold.co/${imgWidth}x${imgHeight}/jpeg`
            : options.images[0].file.url
        );
        if (options.variants.length) {
          setImageSrc(
            !options.variants[0].images && imageSrc
              ? `https://placehold.co/${imgWidth}x${imgHeight}/jpeg`
              : options.variants[0].images[0].file.url
          );
          const min = Number(options.variants[0].price).toFixed(2);
          const max = Number(
            options.variants[options.variants.length - 1].price
          ).toFixed(2);

          if (max === min) {
            setPrice(`$${Number(min).toFixed(2)}`);
          } else {
            setPrice(`$${min} - $${max}`);
          }
          setMaxPrice(Number(!max ? 0 : max).toFixed(2));
          setMinPrice(Number(min).toFixed(2));
          // if (max !== min) {
          //   setMaxPrice(Number(!max ? 0 : max).toFixed(2));
          //   setMinPrice(Number(min).toFixed(2));
          // } else {
          //   setMaxPrice(Number(min).toFixed(2));
          // }
        }
        // console.log(options);
      }
    };
    if (category) {
      fetchOptions();
    }
  }, [category]);

  if (!imageSrc) {
    return <SkeletonCollectionCard />;
  }

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        pt: 2,
        pl: 2,
        pr: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: [700, imgHeight || 540],
        minHeight: [700, imgHeight || 540],
        minWidth: [700, imgWidth || 540],
        // mb: 4,
        border: "2px solid lightgrey",
      }}
      className={styles.container}
    >
      <Link
        href={
          type === "collection"
            ? `/collection/${handle}/`
            : `/products/${handle}/`
        }
        className={`${styles.link} ${styles.LinkContainer}`}
      >
        <div className={styles.imgWrapper}>
          {/* <ImageCarousel
            currentSlide={category.images ? category.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            sizes={imgSizes}
            alt={category.name}
            images={
              category.images?.length
                ? category.images
                : [
                    {
                      src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
                    },
                  ]
            }
          /> */}
          <Image
            src={
              !imageSrc
                ? `https://placehold.co/${imgWidth}x${imgHeight}/jpeg`
                : imageSrc
            }
            priority={imgPriority}
            height={250}
            width={250}
            alt={category.name}
            key={category.id}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 className={styles.h2}>{category.name}</h2>
          {type !== "collection" && (
            <p className={styles.p}>
              {typeof price === "string" ? (
                <span>{price}</span>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </p>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default CollectionCard;
