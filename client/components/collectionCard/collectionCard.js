import { Card } from "@theme-ui/components";
import ImageCarousel from "../ui/imageCarousel/lazyImageCarousel";
import Link from "../ui/link/link";
import styles from "../productCard/productCard.module.css";
import Image from "next/image";

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
  const handle = category.slug;
  console.log(category);
  if (!imgWidth) {
    imgWidth = 500;
  }
  if (!imgHeight) {
    imgHeight = 500;
  }
  console.log(category);
  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: "flex",
        flexDirection: "column",
        maxHeight: [700, imgHeight || 540],
        minHeight: [700, imgHeight || 540],
        minWidth: [700, imgWidth || 540],
        mb: 2,
      }}
    >
      <Link
        href={
          type === "collection"
            ? `/collection/${handle}/`
            : `/products/${handle}/`
        }
        className={styles.link}
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
              category.images?.length > 0
                ? category.images[0].file.url
                : `https://via.placeholder.com/${imgWidth}x${imgHeight}`
            }
            priority={imgPriority}
            height={imgHeight}
            width={imgWidth}
            alt={category.name}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 className={styles.h2}>{category.name}</h2>
          {type !== "collection" && (
            <p className={styles.p}>${Number(category.price).toFixed(2)}</p>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default CollectionCard;
