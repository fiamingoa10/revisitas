// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Manifest de la PWA */}
        <link rel="manifest" href="/manifest.webmanifest" crossorigin="use-credentials" />

        {/* Ícono/Favicon */}
        <link rel="icon" href="/revistas.png" type="image/png" />

        {/* Color de tema */}
        <meta name="theme-color" content="#000000" />

        {/* Compatibilidad con iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Revisitas" />
        <link rel="apple-touch-icon" href="/revistas.png" />

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
