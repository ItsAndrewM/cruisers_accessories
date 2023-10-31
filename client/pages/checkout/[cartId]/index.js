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

// export const getStaticPaths = async () => {
//   const result = await getCartPaths();
//   console.log(result);
//   const paths = !result ? [] : [result.checkoutId];
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.params.cartId,
    },
  };
};

const Page = ({ id }) => {
  const cart = useCart();
  const router = useRouter();
  const { theme } = useThemeUI();
  useEffect(() => {
    if (id) {
      router.push(`/checkout/${id}/shipping`);
    }
  }, [id]);

  return (
    <>
      <BuilderComponent
        key={router.query.cartId}
        // model={builderModel}
        data={{ theme }}
      />
      something went wrong
    </>
  );
};
Page.Layout = Layout;

export default Page;
