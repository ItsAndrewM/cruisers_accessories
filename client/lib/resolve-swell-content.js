import { builder, Builder } from '@builder.io/react'
import { getAsyncProps } from '@builder.io/utils'
import builderConfig from '../builder.config'
import {
    getCollection,
    getProduct,
} from './operations-swell'
builder.init(builderConfig.apiKey)
Builder.isStatic = true

export const resolveSwellContent = async (
    modelName,
    targetingAttributes
) => {
    let page = await builder
        .get(modelName, {
            userAttributes: targetingAttributes,
            includeRefs: true,
            preview: modelName,
            cachebust: true,
        })
        .toPromise()

    if (page) {
        return await getAsyncProps(page, {
            async ProductGrid(props) {
                let products = []
                if (props.productsList) {
                    const promises = props.productsList
                        .map((entry) => entry.product)
                        .filter((handle) => typeof handle === 'string')
                        .map(
                            async (handle) =>
                                await getProduct({ slug: handle })
                        )
                    products = await Promise.all(promises)
                }
                return {
                    // resolve the query as `products` for ssr
                    // used for example in ProductGrid.tsx as initialProducts
                    products,
                }
            },
            async CollectionBox(props) {
                let collection = props.collection
                if (collection && typeof collection === 'string') {
                    collection = await getCollection(builderConfig, {
                        handle: collection,
                    })
                }
                return {
                    collection,
                }
            },
            async ProductBox(props) {
                let product = props.product
                if (product && typeof product === 'string') {
                    product = await getProduct({
                        slug: product,
                    })
                }
                return {
                    product,
                }
            },

            async ProductCollectionGrid({ collection }) {
                if (collection && typeof collection === 'string') {
                    const { products } = await getCollection(builderConfig, {
                        handle: collection,
                    })
                    return {
                        products,
                    }
                }
            },
        })
    }
    return null
}
