import '../scss/globals.scss';
import App from 'next/app';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import Head from 'next/head';
import AppleTouchIcon from 'public/apple-touch-icon.png';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          type="image/png"
          href={AppleTouchIcon.src}
        />
        <title>POC</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // const ctx = appContext && appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  resetServerContext();
  return {
    ...appProps,
  };
};

export default MyApp;
