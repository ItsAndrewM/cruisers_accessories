import Layout from "@/components/layout/layout";
import swell from "swell-js";
import swellConfig from "@/swell.config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const getStaticProps = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  return {
    props: {
      name: "test",
    },
  };
};

const Page = ({ name }) => {
  return <div>{name}</div>;
};

Page.Layout = Layout;

export default Page;
