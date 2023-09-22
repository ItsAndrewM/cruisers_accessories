import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import UserNav from "../userNav/userNav";
import env from "../../../config/env";
import { BuilderComponent, builder } from "@builder.io/react";
import { useCart } from "../../../lib/hooks/useCart";
import { useThemeUI } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { useUI } from "../context";
import Image from "next/image";
import Searchbar from "../searchBar/searchBar";
import styles from "./navbar.module.css";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [announcement, setAnnouncement] = useState();
  const { theme } = useThemeUI();
  const { navigationLinks, logo } = useUI();
  const cart = useCart();

  const handleHover = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    setShow(false);
  };

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.items || [];
      const anouncementContent = await builder
        .get("announcement-bar", {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item) => item.product.slug),
          },
        })
        .toPromise();
      setAnnouncement(anouncementContent);
    }
    fetchContent();
  }, [cart?.items]);
  return (
    <header className={styles.header}>
      <BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.cart}>
            <span>
              <Link
                href={"tel:1-888-958-5638"}
                className={featuredCatStyles.link}
              >
                1-888-958-5638
              </Link>
            </span>
            <span>
              <Link
                href={"mailto:info@precisionsailloft.com"}
                className={featuredCatStyles.link}
              >
                info@precisionsailloft.com
              </Link>
            </span>
          </div>
          <UserNav />
        </div>
        <div className={styles.logo}>
          <h1>
            {logo && logo.image && (
              <Link href="/">
                <Image
                  layout="fixed"
                  width={logo.width}
                  height={logo.height}
                  src={logo.image}
                  alt={logo.text}
                ></Image>
              </Link>
            )}
            {logo && logo.text && !logo.image && (
              <Link href="/">{logo.text}</Link>
            )}
          </h1>
          <Searchbar />
        </div>
        <nav className={styles.container}>
          <ul className={styles.navlinks}>
            {navigationLinks?.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.link}
                  className={featuredCatStyles.link}
                  onMouseEnter={link.subLinks && handleHover}
                >
                  {link.title}
                </Link>
                {!link.subLinks?.length ? (
                  <></>
                ) : (
                  <ul
                    className={`${
                      !show ? styles.subMenuItemHide : styles.subMenuItemShow
                    }`}
                    onMouseLeave={handleLeave}
                  >
                    {link?.subLinks.map((subLink, index) => {
                      return (
                        <li
                          key={`${subLink.title} + ${String(index)}`}
                          className={styles.top}
                        >
                          <Link
                            href={subLink.link}
                            className={featuredCatStyles.link}
                          >
                            {subLink.title}
                          </Link>
                          {!subLink.subLinks?.length ? (
                            <></>
                          ) : (
                            <ul className={styles.subSubLinkList}>
                              {subLink.subLinks.map((subSubLink, index) => {
                                return (
                                  <li
                                    key={`${subSubLink.title} + ${String(
                                      index
                                    )}`}
                                  >
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
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
