import 'antd/dist/antd.css';
import Head from 'next/head'
import '../styles.css'


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8"/>
        <title>Online Education</title>
        <meta key="description" name="description" content="Online Education System" />
        <meta key="keywords" name="keywords" content="education,managment" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}