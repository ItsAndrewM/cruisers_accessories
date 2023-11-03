import { useState, useEffect } from "react";
import Link from "next/link";
import UserNav from "../userNav/userNav";
import env from "../../../config/env";
import { BuilderComponent, builder } from "@builder.io/react";
import { useCart } from "../../../lib/hooks/useCart";
import { useThemeUI } from "theme-ui";
import { useUI } from "../context";
import Image from "next/image";
import Searchbar from "../searchBar/searchBar";
import styles from "./navbar.module.css";
import NavigationLinkItem from "./navigationLinkItem";
import MobileNavbar from "../mobileNavbar/mobileNavbar";
import { v4 as uuidv4 } from "uuid";
import Nav from "./nav/nav";
import { useRouter } from "next/router";

const Navbar = () => {
  const [current, setCurrent] = useState();
  const [announcement, setAnnouncement] = useState();
  const { theme } = useThemeUI();
  const { navigationLinks, logo } = useUI();
  const cart = useCart();
  const router = useRouter();

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
            itemInCart: items.map((item) => {
              return item.product.slug;
            }),
          },
        })
        .toPromise();
      setAnnouncement(anouncementContent);
    }
    fetchContent();
  }, [cart?.items]);

  return !router.pathname.includes("checkout") ? (
    <header className={styles.header}>
      <BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />
      <MobileNavbar />
      <div className={styles.wrapper}>
        <div id={styles.navigation}>
          <Nav
            navigationLinks={navigationLinks}
            setCurrent={setCurrent}
            current={current}
          />
        </div>
        <div className={styles.logo} id={styles.casLogo}>
          <div>
            {logo && logo.image && (
              <Link href="/" className={styles.casLogo}>
                <Image
                  width={!logo.width ? 400 : logo.width}
                  height={!logo.height ? 200 : logo.height}
                  src={logo.image}
                  alt={logo.text}
                />
              </Link>
            )}
            {logo && logo.text && !logo.image && (
              <h1>
                <Link href="/">{logo.text}</Link>
              </h1>
            )}
          </div>
        </div>
        <div className={styles.logo} id={styles.search}>
          <Searchbar />
          <UserNav />
        </div>
      </div>
    </header>
  ) : (
    <></>
  );
};

export default Navbar;
