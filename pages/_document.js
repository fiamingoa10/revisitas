// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Manifest de la PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Ícono/Favicon */}
        <link rel="icon" href="/revisitas.png" type="image/png" />

        {/* Color de tema */}
        <meta name="theme-color" content="#000000" />

        {/* Descripción opcional */}
        <meta name="description" content="Aplicación Revisitas - PWA" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
