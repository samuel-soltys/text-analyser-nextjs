import "../scss/main.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;
