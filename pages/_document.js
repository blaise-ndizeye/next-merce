import * as React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheets } from "@material-ui/core/styles"
import createEmotionServer from "@emotion/server/create-instance"
import createEmotionCache from "../utils/createEmotionCache"
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles"

const theme = responsiveFontSizes(createTheme())

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const sheets = new ServerStyleSheets()

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        sheets.collect(<App emotionCache={cache} {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      ...emotionStyleTags,
    ],
  }
}

// import React from "react"
// import { ServerStyleSheets } from "@material-ui/core/styles"
// import Document, { Html, Main, NextScript, Head } from "next/document"

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <link
//             rel="stylesheet"
//             href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// MyDocument.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets()
//   const originalRenderPage = ctx.renderPage
//   ctx.renderPage = () => {
//     return originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     })
//   }
//   const initialProps = await Document.getInitialProps(ctx)
//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   }
// }
