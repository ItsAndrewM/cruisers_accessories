import { Input } from "@builder.io/sdk";
import dynamic from "next/dynamic";
import { productGridSchema } from "../productGrid/productGrid.builder";
import { restrictedRegister } from "blocks/utils";
const LazyAllProductsView = dynamic(() => import(`./productsViewHome`));

const allProductsBoxSchema = [
  {
    name: "allProductsGridOptions",
    type: "object",
    subFields: productGridSchema,
    defaultValue: {
      cardProps: {
        imgPriority: true,
        imgLayout: "responsive",
        imgLoading: "eager",
        imgWidth: 540,
        imgHeight: 540,
        layout: "fixed",
      },
    },
  },
  {
    type: "boolean",
    name: "renderSeo",
    advanced: true,
    helperText:
      "toggle to render seo info on page, only use for collection pages",
  },
];

restrictedRegister(
  LazyAllProductsView,
  {
    name: "CollectionBox",
    description: "Pick a collection to display its details",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/collage.svg",
    inputs: allProductsBoxSchema
      .concat([
        {
          name: "collection",
          type: "SwellCategoryHandle",
        },
      ])
      .reverse(),
  },
  ["page", "product-page", "theme"]
);

restrictedRegister(
  LazyAllProductsView,
  {
    name: "AllProductsView",
    description: "Dynamic all products",
    inputs: allProductsBoxSchema,
    defaults: {
      bindings: {
        "component.options.collection": "state.collection",
        "component.options.renderSeo": "true",
      },
    },
  },
  ["all-products", "theme"]
);
