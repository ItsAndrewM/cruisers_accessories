import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { resolveSwellContent } from "../../lib/resolve-swell-content";
import builderConfig from "../../builder.config";
import { useThemeUI } from "@theme-ui/core";
import { getAllProducts } from "../../lib/operations-swell";
import { getLayoutProps } from "../../lib/get-layout-props";
import { NextSeo } from "next-seo";
import { Suspense } from "react";
import Loading from "./loading";

const builderModel = "all-products";
builder.init(builderConfig.apiKey);

export async function getStaticProps() {
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
  const { theme } = useThemeUI();

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
      <Suspense fallback={<Loading />}>
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
