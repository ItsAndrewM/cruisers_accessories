import { resolveSwellContent } from './resolve-swell-content'

export async function getLayoutProps(targetingAttributes) {
  const theme = await resolveSwellContent('theme', targetingAttributes)
  console.log(targetingAttributes)
  console.log(theme)
  return {
    theme: theme || null,
  }
}
