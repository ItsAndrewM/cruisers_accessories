import Image from "next/image";
import styles from "./categoryBar.module.css";
import Link from "next/link";
import featuredCatStyles from "../../components/featuredCat/featuredCat.module.css";
import collectionViewStyles from "../collectionView/collectionView.module.css";
import accordionStyles from "@/components/accordion/accordion.module.css";

const CategoryBar = ({ children, isMobile }) => {
  if (!children.length) {
    return <></>;
  }
  return !isMobile ? (
    <div className={`${styles.wrapper} ${collectionViewStyles.first}`}>
      <ul className={styles.box}>
        {children.map((child) => {
          return (
            <li className={styles.listItem} key={child.id}>
              <Link href={`/collection/${child.slug}`}>
                <Image
                  src={
                    !child?.images?.length
                      ? `https://placehold.co/150/jpeg`
                      : child.images[0].file.url
                  }
                  priority={true}
                  height={150}
                  width={150}
                  alt={child.name}
                />
              </Link>
              <Link
                href={`/collection/${child.slug}`}
                className={featuredCatStyles.link}
              >
                <span>{child.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div
      className={`${styles.wrapper} ${collectionViewStyles.first}`}
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <details
        className={`${accordionStyles.accordian}`}
        style={{ width: "100%" }}
      >
        <summary>
          <h2>View More Categories</h2>
        </summary>
      </details>
      <div
        className={accordionStyles.content}
        style={{ border: "none", width: "100%" }}
      >
        <ul className={styles.box}>
          {children.map((child) => {
            return (
              <li
                className={styles.listItem}
                key={child.id}
                style={{ maxWidth: "125px", justifyItems: "center" }}
              >
                <Link href={`/collection/${child.slug}`}>
                  <Image
                    src={
                      !child?.images?.length
                        ? `https://placehold.co/150/jpeg`
                        : child.images[0].file.url
                    }
                    priority={true}
                    height={150}
                    width={150}
                    alt={child.name}
                  />
                </Link>
                <Link
                  href={`/collection/${child.slug}`}
                  className={featuredCatStyles.link}
                >
                  <span>{child.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryBar;
