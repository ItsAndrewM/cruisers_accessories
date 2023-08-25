import "@/styles/globals.css";
import { builder, Builder } from "@builder.io/react";
import builderConfig from "../builder.config";
import "../blocks/productView/productView.builder";

builder.init(builderConfig.apiKey);
const Noop = ({ children }) => <>{children}</>;

// Builder.register("insertMenu", {
//   name: "Swell Category Components",
//   items: [
//     { name: "FeaturedCat" },
//     // { name: 'ProductGrid' }
//   ],
// });

Builder.register("insertMenu", {
  name: "Swell Products Components",
  items: [
    { name: "ProductView" },
    { name: "ProductBox" },
    // { name: 'ProductGrid' }
  ],
});

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
