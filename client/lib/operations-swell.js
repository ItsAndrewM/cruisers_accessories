import swell from "swell-js";
import swellConfig from "../swell.config";

// export interface BuillderConfig {
//     apiKey: string
//     productsModel: string
//     collectionsModel: string
//     isDemo?: boolean
// }

export const getFilteredProducts = async (query) => {
  // swell.init(swellConfig.storeId, swellConfig.publicKey);
  // const products = await swell.products.list({ limit: 24 });
  // return products;

  const products = await fetch(
    `https://cruiser-accessories.vercel.app/api/products?${query}`
  );
  return products;
};

export const getAllAttributes = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const attributes = await swell.attributes.list({
    limit: 100,
  });
  return attributes?.results ? attributes.results : [];
};

const normalizeProduct = (product) => {
  const variants = product.variants?.results ?? [];
  const images =
    product.images?.map((image) => ({ ...image, src: image.file.url })) ?? [];
  return { ...product, variants, images };
};

const normalizeProducts = (productResults) => {
  return productResults.map((product) => {
    return normalizeProduct(product);
  });
};

export const searchProducts = async (searchString, limit = 100, offset = 0) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const products = await swell.products.list({
    search: searchString,
    limit,
  });
  return products?.results ? normalizeProducts(products?.results) : [];
};

export const getAllProducts = async (
  builderConfig,
  limit = 24,
  offset = 0
  // TODO: add in these params
) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const productResults = await swell.products.list({
    limit: limit,
    page: offset,
  });
  return productResults ? normalizeProducts(productResults?.results) : [];
};

export const getAllProductPaths = async () => {
  const products = await getAllProducts();
  return products?.map((entry) => entry.slug) || [];
};

export const getAllProductPages = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const products = await swell.products.list({ limit: 24 });
  return Object.keys(products.pages);
};

export const getPageCount = async (query) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  if (query === "products") {
    const products = await swell.products.list({ limit: 24 });
    return { count: products.count, page_count: products.page_count };
  } else {
    const categories = await swell.categories.list({ limit: 24 });
    return { count: categories.count, page_count: categories.page_count };
  }
};

export const getPaginatedItems = async (pageNum, query) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  if (query === "products") {
    const products = await swell.products.list({ limit: 24, page: pageNum });
    return products ? normalizeProducts(products?.results) : [];
  } else {
    const categories = await swell.categories.list({
      limit: 24,
      page: pageNum,
    });
    return categories ? normalizeProducts(categories?.results) : [];
  }
};

export const getPaginatedProducts = async (pageNum) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const products = await swell.products.list({
    limit: 24,
    page: Number(pageNum),
  });
  return products ? normalizeProducts(products?.results) : [];
};

export const getProduct = async (options) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  if (Boolean(options.id) === Boolean(options.slug)) {
    throw new Error("Either a slug or id is required");
  }

  const result = await swell.products.get(options.id || options.slug, {
    expand: ["variants"],
  });
  return result ? normalizeProduct(result) : null;
};

// TODO: add in collection functions

export const getAllCollections = async (config, limit = 20, offset = 0) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    // limit
  });
  return categories?.results;
};

export const getPaginatedCategories = async (pageNum) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 24,
    page: Number(pageNum),
  });
  return categories?.results;
};

export const getAllCategoryPages = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({ limit: 24 });
  return Object.keys(categories.pages);
};

export const getAllCollectionPaths = async (config, limit) => {
  const collections = await getAllCollections(config, limit);
  return collections?.map((entry) => entry.slug) || [];
};

export const getCollection = async (config, options) => {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error("Either a handle or id is required");
  }

  const query = options.id || options.handle;
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const category = await swell.categories.get(query, { expand: ["products"] });
  const products = category?.products?.results
    ? normalizeProducts(category?.products?.results)
    : [];
  // const { page, count } = products;
  // TODO: add pagination logic
  const hasNextPage = false;
  const nextPageCursor = null;

  return {
    ...category,
    products,
    nextPageCursor,
    hasNextPage,
  };
};
