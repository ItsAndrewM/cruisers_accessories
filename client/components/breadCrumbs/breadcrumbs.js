import { useRouter } from "next/router";
import styles from "./breadcrumbs.module.css";
import { useEffect, useState } from "react";
import featuredCatStyles from "../featuredCat/featuredCat.module.css";
import Link from "next/link";
import {
  getBreadCrumbs,
  getParentOfCategory,
  getProductWithCategory,
} from "@/lib/operations-swell";

const BreadCrumbs = () => {
  const router = useRouter();
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetchBreadCrumbs = async () => {
      const breadCrumb = await getBreadCrumbs(router);
      setRoutes(breadCrumb);
    };
    fetchBreadCrumbs();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li key={"home"}>
          <Link href={"/"} className={featuredCatStyles.link}>
            Home
          </Link>
        </li>
        {!routes.length ? (
          <></>
        ) : (
          routes.map((path, index) => {
            return (
              <li key={path.path}>
                <span key={index}>/ </span>
                <Link
                  href={path.link}
                  className={
                    router.asPath === path.link
                      ? styles.active
                      : featuredCatStyles.link
                  }
                >
                  {path.path}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
