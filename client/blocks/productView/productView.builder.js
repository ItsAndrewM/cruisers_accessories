import { restrictedRegister } from "../utils";
import dynamic from "next/dynamic";

const isDemo = Boolean(false);
const LazyProductView = dynamic(() => import(`./productView`), { ssr: true });

restrictedRegister(
  LazyProductView,
  {
    name: "ProductView",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg",
    description:
      "Product details, should only be used in product page template, dynamically bind to product in context.",
    defaults: {
      bindings: {
        "component.options.product": "state.product",
        "component.options.title": "state.product.title",
        "component.options.description": "state.product.descriptionHtml",
      },
    },
  },
  ["product-page", "theme"]
);

restrictedRegister(
  LazyProductView,
  {
    name: "ProductBox",
    inputs: [
      {
        name: "product",
        type: `SwellProductHandle`,
      },
      {
        name: "description",
        richText: true,
        type: "html",
        helperText: "Override product description from swell",
      },
      {
        name: "title",
        type: "text",
        helperText: "Override product title from swell",
      },
    ],
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg",
    description: "Choose a product to show its details on page",
  },
  ["page", "collection-page", "theme"]
);
