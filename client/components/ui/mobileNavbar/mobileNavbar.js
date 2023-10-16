import Link from "next/link";
import { useUI } from "../context";
import navbarStyles from "../navbar/navbar.module.css";
import Image from "next/image";
import SubLinksNav from "./subLinksNav";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import SearchInput from "../searchInput/searchInput";
import SearchBar from "../searchBar/searchBar";
import Cart from "@/components/icons/cart";
import { useCart } from "@/lib/hooks/useCart";
import { v4 as uuidv4 } from "uuid";
import logoMobile from "@/assets/images/logo/logo_mobile.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MobileNavbar = () => {
  const { navigationLinks, logo } = useUI();
  const cart = useCart();
  const quantity = cart?.item_quantity ?? 0;
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [prevUrl, setPrevUrl] = useState(router.asPath);
  const { openSidebar } = useUI();

  useEffect(() => {
    if (router.asPath !== prevUrl) {
      setChecked(false);
      setPrevUrl(router.asPath);
    }
  }, [router.asPath]);

  const handleChange = (e) => {
    setChecked(!checked);
  };

  return (
    <nav className={navbarStyles.navigation}>
      <div id={navbarStyles.menuToggle}>
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span></span>
        <span></span>
        <span></span>
        <ul id={navbarStyles.menu}>
          <li>
            <Link href={"/products"}>
              <h4>Products</h4>
            </Link>
          </li>
          <li className={navbarStyles.menuHeader}>
            <Link href={"/collection"}>
              <h4>Categories</h4>
            </Link>
          </li>
          {navigationLinks?.map((link) => {
            if (
              !link.link.includes("/about-us") &&
              !link.link.includes("/contact-us")
            ) {
              return (
                <li key={uuidv4()}>
                  <Link href={link.link} className={featuredCatStyles.link}>
                    {link.title}
                  </Link>
                  {link.subLinks && link.subLinks.length ? (
                    <SubLinksNav
                      sublinks={link.subLinks}
                      link={link.link}
                      title={link.title}
                    />
                  ) : (
                    <></>
                  )}
                </li>
              );
            }
          })}
          <li key={"border-bottom"} id={navbarStyles.categories}></li>
          {navigationLinks?.map((link) => {
            if (
              link.link.includes("/about-us") ||
              link.link.includes("/contact-us")
            ) {
              return (
                <li key={uuidv4()}>
                  <Link href={link.link} className={featuredCatStyles.link}>
                    {link.title}
                  </Link>
                </li>
              );
            }
          })}
          <li key={"cart"} className={navbarStyles.menuHeader}></li>
          <SearchBar />
        </ul>
      </div>

      <div className={navbarStyles.imageWrapper}>
        {logo && logo.image && (
          <Link href="/">
            <Image
              width={!logo.width ? 350 : logo.width}
              height={!logo.height ? 100 : logo.height}
              src={logoMobile}
              alt={"mobile Precision Cruising Accessories Logo"}
            />
          </Link>
        )}

        {logo && logo.text && !logo.image && (
          <h1>
            <Link href="/">{logo.text}</Link>
          </h1>
        )}
      </div>
      <div className={navbarStyles.mobileContainer}>
        {" "}
        <button
          onClick={() => openSidebar()}
          className={navbarStyles.cartButton}
          style={{ display: "flex", width: "100%", gap: "1em" }}
        >
          <Cart />
          Cart ({quantity})
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
