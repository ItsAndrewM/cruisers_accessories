import { BuilderComponent, Builder, builder } from "@builder.io/react";
import {
  getAllProductPages,
  getAllProductPaths,
  getAllProducts,
  getProduct,
} from "../../../lib/operations-swell";
import { resolveSwellContent } from "../../../lib/resolve-swell-content";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import Layout from "../../../components/layout/layout";
import { getLayoutProps } from "../../../lib/get-layout-props";
import { useThemeUI } from "theme-ui";
import builderConfig from "@/builder.config";
import { NextSeo } from "next-seo";
// Replace with your Public API Key.
builder.init("20988483cda74747b3e814c30d7ff832");

export const getStaticPaths = async () => {
  const slugs = await getAllProductPaths();
  const pages = await getAllProductPages();
  const paths = await slugs.concat(pages);
  return {
    // TODO: update to /product
    paths: paths?.map((path) => `/products/${path}`) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const pages = await getAllProductPages();
  const find = pages.find((page) => {
    return page.includes(params.product);
  });
  if (find) {
    const builderModel = "all-products";
    const products = await getAllProducts(builderConfig, 24, Number(find));
    const page = await resolveSwellContent(builderModel);
    return {
      props: {
        page: page || null,
        product: products || null,
        ...(await getLayoutProps()),
      },
    };
  } else {
    const builderModel = "product-page";
    const product = await getProduct({
      slug: params?.product,
    });
    const page = await resolveSwellContent(builderModel, {
      productHandle: params?.product,
    });
    return {
      props: {
        page: page || null,
        product: product || null,
        builderModel: builderModel,
        ...(await getLayoutProps()),
      },
    };
  }
};

const Page = ({ product, page, builderModel }) => {
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  const router = useRouter();
  const { theme } = useThemeUI();
  const { title, description, image } = page.data || {};
  if (!product && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return router.isFallback && isLive ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <div>
      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: "website",
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
        key={product.id}
        model={builderModel}
        data={{ product, theme }}
        {...(page && { content: page })}
      />
    </div>
  );
};

Page.Layout = Layout;

export default Page;
