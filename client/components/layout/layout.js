import { ThemeUIProvider } from "theme-ui";
import dynamic from "next/dynamic";
import { ManagedUIContext, useUI } from "../ui/context";
import Head from "../head/head";
import Navbar from "../ui/navbar/navbar";
import { useAcceptCookies } from "../../lib/hooks/useAcceptCookies";
import { Button } from "theme-ui";
import Sidebar from "../ui/sidebar/sidebar";
import CartSidebarView from "../cart/cartSidebarView/cartSidebarView";
import { CommerceProvider } from "../../lib/commerceProvider";
import swellConfig from "../../swell.config";
import { builder, BuilderContent, Builder } from "@builder.io/react";
import themesMap from "../../config/theme";
import "@builder.io/widgets";
import "react-spring-modal/styles.css";
import seoConfig from "../../config/seo.json";
import NoSSR from "../ui/noSSR/noSSR";
import styles from "./layout.module.css";
import siteTheme from "../../builder/theme/site-theme.json";
import Footer from "../ui/footer/footer";
import Script from "next/script";

const FeatureBar = dynamic(() => import("../featuredBar/featureBar"), {
  ssr: false,
});

const Layout = ({ children, pageProps }) => {
  const builderTheme = pageProps.theme || siteTheme;
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  return (
    <CommerceProvider {...swellConfig}>
      <BuilderContent
        {...(isLive && { content: builderTheme })}
        modelName="theme"
      >
        {(data, loading) => {
          if (loading && !data) {
            return "loading ...";
          }
          const siteSettings = data.siteSettings;
          const colorOverrides = data.colorOverrides;
          const siteSeoInfo = data.siteInformation;
          return (
            <ManagedUIContext key={data.id} siteSettings={siteSettings}>
              {/* <ManagedUIContext > */}
              <Head seoInfo={siteSeoInfo || seoConfig} />
              <div className="google-analytics-container">
                {" "}
                <Script async id="google-analytics">
                  {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B60G9F71G8');`}
                </Script>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-B60G9F71G8" />
              </div>
              {/* <Head seoInfo={seoConfig} /> */}
              <InnerLayout
                themeName={data.theme || "base"}
                // themeName={'base'}
                colorOverrides={colorOverrides}
              >
                {children}
              </InnerLayout>
            </ManagedUIContext>
          );
        }}
      </BuilderContent>
    </CommerceProvider>
  );
};

const InnerLayout = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName],
    colors: { ...themesMap[themeName].colors, ...colorOverrides },
  };
  const { displaySidebar, closeSidebar } = useUI();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  return (
    <ThemeUIProvider theme={theme}>
      <Navbar />
      <div className={styles.wrapper}>
        <main>{children}</main>
      </div>

      <Sidebar
        open={
          displaySidebar ||
          (builder.editingModel || Builder.previewingModel) ===
            "cart-upsell-sidebar"
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
      <Footer />
    </ThemeUIProvider>
  );
};

export default Layout;
