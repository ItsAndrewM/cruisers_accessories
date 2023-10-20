import { Grid } from "theme-ui";
import styles from "../allProductsGrid/allProductsGrid.module.css";
import SkeletonCards from "./skeletonCards";
import SkeletonPagination from "./skeletonPagination";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Grid gap={2} width={["40%", "40%", "24%"]}>
          <SkeletonCards />
        </Grid>
        <SkeletonPagination />
      </div>
    </div>
  );
};

export default Loading;
