import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";
import { Input } from "@builder.io/sdk";
const LazyProductGrid = dynamic(async () => {
  return (await import("./allProductsGrid")).CollectionGrid;
});
const isDemo = Boolean(process.env.IS_DEMO);

const collectionCardFields = [
  {
    name: "imgWidth",
    type: "number",
    defaultValue: 540,
  },
  {
    name: "imgHeight",
    type: "number",
    defaultValue: 540,
  },
  {
    name: "imgPriority",
    type: "boolean",
    advanced: true,
    defaultValue: true,
  },
  {
    name: "imgLoading",
    type: "enum",
    advanced: true,
    defaultValue: "lazy",
    enum: ["eager", "lazy"],
  },
  {
    name: "imgLayout",
    type: "enum",
    enum: ["fixed", "intrinsic", "responsive", "fill"],
    advanced: true,
    defaultValue: "fill",
  },
];

export const collectionGridSchema = [
  {
    name: "cardProps",
    defaultValue: {
      imgPriority: true,
      imgLayout: "responsive",
      imgLoading: "eager",
      imgWidth: 540,
      imgHeight: 540,
      layout: "fixed",
    },
    type: "object",
    subFields: collectionCardFields,
  },
  {
    name: "offset",
    type: "number",
    defaultValue: 0,
  },
  {
    name: "limit",
    type: "number",
    defaultValue: 9,
  },
];

Builder.registerComponent(LazyProductGrid, {
  name: "CollectionGrid",
  image: "https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-add.svg",
  description: "Pick categories free form",
  inputs: [
    {
      name: "collectionsList",
      type: "list",
      subFields: [
        {
          name: "product",
          type: `SwellProductHandle`,
        },
      ],
    },
  ].concat(collectionGridSchema),
});

Builder.registerComponent(LazyProductGrid, {
  name: "CollectionGrid",
  image: "https://unpkg.com/css.gg@2.0.0/icons/svg/display-grid.svg",
  description: "A grid showing all categories",
  inputs: [
    {
      name: "collection",
      type: `SwellCategoryHandle`,
    },
  ].concat(collectionGridSchema),
});
