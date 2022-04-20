/* purgecss start ignore */
import "nextra-theme-docs/style.css";
/* purgecss end ignore */

import "../styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
