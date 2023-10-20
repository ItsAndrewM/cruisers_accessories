import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { resolveSwellContent } from "../../../lib/resolve-swell-content";
import builderConfig from "../../../builder.config";
import {
  getCollection,
  getAllCollectionPaths,
} from "../../../lib/operations-swell";
import { useThemeUI } from "@theme-ui/core";
import { getLayoutProps } from "../../../lib/get-layout-props";
import Loading from "./loading";

builder.init(builderConfig.apiKey);
Builder.isStatic = true;

const builderModel = "collection-page";

export async function getStaticPaths({ locales }) {
  const paths = await getAllCollectionPaths(builderConfig);
  return {
    paths: paths.map((path) => `/collection/${path}`) ?? [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const collection = await getCollection(builderConfig, {
    handle: params?.handle,
  });

  const page = await resolveSwellContent(builderModel, {
    collectionHandle: params?.handle,
  });
  return {
    props: {
      page: page || null,
      collection: collection || null,
      builderModel: builderModel,
      ...(await getLayoutProps()),
    },
  };
}

export default function Handle({ collection, page, builderModel }) {
  console.log(builderModel);
  const router = useRouter();
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  const { theme } = useThemeUI();
  if (router.isFallback || !collection || !page) {
    return <Loading />;
  }

  return (
    <BuilderComponent
      key={collection.id}
      model={builderModel}
      data={{ collection, theme }}
      {...(page && { content: page })}
    />
  );
}

Handle.Layout = Layout;
