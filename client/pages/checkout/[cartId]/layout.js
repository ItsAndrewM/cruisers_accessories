import styles from "@/styles/checkout.module.css";
import Image from "next/image";
import logo from "@/assets/images/logo/logo_256x235.webp";
import CheckBreadcrumbs from "@/components/checkout/checkBreadcrumbs/checkBreadcrumbs";
import { useRouter } from "next/router";
const Layout = ({ children, id }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <Image
            src={logo}
            height={235}
            width={256}
            priority
            alt="Precision Cruising Accessories Logo"
          />
          {!router.asPath.includes("order") && <CheckBreadcrumbs id={id} />}
        </div>
        <div className={styles.imgWrapper}></div>
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
