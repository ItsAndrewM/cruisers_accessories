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
    let path = router.asPath
      .split("/")
      .map((route) => {
        return route.replace(/-/g, " ");
      })
      .filter((path) => path !== "");
    const found = path.find((val) => {
      return val.includes("?");
    });
    if (found) {
      path = path[path.indexOf(found)].split("?");
      path.pop();
    }
    console.log(found);
    setRoutes(path);
    const url = router.asPath.split("/").filter((path) => path !== "");
    setAsLink(url);
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
            let url = "";
            for (let i = 0; i <= index; i++) {
              url += "/" + asLink[i];
            }
            return (
              <li key={path}>
                <span key={index}>/ </span>
                <Link
                  href={url}
                  className={
                    router.asPath === url
                      ? styles.active
                      : featuredCatStyles.link
                  }
                >
                  {path}
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
