import { ThemeUIProvider, jsx } from 'theme-ui'
import dynamic from 'next/dynamic'
import { ManagedUIContext, useUI } from '../ui/context'
import Head from '../head/head'
import Navbar from '../ui/navbar/navbar'
import { useAcceptCookies } from '../../lib/hooks/useAcceptCookies'
import { Button } from 'theme-ui'
import Sidebar from '../ui/sidebar/sidebar'
import CartSidebarView from '../cart/cartSidebarView/cartSidebarView'
import { CommerceProvider } from '@/lib/commerceProvider'
import swellConfig from '@/swell.config'
import { builder, BuilderContent, Builder } from '@builder.io/react'
import themesMap from '../../config/theme'
import '@builder.io/widgets'
import 'react-spring-modal/styles.css'
import seoConfig from '../../config/seo.json'
import NoSSR from '../ui/noSSR/noSSR'
import styles from "./layout.module.css"

const FeatureBar = dynamic(() => import('../featuredBar/featureBar'), {
  ssr: false,
})

const Layout = ({ children, pageProps }) => {
  const builderTheme = pageProps.theme
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  return (
    <CommerceProvider {...swellConfig}>
      <BuilderContent
        {...(isLive && { content: builderTheme })}
        modelName="theme"
      >
        {(data, loading) => {
          if (loading && !builderTheme) {
            return 'loading ...'
          }
          const siteSettings = data?.siteSettings
          const colorOverrides = data?.colorOverrides
          const siteSeoInfo = data?.siteInformation
          return (
            <ManagedUIContext key={data.id} siteSettings={siteSettings}>
              <Head seoInfo={siteSeoInfo || seoConfig} />
              <InnerLayout
                themeName={data.theme || 'base'}
                colorOverrides={colorOverrides}
              >
                {children}
              </InnerLayout>
            </ManagedUIContext>
          )
        }}
      </BuilderContent>
    </CommerceProvider>
  )
}

const InnerLayout = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName], colors: { ...themesMap[themeName].colors, ...colorOverrides, },
  }
  const { displaySidebar, closeSidebar } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  return (
    <ThemeUIProvider >
      <Navbar />
      <div
        className={styles.wrapper}
      >
        <main>{children}</main>
      </div>

      <Sidebar
        open={
          displaySidebar ||
          (builder.editingModel || Builder.previewingModel) ===
          'cart-upsell-sidebar'
        }
        onClose={closeSidebar}
      >
        <CartSidebarView />
      </Sidebar>
      <NoSSR>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={Builder.isEditing ? true : acceptedCookies}
          action={
            <Button onClick={() => onAcceptCookies()}>Accept cookies</Button>
          }
        />
      </NoSSR>
    </ThemeUIProvider >

  )
}

export default Layout
