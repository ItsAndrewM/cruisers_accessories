import dynamic from "next/dynamic";
import { builder, Builder } from "@builder.io/react";
import builderConfig from "./builder.config";

builder.init(builderConfig.apiKey);

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
    name: "CatCarousel",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/carousel.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/featuredCat/featuredCat")),
  {
    name: "FeaturedCat",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/more-r.svg",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/searchByBoat/searchByBoat")),
  {
    name: "SearchByBoat",
    description: "Drop down list for boat models, makes and categories.",
    image: "https://unpkg.com/css.gg@2.0.0/icons/svg/browse.svg",
  }
);

Builder.register("insertMenu", {
  name: "UI Components",
  items: [
    { name: "SearchByBoat" },
    { name: "Accordion" },
    { name: "FeaturedCat" },
    { name: "CatCarousel" },
  ],
});
