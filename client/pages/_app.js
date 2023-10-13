import "@/styles/globals.css";
import { builder, Builder } from "@builder.io/react";
import builderConfig from "../builder.config";
import "../blocks/productView/productView.builder";
import "../blocks/productGrid/productGrid.builder";
import "../blocks/collectionView/collectionView.builder";
import "../blocks/collectionGrid/collectionGrid.builder";
import "../blocks/collectionViewHome/collectionViewHome.builder";
import "../blocks/productsViewHome/productsViewHome.builder";
import "../blocks/allProductsGrid/allProductsGrid.builder";
import dynamic from "next/dynamic";
import "../builder-registry";

builder.init(builderConfig.apiKey);

const Noop = ({ children }) => <>{children}</>;

Builder.register("insertMenu", {
  name: "Swell Category Components",
  items: [
    { name: "Featured Category Banner" },
    { name: "ProductGrid" },
    { name: "CollectionGrid" },
    { name: "CollectionView" },
    { name: "CollectionViewHome" },
    { name: "Bread Crumbs" },
    { name: "Category Sidebar" },
  ],
});

Builder.register("insertMenu", {
  name: "Swell Products Components",
  items: [
    { name: "ProductView" },
    { name: "ProductBox" },
    { name: "ProductGrid" },
    { name: "AllProductsGrid" },
    { name: "Bread Crumbs" },
    { name: "Cross Sell Grid" },
  ],
});

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
