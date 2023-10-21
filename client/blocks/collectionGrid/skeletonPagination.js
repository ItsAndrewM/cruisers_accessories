const SkeletonPagination = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "35px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "35px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5em",
        }}
      >
        <span
          style={{
            width: "30px",
            height: "40px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
        ></span>
        <span
          style={{
            width: "30px",
            height: "40px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
        ></span>
        <span
          style={{
            width: "30px",
            height: "40px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
        ></span>
        <span
          style={{
            width: "30px",
            height: "40px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
        ></span>
        <span
          style={{
            width: "30px",
            height: "40px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
        ></span>
      </div>
    </div>
  );
};

export default SkeletonPagination;
