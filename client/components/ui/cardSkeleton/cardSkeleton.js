import { Card, Grid } from "theme-ui";
import styles from "../../../blocks/allProductsGrid/allProductsGrid.module.css";

const CardSkeleton = () => {
  const arr = new Array(24);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Grid gap={2} width={["100%", "40%", "24%"]}>
          {arr.map((item, index) => {
            return (
              <Card
                sx={{
                  maxWidth: [700, imgWidth || 540],
                  width: [700, imgWidth || 540],
                  height: [700, imgWidth || 540],
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: [700, imgHeight || 540],
                  minHeight: [700, imgHeight || 540],
                  minWidth: [700, imgWidth || 540],
                  mb: 2,
                  backgroundColor: "grey",
                }}
                key={index}
              ></Card>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default CardSkeleton;
