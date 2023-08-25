import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Layout } from '@/components/layout/layout'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import builderConfig from '@/builder.config'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { resolveSwellContent } from '@/lib/resolve-swell-content'

builder.init(builderConfig.apiKey)
// import '../blocks/ProductGrid/ProductGrid.builder'
// import '../blocks/CollectionView/CollectionView.builder'
import { useThemeUI } from '@theme-ui/core'
import Link from '@/components/ui/link/link'
import { getLayoutProps } from '@/lib/get-layout-props'

const isProduction = process.env.NODE_ENV === 'production'

export async function getStaticProps({
    params }) {
    const page = await resolveSwellContent('page', {
        urlPath: '/' + (params?.path?.join('/') || ''),
    })
    return {
        props: {
            page,
            ...(await getLayoutProps()),
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 30 seconds
        revalidate: 30,
    }
}

export async function getStaticPaths({ locales }) {
    const pages = await builder.getAll('page', {
        options: { noTargeting: true },
        apiKey: builderConfig.apiKey,
    })

    return {
        paths: pages.map((page) => `${page.data?.url}`),
        fallback: true,
    }
}

export default function Page({ page }) {
    const router = useRouter()
    const { theme } = useThemeUI()
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }
    // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
    if (!page && !Builder.isEditing && !Builder.isPreviewing) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                    <meta name="title"></meta>
                </Head>
                {Builder.isBrowser && <DefaultErrorPage statusCode={404} />}
            </>
        )
    }

    const { title, description, image } = page.data || {}
    Builder.isStatic = true;
    return (
        <div>
            {title && (
                <NextSeo
                    title={title}
                    description={description}
                    openGraph={{
                        type: 'website',
                        title,
                        description,
                        ...(image && {
                            images: [
                                {
                                    url: image,
                                    width: 800,
                                    height: 600,
                                    alt: title,
                                },
                            ],
                        }),
                    }}
                />
            )}
            <BuilderComponent
                options={{ includeRefs: true }}
                model="page"
                data={{ theme }}
                renderLink={(props) => {
                    // nextjs link doesn't handle hash links well if it's on the same page (starts with #)
                    if (props.target === '_blank' || props.href?.startsWith('#')) {
                        return <a {...props} />
                    }
                    return <a {...props} as={Link} />
                }}
                {...(page && { content: page })}
            />
        </div>
    )
}

Page.Layout = Layout
