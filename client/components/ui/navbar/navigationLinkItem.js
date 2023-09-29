import { useEffect, useState } from "react";
import featuredCatStyles from "../../featuredCat/featuredCat.module.css";
import SubLinkItem from "./subLinkItem";
import Link from "next/link";

const NavigationLinkItem = ({ link, index, setCurrent, current }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (current !== link.title && show === true) {
      setShow(false);
    }
  }, [current]);

  const handleHover = (e) => {
    e.preventDefault();
    setCurrent(e.currentTarget.getAttribute("data-key"));
    setShow(true);
  };

  return (
    <li
      key={index}
      onMouseEnter={handleHover}
      data-key={link.title}
      //   onMouseLeave={() => setShow(false)}
    >
      <Link
        href={link.link}
        className={featuredCatStyles.link}

        //   onMouseEnter={link.subLinks && handleHover}
      >
        {link.title}
      </Link>
      {!link.subLinks?.length ? (
        <></>
      ) : (
        <SubLinkItem link={link} setShow={setShow} show={show} />
      )}
    </li>
  );
};

export default NavigationLinkItem;
