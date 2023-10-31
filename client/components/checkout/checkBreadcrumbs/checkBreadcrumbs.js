import Link from "next/link";

import styles from "../checkout.module.css";

const CheckBreadcrumbs = ({ id }) => {
  return (
    <div className={styles.breadCrumbs}>
      <div>
        <ul>
          <li>
            <Link href={`/checkout/${id}/shipping`}>Customer information</Link>
          </li>
          <li>
            <span className={`${styles.right} ${styles.chevron}`}></span>
          </li>
          <li>
            <Link href={`/checkout/${id}/shipping-method`}>
              Shipping Method
            </Link>
          </li>
          <li>
            <span className={`${styles.right} ${styles.chevron}`}></span>
          </li>
          <li>
            <Link href={`/checkout/${id}/payment`}>Payment Method</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckBreadcrumbs;
