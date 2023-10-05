import { Card } from "theme-ui";

const SkeletonCollectionCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        maxHeight: 350,
        minHeight: 350,
        minWidth: 350,
        mb: 2,
        alignItems: "center",
        justifyContent: "center",
        gap: ".5em",
      }}
    >
      <div
        style={{
          width: "318px",
          height: "318px",
          backgroundColor: "lightGrey",
        }}
      ></div>
      <span
        style={{
          width: "100px",
          height: "25px",
          backgroundColor: "lightGrey",
          borderRadius: "25px",
        }}
      ></span>
    </Card>
  );
};

export default SkeletonCollectionCard;
