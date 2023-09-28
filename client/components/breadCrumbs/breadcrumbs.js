import { useRouter } from "next/router";
import styles from "./breadcrumbs.module.css";
import { useEffect, useState } from "react";
import featuredCatStyles from "../featuredCat/featuredCat.module.css";
import Link from "next/link";

const BreadCrumbs = () => {
  const router = useRouter();
  const [routes, setRoutes] = useState([]);
  const [asLink, setAsLink] = useState([]);
  useEffect(() => {
    const path = router.asPath
      .split("/")
      .map((route) => {
        return route.replace(/-/g, " ");
      })
      .filter((path) => path !== "");
    setRoutes(path);
    const url = router.asPath.split("/").filter((path) => path !== "");
    setAsLink(url);
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <Link href={"/"} className={featuredCatStyles.link}>
            Home
          </Link>
        </li>
        {!routes.length ? (
          <></>
        ) : (
          routes.map((path, index) => {
            let url = "";
            for (let i = 0; i <= index; i++) {
              url += "/" + asLink[i];
            }
            console.log(url);
            return (
              <>
                <span>/</span>
                <li
                  key={path}
                  className={router.asPath === url ? styles.active : ""}
                >
                  <Link href={url}>{path}</Link>
                </li>
              </>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
