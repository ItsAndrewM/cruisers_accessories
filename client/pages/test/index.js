import { useRouter } from "next/router";
import FeaturedCat from "../../components/featuredCat/featuredCat";
import Layout from "../../components/layout/layout";
import SearchBar from "../../components/searchBar/searchBar";
import { BuilderComponent } from "@builder.io/react";
import { Suspense, useEffect, useState } from "react";
import { useThemeUI } from "theme-ui";
import styles from "../../styles/test.module.css";
import {
  getAllAttributes,
  getAllProductPages,
  getFilteredProducts,
  getPaginatedItems,
  getPaginatedProducts,
} from "@/lib/operations-swell";
import Loading from "./loading";
import usePagination from "@/hooks/usePagination";
import AttributesFilter from "@/components/attributesFilter/attributesFilter";
import { ProductGrid } from "@/blocks/productGrid/productGrid";
import { AllProductsGrid } from "@/blocks/allProductsGrid/allProductsGrid";

// export async function getServerSideProps(context) {
//   const query = context.req?.url.split("?")[1];
//   const paginatedProducts = await getPaginatedItems(
//     context.query.page || 1,
//     "products"
//   );
//   const pages = await getAllProductPages();
//   const paginated = await usePagination(
//     Number(context.query?.page || 1),
//     "products"
//   );
//   const attributes = await getAllAttributes();
//   if (query) {
//     const test = await getFilteredProducts(query);
//     const data = await test.json();
//     return {
//       props: {
//         data: paginatedProducts,
//         pages: pages,
//         paginated: paginated,
//         attributes: attributes,
//         filtered: data.data,
//       },
//     };
//   } else {
//     return {
//       props: {
//         data: paginatedProducts,
//         pages: pages,
//         paginated: paginated,
//         attributes: attributes,
//       },
//     };
//   }
// }

const Page = () => {
  // const Page = ({ data, pages, paginated, attributes, filtered }) => {
  const router = useRouter();

  return (
    // <div className={styles.wrapper}>
    //   <div className={styles.paginate}>
    //     <ul className={styles.container}>
    //       {paginated.map((pageNum) => {
    //         if (typeof pageNum === "string") {
    //           return (
    //             <li key={pageNum}>
    //               <span>{pageNum}</span>
    //             </li>
    //           );
    //         } else {
    //           return (
    //             <li key={pageNum}>
    //               {Number(pageNum) === 1 ? (
    //                 <button
    //                   onClick={() => {
    //                     router.push({ pathname: "/test" });
    //                   }}
    //                 >
    //                   {pageNum}
    //                 </button>
    //               ) : (
    //                 <button
    //                   onClick={() => {
    //                     router.push({ query: { page: Number(pageNum) } });
    //                   }}
    //                 >
    //                   {pageNum}
    //                 </button>
    //               )}
    //             </li>
    //           );
    //         }
    //       })}
    //     </ul>
    //   </div>
    //   <div>
    //     <Suspense fallback={<Loading />}>
    //       <ul className={styles.list}>
    //         {data.map((product) => {
    //           return (
    //             <li key={product.id}>
    //               <h1>{product.name}</h1>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </Suspense>
    //   </div>
    <div className={styles.wrapper}>
      <div className={styles.box}>
        {/* <AttributesFilter attributes={attributes} /> */}
        {/* {!filtered ? (
          <></>
        ) : (
          <div className={styles.results}>
            <ul className={styles.list}>
              {filtered.results?.map((result) => {
                return (
                  <li key={result.id}>
                    <h1>{result.name}</h1>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}
        <AllProductsGrid />
      </div>
    </div>
  );
};

Page.Layout = Layout;

export default Page;
