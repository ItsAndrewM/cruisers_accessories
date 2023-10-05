import ArrowLeft from "@/components/icons/arrowLeft";
import navbarStyles from "../navbar/navbar.module.css";
import Link from "next/link";
import RightArrow from "@/components/icons/rightArrow";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import { useState } from "react";

const SubLinksNav = ({ sublinks, link, title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <button className={navbarStyles.expand} onClick={handleOpen}>
        <ArrowLeft />
      </button>
      <ul
        className={navbarStyles.subLinksMenu}
        style={
          open ? { transform: "none" } : { transform: "translate(-100%, 0)" }
        }
      >
        <li>
          <button
            className={navbarStyles.backButton}
            onClick={() => setOpen(false)}
          >
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
