import { resolveSwellContent } from './resolve-swell-content'

export async function getLayoutProps(targetingAttributes) {
  const theme = await resolveSwellContent('theme', targetingAttributes)
  return {
    theme: theme || null,
  }
}
