import Link from "next/link";
import { useUI } from "../context";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import styles from "./footer.module.css";
import Image from "next/image";
import utilStyles from "../../../styles/utils.module.css";

const Footer = () => {
  const { footerLinks, logo } = useUI();
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrapper}>
        {logo && logo.image && (
          <Link href="/">
            <Image
              width={logo.width}
              height={logo.height}
              src={logo.image}
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
                className={`${featuredCatStyles.link} ${utilStyles.capitalize}`}
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
                        className={`${featuredCatStyles.link} ${utilStyles.capitalize}`}
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
  );
};

export default Footer;
