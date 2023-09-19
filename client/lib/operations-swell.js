import swell from "swell-js";
import swellConfig from "../swell.config";

// export interface BuillderConfig {
//     apiKey: string
//     productsModel: string
//     collectionsModel: string
//     isDemo?: boolean
// }

export const getCategoryByBoat = async (boatModel, boatMake) => {
  const data = await fetch(
    `http://localhost:3000/api/boat-categories?boat_model=${boatModel}&boat_make=${boatMake}}`
  );
  const jsonData = await data.json();
  const categories = jsonData.data.results.map((product) => {
    return product.category_index;
  });
  const allCategories = [];
  for (const category of categories) {
    for (const id of category.id) {
      console.log(id);
      const categoryName = await swell.categories.get(id);
      allCategories.push(categoryName);
    }
  }
  const formatted = {
    count: Number(allCategories.length),
    page_count: Math.ceil(allCategories.length / 24),
    page: 1,
    results: allCategories,
  };
  return formatted;
};

export const getFilteredProducts = async (query) => {
  // swell.init(swellConfig.storeId, swellConfig.publicKey);
  // const products = await swell.products.list({ limit: 24 });
  // return products;

  const products = await fetch(
    // `https://cruiser-accessories.vercel.app/api/products?${query}`
    `http://localhost:3000/api/products?${query}`
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
    limit: 100,
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

export const getCollection = async (config, options, pageNum) => {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error("Either a handle or id is required");
  }

  const query = options.id || options.handle;
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const category = await swell.categories.get(query, {});
  const categoryParent = category.parent_id
    ? await swell.categories.get(category.parent_id, {})
    : null;

  const result = await swell.products.list({
    categories: query,
    limit: 24,
    page: !pageNum ? 1 : pageNum,
  });

  const products = result?.results ? normalizeProducts(result?.results) : [];

  const count = result?.count ? result.count : 0;
  const page_count = result?.page_count ? result.page_count : 0;
  const page = result?.page ? result.page : 0;
  const children = category?.children?.results
    ? normalizeProducts(category?.children?.results)
    : [];
  const hasNextPage = category?.products?.page_count > 1 ? true : false;
  const nextPageCursor = null;
  return {
    ...category,
    children,
    products,
    nextPageCursor,
    hasNextPage,
    count,
    page_count,
    page,
    categoryParent,
  };
};
