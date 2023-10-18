import ProductLoading from "@/blocks/productView/loading";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";

const Loading = () => {
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <BreadCrumbs />
      </div>
      <ProductLoading />
    </>
  );
};

export default Loading;
