import Layout from "@/components/layout/layout";
import swell from "swell-js";
import swellConfig from "@/swell.config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BuilderComponent } from "@builder.io/react";
import { useThemeUI } from "theme-ui";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";

// https://github.com/swellstores/swell-js/blob/master/stripe_klarna_ideal.md
// https://dev.to/husnain/how-to-integrate-paypal-with-nextjs-2oil
//https://github.com/orgs/swellstores/discussions/6#discussioncomment-4247612

//guide for setting up custom payment gateway for swell (includes refund flow)
//https://github.com/orgs/swellstores/discussions/255#discussioncomment-5960624

export const getStaticProps = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  return {
    props: {
      name: "test",
    },
  };
};

const Page = ({ name }) => {
  const theme = useThemeUI();
  const cart = useCart();

  return (
    <>
      <BuilderComponent
        key={name}
        // model={builderModel}
        data={{ theme }}
      />
      {!cart ? (
        <></>
      ) : (
        <Link href={`/checkout/${cart.checkout_id}`}>{cart.checkout_id}</Link>
      )}
      {name}
    </>
  );
};

Page.Layout = Layout;

export default Page;
