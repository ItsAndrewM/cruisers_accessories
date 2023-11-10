if (!process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY) {
  throw new Error("Missing env varialbe BUILDER_PUBLIC_KEY");
}

export default {
  apiKey: process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY,
  productsModel: "swell-product",
  collectionsModel: "swell-collection",
  isDemo: false,
};
