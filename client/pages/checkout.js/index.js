import Layout from "@/components/layout/layout";
import swell from "swell-js";
import swellConfig from "@/swell.config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// https://github.com/swellstores/swell-js/blob/master/stripe_klarna_ideal.md
// https://dev.to/husnain/how-to-integrate-paypal-with-nextjs-2oil
//https://github.com/orgs/swellstores/discussions/6#discussioncomment-4247612

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
