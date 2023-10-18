import SkeletonFilter from "@/components/attributesFilter/skeletonFilter";
import SkeletonCategory from "@/components/categorySidebar/skeletonCategory";
import SkeletonGrid from "@/components/skeletonGrid/skeletonGrid";
import accordianStyles from "@/components/accordion/accordion.module.css";
import styles from "@/blocks/allProductsGrid/allProductsGrid.module.css";
import FilterBar from "@/components/filterBar/filterBar";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";

const Loading = () => {
  return (
    <>
      <BreadCrumbs />
      <div className={styles.container}>
        <div className={styles.desktop}>
          <SkeletonCategory />
          <SkeletonFilter />
        </div>
        <div className={styles.mobile}>
          <details className={`${accordianStyles.accordian}`}>
            <summary>Filters</summary>
          </details>
          <div className={accordianStyles.content}>
            <details className={`${accordianStyles.accordian}`}>
              <summary>Categories</summary>
            </details>
            <div className={accordianStyles.content}>
              <SkeletonCategory />
            </div>
            <details className={`${accordianStyles.accordian}`}>
              <summary>Filters</summary>
            </details>
            <div className={accordianStyles.content}>
              <SkeletonFilter />
            </div>
          </div>
        </div>
        <div className={styles.wrapper} style={{ padding: "2em 0" }}>
          <div>
            <FilterBar />
            <SkeletonGrid />;
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
