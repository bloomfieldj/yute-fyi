import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-display: optional;
                src: local(''),
                     url('/fonts/inter-v8-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
                     url('/fonts/inter-v8-latin-regular.woff') format('woff'), /* Modern Browsers */
              }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
