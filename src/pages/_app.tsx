import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import NavBar from "../components/navigation/Nav";
import Footer from "../components/footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
