import swell from "swell-js";
import swellConfig from "../swell.config";
import { useCart } from "./hooks/useCart";

// export interface BuillderConfig {
//     apiKey: string
//     productsModel: string
//     collectionsModel: string
//     isDemo?: boolean
// }

export const getProductWithCategory = async (options) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  if (Boolean(options.id) === Boolean(options.slug)) {
    throw new Error("Either a slug or id is required");
  }

  const result = await swell.products.get(options.id || options.slug, {
    expand: ["categories"],
  });

  return result ? normalizeProduct(result) : null;
};

export const getLinks = (path, router, item) => {
  return path.map((val, index) => {
    let link = "";
    let name = val;
    console.log(item);
    if (index === 0) {
      link = `/${val}`;
    }
    if (item && item.categories && item.categories.length && index === 1) {
      link = `/collection/${item.categories[0].slug}`;
    }
    if (item && Object.keys(item).includes("top_id") && index === 1) {
      link = `/collection/${item.slug}`;
    }
    if (index === path.length - 1) {
      link = router.asPath;
    }
    if (
      index === path.length - 1 &&
      item &&
      !Object.keys(item).includes("top_id")
    ) {
      name = item.name;
      link = router.asPath;
    }
    return { path: name, link: link };
  });
};

export const getBreadCrumbs = async (router) => {
  if (router.query.handle) {
    const parent = await getParentOfCategory(router.query.handle);
    if (parent && parent.slug !== router.query.handle) {
      let path = router.asPath
        .split("/")
        .map((route) => {
          return route.replace(/-/g, " ");
        })
        .filter((path) => path !== "");
      const found = path.find((val) => {
        return val.includes("?");
      });
      if (found) {
        path = path[path.indexOf(found)].split("?");
        path.pop();
      }
      const url = router.asPath.split("/").filter((path) => path !== "");

      path.splice(1, 0, parent.name);
      url.splice(1, 0, parent.slug);
      const obj = getLinks(path, router, parent);
      return obj;
    } else {
      let path = router.asPath
        .split("/")
        .map((route) => {
          return route.replace(/-/g, " ");
        })
        .filter((path) => path !== "");
      const found = path.find((val) => {
        return val.includes("?");
      });
      if (found) {
        path = path[path.indexOf(found)].split("?");
        path.pop();
      }
      const url = router.asPath.split("/").filter((path) => path !== "");
      return { url: url, path: path };
    }
  }
  if (router.query.product) {
    const product = await getProductWithCategory({
      slug: router.query.product,
    });
    if (product.categories && product.categories.length) {
      let path = router.asPath
        .split("/")
        .map((route) => {
          return route.replace(/-/g, " ");
        })
        .filter((path) => path !== "");
      const found = path.find((val) => {
        return val.includes("?");
      });
      if (found) {
        path = path[path.indexOf(found)].split("?");
        path.pop();
      }
      path.splice(1, 0, product.categories[0].name);
      const obj = getLinks(path, router, product);
      return obj;
    } else {
      let path = router.asPath
        .split("/")
        .map((route) => {
          return route.replace(/-/g, " ");
        })
        .filter((path) => path !== "");
      const found = path.find((val) => {
        return val.includes("?");
      });
      if (found) {
        path = path[path.indexOf(found)].split("?");
        path.pop();
      }
      const obj = getLinks(path, router);
      return obj;
    }
  } else {
    let path = router.asPath
      .split("/")
      .map((route) => {
        return route.replace(/-/g, " ");
      })
      .filter((path) => path !== "");
    const found = path.find((val) => {
      return val.includes("?");
    });
    if (found) {
      path = path[path.indexOf(found)].split("?");
      path.pop();
    }
    const obj = getLinks(path, router);
    return obj;
  }
};

export const getShippingRates = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  try {
    const shippingRates = await swell.cart.getShippingRates();
    if (!shippingRates) {
      throw new Error(
        "Shipping Country must be defined to generate shipping rates"
      );
    }
    return shippingRates;
  } catch (error) {
    console.log(error);
  }
};

export const getCartPaths = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const result = await swell.cart.get();
  return result;
};

export const getSiteSettings = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const settings = await swell.cart.getSettings();
  return settings;
};

export const getCategoryByBoat = async (boatModel, boatMake) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const data = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/swell/boat-categories?boat_model=${boatModel}&boat_make=${boatMake}}`
      : `http://localhost:3000/api/swell/boat-categories?boat_model=${boatModel}&boat_make=${boatMake}}`
  );
  const jsonData = await data.json();
  const categories = jsonData.data.results.map((product) => {
    return product.category_index;
  });
  const allCategories = [];
  for (const category of categories) {
    for (const id of category.id) {
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
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  // const products = await swell.products.list({ limit: 24 });
  // return products;
  const products = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/swell/products?${query}`
      : `http://localhost:3000/api/swell/products?${query}`
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

export const searchProducts = async (
  searchString,
  limit = 100,
  offset = 0,
  pageNum
) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const products = await swell.products.list({
    search: searchString,
    limit: 24,
    page: !pageNum ? 1 : pageNum,
    sort: "name asc",
  });
  return products;
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
  // const products = await getAllProducts();
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const productResults = await swell.products.list({
    limit: 24,
    page: 1,
  });

  if (productResults.count > 24) {
    let results = productResults.results;
    const pages = [];
    for (let i = 1; i <= productResults.page_count; i++) {
      pages.push(i);
    }
    for (const page in pages) {
      if (page !== 1) {
        const nextPage = await swell.products.list({
          limit: 24,
          page: Number(page),
        });
        results = [...results].concat(nextPage.results);
      }
    }
    return results?.map((entry) => entry.slug) || [];
  }
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

export const getCategoriesForNavigation = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const parents = await getParentCategories();
  const children = await getChildCategories();
  const results = parents?.map((parent) => {
    const filtered = children?.filter((child) => {
      return child.parent_id === parent.id;
    });
    return {
      link: parent.slug,
      title: parent.name,
      subLinks: filtered?.map((child) => {
        return { link: child.slug, title: child.name };
      }),
    };
  });

  return results;
};

export const getPaginatedItems = async (pageNum, query, sort) => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  if (query === "products") {
    const products = await swell.products.list({
      limit: 24,
      page: pageNum,
      sort: !sort ? "name asc" : sort,
    });
    return products ? normalizeProducts(products?.results) : [];
  } else {
    const categories = await swell.categories.list({
      limit: 24,
      page: pageNum,
      sort: !sort ? "name asc" : sort,
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
    limit: 24,
    page: 1,
  });
  return categories?.results ? categories.results : [];
};

export const getParentCategories = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 100,
  });
  const parents = categories?.results?.filter((category) => {
    return !category.parent_id;
  });

  return parents;
};

export const getParentOfCategory = async (category) => {
  const parents = await getParentCategories();
  const parent = parents.find((val) => {
    return category.toLowerCase().includes(val.slug.toLowerCase());
  });
  return parent;
};

export const getChildCategories = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 100,
  });
  const children = categories?.results?.filter((category) => {
    return category.parent_id !== null;
  });
  return children;
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
  // const collections = await getAllCollections(config, limit);
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 24,
    page: 1,
  });
  if (categories.count > 24) {
    let results = categories.results;
    const pages = [];
    for (let i = 1; i <= categories.page_count; i++) {
      pages.push(i);
    }
    for (const page in pages) {
      if (page !== 1) {
        const nextPage = await swell.categories.list({
          limit: limit,
          page: Number(page),
        });
        results = [...results].concat(nextPage.results);
      }
    }
    return results?.map((entry) => entry.slug) || [];
  } else {
    return categories?.map((entry) => entry.slug) || [];
  }
};

// export const getCollectionChildren = async (collectionId) => {
//   await swell.init(swellConfig.storeId, swellConfig.publicKey);
// }

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
