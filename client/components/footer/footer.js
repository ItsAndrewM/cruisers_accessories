import Image from "next/image";
import styles from "./footer.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import layoutStyles from "../layout/layout.module.css"
import logo from "../../public/images/logos/logo_text_right.png";
import { footerData } from "@/data/footerData";

const Footer = ({ image, imageLink }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Link href={imageLink}>
              <Image
                src={logo}
                height={250}
                className={utilStyles.borderCircle}
                alt={""}
              />
            </Link>
          </div>
          <div className={styles.container}>
            {footerData.map((menuItem, index) => {
              return (
                <ul className={styles.column} key={index}>
                  <li><h3><Link href={menuItem.link} className={layoutStyles.link}>{menuItem.name}</Link></h3></li>
                  <ul>
                    {menuItem.submenu.map((subMenuItem, index) => {
                      return (
                        <li key={index}>{subMenuItem.icon && subMenuItem.icon}<Link className={layoutStyles.link} href={subMenuItem.link}>{subMenuItem.name}</Link></li>
                      )
                    })}
                  </ul>
                </ul>
              )
            })}
          </div>
        </div>
        <div className={styles.container}>
          <div><p>© McMillan Farms 2023 • Site by MuffinWare</p></div>
          <div className={styles.legal}>
            <span><Link className={layoutStyles.link} href={"/legal/privacy-policy"}>Privacy Policy</Link></span>
            <span>|</span>
            <span><Link className={layoutStyles.link} href={"/legal/terms-and-conditions"}>Terms and Conditions</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
