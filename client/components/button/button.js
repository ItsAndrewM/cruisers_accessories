
import Link from "next/link";
import styles from "./button.module.css"


// Any component in your codebase

const Button = ({ content, link }) => {
    return (
        <span>
            <Link href={link ? link : "/"} className={styles.link}>{content}</Link>
        </span>
    );
}

export default Button;
// Register this component for use in the Visual Editor

