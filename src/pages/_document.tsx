import { Html, Head, Main, NextScript } from 'next/document'

// stitches config
import { getCssText, globalStyles } from './../../stitches.config';

export default function Document() {

  // apply stitches global styles
  globalStyles();

  return (
    <Html>
      <Head>
        <title>Finely</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="./favicon.png" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}