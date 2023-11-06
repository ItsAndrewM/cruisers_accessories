import { builder } from "@builder.io/react";
import builderConfig from "@/builder.config";
import {
  getAllCollectionPaths,
  getAllProductPaths,
} from "@/lib/operations-swell";

const EXTERNAL_DATA_URL = "https://www.precisioncruisingaccessories.com";

const generateSiteMap = (pages, collections, products) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
                    <url>
                    <loc>https://www.precisioncruisingaccessories.com/collections</loc>
                    </url>
                    <url>
                    <loc>https://www.precisioncruisingaccessories.com/products</loc>
                    </url>
                    ${pages
                      .map((page) => {
                        return `
                              <url>
                              <loc>${`${EXTERNAL_DATA_URL}${page.data?.url}`}</loc>
                              <lastmod>${new Date(page.lastUpdated)
                                .toISOString()
                                .slice(0, 10)}</lastmod>
                                <changefreq>daily</changefreq>
                                <priority>0.8</priority>
                              </url>
                          `;
                      })
                      .join("")}
                    ${collections
                      .map((collection) => {
                        return `
                            <url>
                            <loc>${`${EXTERNAL_DATA_URL}/collection/${collection}`}</loc>
                            <lastmod>${new Date()
                              .toISOString()
                              .slice(0, 10)}</lastmod>
                            <changefreq>daily</changefreq>
                                <priority>0.8</priority>
                            </url>
                        `;
                      })
                      .join("")}
                      ${products
                        .map((product) => {
                          return `
                              <url>
                              <loc>${`${EXTERNAL_DATA_URL}/products/${product}`}</loc>
                              <lastmod>${new Date()
                                .toISOString()
                                .slice(0, 10)}</lastmod>
                              <changefreq>daily</changefreq>
                                <priority>0.8</priority>
                              </url>
                          `;
                        })
                        .join("")}

                </urlset>`;
};

const SiteMap = () => {};

export default SiteMap;

export async function getServerSideProps({ res }) {
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  });
  const products = await getAllProductPaths();
  const collections = await getAllCollectionPaths();
  const sitemap = generateSiteMap(pages, collections, products);

  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
