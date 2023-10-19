import styles from "@/blocks/collectionView/collectionView.module.css";
import CollectionViewLoading from "@/blocks/collectionView/loading";
import SkeletonGrid from "@/blocks/collectionView/skeletonGrid";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";
const Loading = () => {
  return (
    <>
      <BreadCrumbs />
      <div className={styles.wrapper}>
        <CollectionViewLoading />
        <div className={styles.padding5}>
          <SkeletonGrid />
        </div>
      </div>
    </>
  );
};

export default Loading;
