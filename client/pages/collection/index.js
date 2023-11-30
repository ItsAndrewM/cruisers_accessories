import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { resolveSwellContent } from "../../lib/resolve-swell-content";
import builderConfig from "../../builder.config";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useThemeUI } from "@theme-ui/core";
import { getAllCollections } from "../../lib/operations-swell";
import { getLayoutProps } from "../../lib/get-layout-props";
import { NextSeo } from "next-seo";

const builderModel = "collections-primary";
builder.init(builderConfig.apiKey);

export async function getStaticProps() {
  const collections = await getAllCollections(builderConfig);
  const page = await resolveSwellContent(builderModel);
  return {
    props: {
      page: page || null,
      collections: collections || null,
      ...(await getLayoutProps()),
    },
  };
}

export default function Page({ collections, page }) {
  const router = useRouter();
  const { theme } = useThemeUI();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
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
          title={`PCA | ${title}`}
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
        options={{ includeRefs: true }}
        model={{ builderModel }}
        data={{ collections, theme }}
        {...(page && { content: page })}
      />
      <div>{/* <CollectionViewHome /> */}</div>
    </div>
  );
}

Page.Layout = Layout;
