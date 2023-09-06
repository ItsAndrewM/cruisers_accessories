import { Input } from "@builder.io/sdk";
import dynamic from "next/dynamic";
import { productGridSchema } from "../productGrid/productGrid.builder";
import { restrictedRegister } from "blocks/utils";
const LazyCollectionView = dynamic(() => import(`./productsViewHome`));

const collectionBoxSchema = [
  {
    name: "productGridOptions",
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
  LazyCollectionView,
  {
    name: "CollectionBox",
    description: "Pick a collection to display its details",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/collage.svg",
    inputs: collectionBoxSchema
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
  LazyCollectionView,
  {
    name: "AllProductsView",
    description:
      "Dynamic collection detaills, autobinds to the collection in context, use only on collection pages",
    inputs: collectionBoxSchema,
    defaults: {
      bindings: {
        "component.options.collection": "state.collection",
        "component.options.renderSeo": "true",
      },
    },
  },
  ["all-products", "theme"]
);
