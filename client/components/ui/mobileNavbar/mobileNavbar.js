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

const MobileNavbar = () => {
  const { navigationLinks, logo } = useUI();
  const cart = useCart();
  const items = cart?.items ?? [];
  return (
    <nav className={navbarStyles.navigation}>
      <div id={navbarStyles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id={navbarStyles.menu}>
          <h4>Categories</h4>
          {navigationLinks?.map((link) => {
            if (
              !link.link.includes("/about-us") &&
              !link.link.includes("/contact-us")
            ) {
              return (
                <li key={link.title}>
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
                <li key={link.title}>
                  <Link href={link.link} className={featuredCatStyles.link}>
                    {link.title}
                  </Link>
                </li>
              );
            }
          })}
          <li
            key={"cart"}
            style={{
              display: "flex",
              width: "100%",
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
            }}
          >
            <Link
              href={"/cart"}
              style={{ display: "flex", width: "100%", gap: "1em" }}
            >
              <Cart />
              Cart ({items.length})
            </Link>
          </li>
          <SearchBar />
        </ul>
      </div>
      <h1>
        {logo && logo.image && (
          <Link href="/">
            <Image
              layout="fixed"
              width={logo.width}
              height={logo.height}
              src={logo.image}
              alt={logo.text}
            />
          </Link>
        )}
        {logo && logo.text && !logo.image && <Link href="/">{logo.text}</Link>}
      </h1>
    </nav>
  );
};

export default MobileNavbar;
