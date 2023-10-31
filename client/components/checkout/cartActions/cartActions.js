import styles from "../checkout.module.css";
import Link from "next/link";

const CartActions = ({ buttonText, linkText, link }) => {
  return (
    <div className={styles.cartActions}>
      <div>
        <div>
          <Link href={link}>
            <span className={`${styles.left} ${styles.chevron}`}></span>
            {linkText}
          </Link>
        </div>
        <div>{buttonText && <button type="submit">{buttonText}</button>}</div>
      </div>
    </div>
  );
};

export default CartActions;
