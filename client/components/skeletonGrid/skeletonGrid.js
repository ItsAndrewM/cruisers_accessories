import SkeletonCards from "@/blocks/collectionGrid/skeletonCards";
import { Grid } from "theme-ui";

const SkeletonGrid = () => {
  return (
    <Grid gap={2} width={["40%", "40%", "24%"]}>
      <SkeletonCards />
    </Grid>
  );
};

export default SkeletonGrid;
