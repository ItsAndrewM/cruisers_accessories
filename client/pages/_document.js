import Document, { Html, Head, Main, NextScript } from "next/document";
import cheerio from "cheerio";
import { Analytics } from "@vercel/analytics/react";

/**
 * See this issue for more details https://github.com/emotion-js/emotion/issues/2040
 * Theme-ui using emotion which render styles inside template tags causing it not to apply when rendering
 * A/B test variations on the server, this fixes this issue by extracting those styles and appending them to body
 */
const extractABTestingStyles = (body) => {
  let globalStyles = "";

  if (body.includes("<template")) {
    const $ = cheerio.load(body);
    const templates = $("template");
    templates.toArray().forEach((element) => {
      const str = $(element).html();
      const styles = cheerio.load(String(str))("style");
      globalStyles += styles
        .toArray()
        .map((el) => $(el).html())
        .join(" ");
    });
  }
  return globalStyles;
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    let globalStyles = "";
    ctx.renderPage = async (options) => {
      const render = await originalRenderPage(options);
      globalStyles = extractABTestingStyles(render.html);
      return render;
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      globalStyles,
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <style
            dangerouslySetInnerHTML={{
              __html: this.props.globalStyles,
            }}
          ></style>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
