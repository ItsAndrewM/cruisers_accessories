import { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import { v4 as uuidv4 } from "uuid";

const SubLinkItem = ({ link, setShow, show }) => {
  const handleLeave = (e) => {
    e.preventDefault();
    setShow(false);
  };
  console.log(link);

  return (
    <ul
      className={`${!show ? styles.subMenuItemHide : styles.subMenuItemShow}`}
      onMouseLeave={handleLeave}
    >
      {link?.subLinks.map((subLink, index) => {
        return (
          <li key={uuidv4()} className={`${styles.top}`}>
            <h4>
              <Link href={subLink.link} className={styles.link}>
                {subLink.title}
              </Link>
            </h4>
            {!subLink.subLinks?.length ? (
              <></>
            ) : (
              <ul className={styles.subSubLinkList}>
                {subLink.subLinks.map((subSubLink, index) => {
                  return (
                    <li key={uuidv4()}>
                      <Link
                        href={`/collection/${subSubLink.link}`}
                        className={styles.link}
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
