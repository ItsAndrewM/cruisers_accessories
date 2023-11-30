import { getLayoutProps } from "@/lib/get-layout-props";

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await getLayoutProps()),
    },
  };
}

const Page = () => {
  return <div style={{ display: "flex", flexWrap: "nowrap" }}></div>;
};

Page.Layout = Layout;

export default Page;
