import ArrowLeft from "@/components/icons/arrowLeft";
import navbarStyles from "../navbar/navbar.module.css";
import Link from "next/link";
import RightArrow from "@/components/icons/rightArrow";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";

const SubLinksNav = ({ sublinks, link, title }) => {
  return (
    <>
      <button className={navbarStyles.expand}>
        <ArrowLeft />
      </button>
      <ul className={navbarStyles.subLinksMenu}>
        <li>
          <button className={navbarStyles.backButton}>
            <h3>Back</h3>

            <RightArrow />
          </button>
        </li>
        <li key={link} style={{ width: " 100%" }}>
          <h4 style={{ width: " 100%" }}>
            <Link href={link} className={featuredCatStyles.link}>
              {title}
            </Link>
          </h4>
        </li>
        {sublinks.map((subLink) => {
          return (
            <li key={subLink.link}>
              <Link href={subLink.link} className={featuredCatStyles.link}>
                {subLink.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SubLinksNav;
