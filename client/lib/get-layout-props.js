import { resolveSwellContent } from './resolve-swell-content'

const backup = {
  lastUpdatedBy: '4FFFg0MNRJT0z0nW4uUizDHfHJV2',
  rev: 'ajdi64rxyd',
  data: {
    siteSettings: { navigationLinks: [Array], logo: [Object] },
    colorOverrides: {},
    siteInformation: {
      description: 'A starter kit demo store for using Swell and Builder.io ->  https://github.com/swellstores/nextjs-builder',
      openGraph: [Object],
      title: 'Builder.io + Next.js + Swell Demo',
      titleTemplate: '%s - Headless Demo'
    },
    theme: 'swiss'
  },
  '@originOrg': '4d832b53c3cf422f9a6c92a23abf35ac',
  modelId: '8dd2f71a80b72d4b5130e5f927ada18ff2dc66b49545e0f695e29fd8e1367083',
  query: [],
  published: 'published',
  testRatio: 1,
  '@originContentId': 'a312ae57f3de886b360cafc1986714f81e8ed93bc6d0a09f717b9f91dae23f79',
  lastUpdated: 1631307937069,
  createdDate: 1618890934748,
  createdBy: '4FFFg0MNRJT0z0nW4uUizDHfHJV2',
  meta: { kind: 'data' },
  variations: {},
  name: 'Site theme',
  '@originModelId': '93a28cddbe257c8c956bbdb79408188bfab7220ad04e7c505e572d47a6b0406d',
  id: '1d70881d66c4036f304698968635d9a2457e2383bfa9a8b70313f3fa54a659ad'
}

export async function getLayoutProps(targetingAttributes) {
  const theme = await resolveSwellContent('theme', targetingAttributes)
  return {
    theme: theme || null,
  }
}
