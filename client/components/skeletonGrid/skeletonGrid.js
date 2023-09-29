import SkeletonCards from "@/blocks/collectionGrid/skeletonCards";
import { Grid } from "theme-ui";

const SkeletonGrid = () => {
  return (
    <Grid gap={2} width={["100%", "40%", "24%"]}>
      <SkeletonCards />
    </Grid>
  );
};

export default SkeletonGrid;
