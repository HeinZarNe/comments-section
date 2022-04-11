import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Script } from "next/script";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
