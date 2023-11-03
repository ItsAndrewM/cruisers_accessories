import { useCart } from "@/lib/hooks/useCart";
import { getCartPaths } from "@/lib/operations-swell";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import { BuilderComponent } from "@builder.io/react";
import { useThemeUI } from "theme-ui";
import { useEffect } from "react";
import { getLayoutProps } from "@/lib/get-layout-props";

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.params.cartId,
      ...(await getLayoutProps()),
    },
  };
};

const Page = ({ id }) => {
  const router = useRouter();
  const cart = useCart();
  useEffect(() => {
    if (id && cart) {
      router.push(`/checkout/${id}/shipping`);
    } else {
      alert(
        "Something went wrong. Try adding a product to your cart and try again. You will be redirected shortly."
      );
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [id]);

  return <>something went wrong</>;
};
Page.Layout = Layout;

export default Page;
