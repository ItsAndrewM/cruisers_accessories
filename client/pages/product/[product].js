import { BuilderComponent, Builder, builder } from '@builder.io/react'
import { getAllCollectionPaths, getAllProductPaths, getAllProducts, getAllCollections, getProduct } from '@/lib/operations-swell';
import { resolveSwellContent } from '../../lib/resolve-swell-content'
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultErrorPage from 'next/error'

// Replace with your Public API Key.
builder.init("20988483cda74747b3e814c30d7ff832");
const builderModel = 'product-page'

export const getStaticPaths = async () => {
    const paths = await getAllProductPaths()
    return {
        // TODO: update to /product
        paths: paths?.map((path) => `/product/${path}`) ?? [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ params }) => {
    const product = await getProduct({
        slug: params?.product,
    })
    const page = await resolveSwellContent(builderModel, {
        productHandle: params?.product,
    })
    return {
        props: {
            page: page || null,
            product: product || null,
        },
    }
}

const Page = ({ product, page, }) => {
    const isLive = !Builder.isEditing && !Builder.isPreviewing
    const router = useRouter()
    if (!product && isLive) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                    <meta name="title"></meta>
                </Head>
                <DefaultErrorPage statusCode={404} />
            </>
        )
    }

    return router.isFallback && isLive ? (
        <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
    ) : (
        <BuilderComponent
            key={product.id}
            model={builderModel}
            data={{ product }}
            {...(page && { content: page })}
        />
    )
}

export default Page;