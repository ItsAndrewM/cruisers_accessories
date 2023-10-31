import Link from "next/link";
import { useUI } from "../context";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import styles from "./footer.module.css";
import Image from "next/image";
import utilStyles from "../../../styles/utils.module.css";
import logoWhite from "@/assets/images/logo/logo_white.png";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const { footerLinks, logo } = useUI();
  return !router.pathname.includes("checkout") ? (
    <footer className={styles.footer}>
      <div className={styles.logoWrapper}>
        {logo && logo.image && (
          <Link href="/">
            <Image
              width={!logo.width ? 200 : logo.width}
              height={!logo.height ? 200 : logo.height}
              src={logoWhite}
              alt={logo.text}
            />
          </Link>
        )}
        {logo && logo.text && !logo.image && (
          <h1>
            <Link href="/" className={featuredCatStyles.link}>
              {logo.text}
            </Link>
          </h1>
        )}
      </div>
      <ul>
        {footerLinks?.map((link, index) => (
          <li key={link.title}>
            <h3>
              <Link
                href={link.link}
                className={`${styles.link} ${utilStyles.capitalize}`}
              >
                {link.title}
              </Link>
            </h3>
            {!link.subLinks?.length ? (
              <></>
            ) : (
              <ul>
                {link.subLinks?.map((subLink, index) => {
                  return (
                    <li key={subLink.title}>
                      <Link
                        href={subLink.link}
                        className={`${styles.link} ${utilStyles.capitalize}`}
                      >
                        {subLink.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
