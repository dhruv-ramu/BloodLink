import { AppProps } from "next/app";
import "@/styles/globals.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { outfit } from "@/fonts";
import { RouterTransition } from "@/components/router";
import { H } from "@/components/header";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: outfit.style.fontFamily,
        }}
      >
        <RouterTransition />
        <H
          links={[
            {
              label: "Register as Donor",
              link: "/donor/auth/register",
            },
          ]}
        />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
