import { useEffect, useState } from "react";
import styles from "../navbar.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  getCategoriesForNavigation,
  getPaginatedItems,
} from "@/lib/operations-swell";
import Link from "next/link";
import NavigationLinkItem from "../navigationLinkItem";
const Nav = ({ navigationLinks, setCurrent, current }) => {
  const [links, setLinks] = useState([]);
  const [categoryLinks, setCategoryLinks] = useState([]);

  useEffect(() => {
    if (navigationLinks) {
      const filtered = navigationLinks.filter((link) => {
        return (
          link.title.toLowerCase().includes("shop".toLowerCase()) ||
          link.title.toLowerCase().includes("FAQ".toLowerCase()) ||
          link.title.toLowerCase().includes("Contact Us".toLowerCase()) ||
          link.title.toLowerCase().includes("about us".toLowerCase())
        );
      });
      setLinks(filtered);
    }
    const fetchCategories = async () => {
      const categories = await getCategoriesForNavigation();
      setCategoryLinks(categories);
    };
    if (!categoryLinks.length) {
      fetchCategories();
    }
  }, []);
  return (
    <nav className={styles.container}>
      <ul className={styles.navlinks}>
        {links.length &&
          links?.map((link, index) => {
            return (
              <NavigationLinkItem
                link={link}
                index={index}
                setCurrent={setCurrent}
                current={current}
                key={uuidv4()}
                categoryLinks={categoryLinks}
              />
            );
          })}
      </ul>
    </nav>
  );
};

export default Nav;
