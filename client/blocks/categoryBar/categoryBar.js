import Image from "next/image";
import styles from "./categoryBar.module.css";
import Link from "next/link";
import featuredCatStyles from "../../components/featuredCat/featuredCat.module.css";

const CategoryBar = ({ children }) => {
  if (!children.length) {
    return <></>;
  }
  return (
    <div className={styles.wrapper}>
      <ul className={styles.box}>
        {children.map((child) => {
          return (
            <li className={styles.listItem} key={child.id}>
              <Link href={`/collection/${child.slug}`}>
                <Image
                  src={
                    child.images?.length > 0
                      ? category.images[0].file.url
                      : `https://placehold.co/150/jpeg`
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
  );
};

export default CategoryBar;
