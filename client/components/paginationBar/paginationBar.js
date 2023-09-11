import { useRouter } from "next/router";
import styles from "./paginationBar.module.css";
import featuredCatStyles from "../featuredCat/featuredCat.module.css";
import { useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";

export const dotts = "...";

const PaginationBar = (params) => {
  const [pages, setPages] = useState([1]);
  const router = useRouter();
  try {
    usePagination(
      Number(router.query?.page || router.pathname),
      params?.query
    ).then((data) => {
      setPages(data);
    });
  } catch (error) {
    console.log(error);
  }

  // useEffect(() => {
  //   const fetchPaginated = async () => {
  //     const paginated = await usePagination(
  //       Number(router.query?.page || 1),
  //       query
  //     );
  //     setPages(paginated);
  //   };
  //   fetchPaginated();
  // }, [router.query]);

  return pages.length > 1 ? (
    // (
    <div className={styles.wrapper}>
      <ul className={styles.container}>
        {pages.map((pageNum) => {
          return (
            <li key={pageNum}>
              {Number(pageNum) === 1 ? (
                <button
                  onClick={() => {
                    router.push({ pathname: router.pathname });
                  }}
                  className={featuredCatStyles.link}
                >
                  {pageNum}
                </button>
              ) : (
                <button
                  onClick={() => {
                    router.push({ query: { page: Number(pageNum) } });
                  }}
                  className={`${featuredCatStyles.link} ${
                    Number(router.query.page) === Number(pageNum)
                      ? styles.active
                      : ""
                  }`}
                >
                  {pageNum}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default PaginationBar;
