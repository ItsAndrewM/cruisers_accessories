import NextHead from "next/head";
import { DefaultSeo } from "next-seo";
import Script from "next/script";

const Head = (props) => {
  return (
    <>
      <DefaultSeo {...props.seoInfo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2d86a5bb30f44d2db3564aa2962bb093"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B60G9F71G8"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B60G9F71G8');`}
        </Script>
      </NextHead>
    </>
  );
};

export default Head;
