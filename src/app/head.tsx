import React from 'react';
import renderMathInElement from 'utils/renderMath.mjs'
export default function RootHead() {
  return (
    <>
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'}
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css"
      />
      <title>Horizon UI PRO NextJS</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
	  <script>
        renderMathInElement(document.body);
      </script>
    </>
  );
}
