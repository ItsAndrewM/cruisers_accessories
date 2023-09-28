import dynamic from "next/dynamic";
import { builder, Builder } from "@builder.io/react";
import builderConfig from "./builder.config";

builder.init(builderConfig.apiKey);

Builder.registerComponent(
  dynamic(() => import("./components/categorySidebar/categorySidebar")),
  {
    name: "Category Sidebar",
    description:
      "Sidebar menu that has dropdowns to show all product categories sorted into parent categories",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/list.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/breadCrumbs/breadcrumbs")),
  {
    name: "Bread Crumbs",
    description:
      "Dynamically adds the url as a breadcrumb path. Will also highlight current active path",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/list-tree.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/button/button")),
  {
    name: "Button",
    inputs: [
      // 'name' is the name of your prop
      { name: "content", type: "text" },
      { name: "link", type: "url" },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/accordion/accordion")),
  {
    name: "Accordion",
    description:
      "Accordion component.  Add a title then add tabs with a Tag/Headline and content.",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/board.svg",

    inputs: [
      {
        name: "tabs",
        type: "list",
        subFields: [
          { name: "text", type: "text" },
          { name: "content", type: "text" },
        ],
      },
      { name: "title", type: "text" },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/catCarousel/catCarousel")),
  {
    name: "Category Carousel",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/carousel.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/featuredCat/featuredCat")),
  {
    name: "Featured Category Banner",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/more-r.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/searchByBoat/searchByBoat")),
  {
    name: "Search By Boat Banner",
    description: "Drop down list for boat models, makes and categories.",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/browse.svg",
  }
);

Builder.register("insertMenu", {
  name: "UI Components",
  items: [
    { name: "Search By Boat Banner" },
    { name: "Accordion" },
    { name: "Featured Category Banner" },
    { name: "Category Carousel" },
  ],
});
