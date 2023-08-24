import swell from 'swell-js'
import swellConfig from '../swell.config'

// export interface BuillderConfig {
//     apiKey: string
//     productsModel: string
//     collectionsModel: string
//     isDemo?: boolean
// }

const normalizeProduct = (product) => {
    const variants = product.variants?.results ?? [];
    const images = product.images?.map((image) => ({ ...image, src: image.file.url })) ?? []
    return { ...product, variants, images };
}

const normalizeProducts = (productResults) => {
    return productResults.map((product) => {
        return normalizeProduct(product);
    });
}

export const searchProducts = async (
    searchString,
    limit = 100,
    offset = 0
) => {

    await swell.init(swellConfig.storeId, swellConfig.publicKey)
    const products = await swell.products.list({
        search: searchString,
        limit,
    })
    return products?.results ? normalizeProducts(products?.results) : []
}


export const getAllProducts = async (
    // limit = 100,
    // offset = 0
    // TODO: add in these params
) => {
    await swell.init(swellConfig.storeId, swellConfig.publicKey)

    const productResults = await swell.products.list()
    return productResults ? normalizeProducts(productResults?.results) : [];
}

export const getAllProductPaths = async (

) => {

    const products = await getAllProducts()
    return products?.map((entry) => entry.slug) || []
}

export const getProduct = async (options) => {
    await swell.init(swellConfig.storeId, swellConfig.publicKey)
    if (Boolean(options.id) === Boolean(options.slug)) {
        throw new Error('Either a slug or id is required')
    }

    const result = await swell.products.get(options.id || options.slug, { expand: ['variants'] });
    return result ? normalizeProduct(result) : null;
}


// TODO: add in collection functions

export const getAllCollections = async (
    config,
    limit = 20,
    offset = 0,
) => {
    await swell.init(swellConfig.storeId, swellConfig.publicKey)
    const categories = await swell.categories.list({
        // limit
    })
    return categories?.results
}

export const getAllCollectionPaths = async (
    config,
) => {
    const collections = await getAllCollections(config, limit)
    return collections?.map((entry) => entry.slug) || []
}

export const getCollection = async (
    config,
    options
) => {
    if (Boolean(options.id) === Boolean(options.handle)) {
        throw new Error('Either a handle or id is required')
    }

    const query = options.id || options.handle;
    await swell.init(swellConfig.storeId, swellConfig.publicKey)
    const category = await swell.categories.get(query, { expand: ['products'] })
    const products = category?.products?.results ? normalizeProducts(category?.products?.results) : []
    // const { page, count } = products;
    // TODO: add pagination logic 
    const hasNextPage = false;
    const nextPageCursor = null;

    return {
        ...category,
        products,
        nextPageCursor,
        hasNextPage,
    }
}
