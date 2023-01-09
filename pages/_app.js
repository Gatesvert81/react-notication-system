import Notification from "../src/Context/Notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Notification>
      <Component {...pageProps} />
    </Notification>
  );
}

export default MyApp;
