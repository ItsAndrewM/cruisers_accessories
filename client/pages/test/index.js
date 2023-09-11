import { useRouter } from "next/router";
import FeaturedCat from "../../components/featuredCat/featuredCat";
import Layout from "../../components/layout/layout";
import SearchBar from "../../components/searchBar/searchBar";
import { BuilderComponent } from "@builder.io/react";
import { Suspense, useEffect, useState } from "react";
import { useThemeUI } from "theme-ui";
import styles from "../../styles/test.module.css";
import {
  getAllProductPages,
  getPaginatedItems,
  getPaginatedProducts,
} from "@/lib/operations-swell";
import Loading from "./loading";
import usePagination from "@/hooks/usePagination";

export async function getServerSideProps(context) {
  const paginatedProducts = await getPaginatedItems(
    context.query.page || 1,
    "products"
  );
  const pages = await getAllProductPages();

  return {
    props: {
      data: paginatedProducts,
      pages: pages,
    },
  };
}

const Page = ({ data, pages }) => {
  const router = useRouter();
  const paginated = usePagination(Number(context.query?.page || 1), "products");

  return (
    <div>
      <div className={styles.paginate}>
        <ul className={styles.container}>
          {paginated.map((pageNum) => {
            if (typeof pageNum === "string") {
              return (
                <li key={pageNum}>
                  <span>{pageNum}</span>
                </li>
              );
            } else {
              return (
                <li key={pageNum}>
                  {Number(pageNum) === 1 ? (
                    <button
                      onClick={() => {
                        router.push({ pathname: "/test" });
                      }}
                    >
                      {pageNum}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        router.push({ query: { page: Number(pageNum) } });
                      }}
                    >
                      {pageNum}
                    </button>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <ul className={styles.list}>
            {data.map((product) => {
              return (
                <li key={product.id}>
                  <h1>{product.name}</h1>
                </li>
              );
            })}
          </ul>
        </Suspense>
      </div>
    </div>
  );
};

Page.Layout = Layout;

export default Page;
