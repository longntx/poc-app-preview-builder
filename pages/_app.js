import '../scss/globals.scss';
import App from 'next/app';
import { resetServerContext } from 'react-beautiful-dnd';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
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
