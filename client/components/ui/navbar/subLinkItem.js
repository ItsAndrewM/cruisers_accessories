import { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";

const SubLinkItem = ({ link, setShow, show }) => {
  const handleLeave = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <ul
      className={`${!show ? styles.subMenuItemHide : styles.subMenuItemShow}`}
      onMouseLeave={handleLeave}
    >
      {link?.subLinks.map((subLink, index) => {
        return (
          <li
            key={`${subLink.title} + ${String(index)}`}
            className={styles.top}
          >
            <h4>
              <Link href={subLink.link} className={featuredCatStyles.link}>
                {subLink.title}
              </Link>
            </h4>
            {!subLink.subLinks?.length ? (
              <></>
            ) : (
              <ul className={styles.subSubLinkList}>
                {subLink.subLinks.map((subSubLink, index) => {
                  return (
                    <li key={`${subSubLink.title} + ${String(index)}`}>
                      <Link
                        href={subSubLink.link}
                        className={featuredCatStyles.link}
                      >
                        {subSubLink.title}
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
  );
};

export default SubLinkItem;
