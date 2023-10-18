import { useEffect, useState } from "react";
import styles from "./categorySidebar.module.css";
import accordianStyles from "../accordion/accordion.module.css";
import featuredCatStyles from "../featuredCat/featuredCat.module.css";
import {
  getParentCategories,
  getChildCategories,
} from "@/lib/operations-swell";
import Link from "next/link";
import SkeletonCategory from "./skeletonCategory";
import navbarStyles from "../ui/navbar/navbar.module.css";

const CategorySidebar = () => {
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  useEffect(() => {
    const fetchParents = async () => {
      const parents = await getParentCategories();
      const children = await getChildCategories();
      setChildren(children);
      setParents(parents);
    };
    fetchParents();
  }, []);

  if (!children.length || !parents.length) {
    return <SkeletonCategory />;
  }

  return (
    <div>
      <h1 className={styles.header}>Categories</h1>
      <ul>
        {parents.map((parent) => {
          const kids = children.filter(
            (child) => child.parent_id === parent.id
          );
          return (
            <li key={parent.id}>
              <details className={accordianStyles.accordian}>
                <summary>
                  <Link
                    href={`/collection/${parent.slug}`}
                    className={featuredCatStyles.link}
                  >
                    {parent.name}
                  </Link>
                </summary>
              </details>

              {!kids.length ? (
                <></>
              ) : (
                <div className={accordianStyles.content}>
                  <ul className={styles.children}>
                    {kids.map((kid) => {
                      const grandChildren = children.filter(
                        (child) => child.parent_id === kid.id
                      );
                      return (
                        <li key={kid.id}>
                          <span>
                            <Link
                              href={`/collection/${kid.slug}`}
                              className={`${navbarStyles.link} ${styles.link}`}
                            >
                              {kid.name}
                            </Link>
                          </span>
                          {!grandChildren.length ? (
                            <></>
                          ) : (
                            <ul>
                              {grandChildren.map((grandChild) => {
                                return (
                                  <li key={grandChild.id}>
                                    <Link
                                      href={`/collection/${grandChild.slug}`}
                                      className={`${navbarStyles.link} ${styles.link}`}
                                    >
                                      {grandChild.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;
