import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { resolveSwellContent } from "../../lib/resolve-swell-content";
import builderConfig from "../../builder.config";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useThemeUI } from "@theme-ui/core";
import { getAllProducts } from "../../lib/operations-swell";
import { getLayoutProps } from "../../lib/get-layout-props";
import { NextSeo } from "next-seo";
import ProductsViewHome from "@/blocks/productsViewHome/productsViewHome";
import { Suspense } from "react";
import Loading from "./loading";

const builderModel = "all-products";
builder.init(builderConfig.apiKey);

export async function getStaticProps() {
  // export async function getServerSideProps(context) {
  const products = await getAllProducts(builderConfig);
  const page = await resolveSwellContent(builderModel);
  return {
    props: {
      page: page || null,
      products: products || null,
      ...(await getLayoutProps()),
    },
  };
}

export default function Page({ products, page }) {
  const router = useRouter();
  console.log(router.isFallback);
  const { theme } = useThemeUI();
  if (router.isFallback) {
    return <Loading />;
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
    );
  }
  const { title, description, image } = page.data || {};
  Builder.isStatic = true;
  return (
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
      <Suspense fallback={<p>Loading...</p>}>
        <BuilderComponent
          options={{ includeRefs: true }}
          model={{ builderModel }}
          data={{ products, theme }}
          {...(page && { content: page })}
        />
      </Suspense>
      {/* <ProductsViewHome /> */}
    </div>
  );
}

Page.Layout = Layout;
