import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";

import { fontMono, fontSans } from "@/config/fonts";
import { GlobalContextProvider } from "@/context/context";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="light">
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
