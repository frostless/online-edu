import 'antd/dist/antd.css';
import Head from 'next/head'
import '../styles.css'


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Online Education</title>
        <meta name="description" content="Online Education System" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}