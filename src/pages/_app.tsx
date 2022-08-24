import { ThemeProvider } from "next-themes";
import { darkTheme, globalCss } from "stitches.config";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

type AppProps = {
  Component: any;
  pageProps: any;
};

const globalStyles = globalCss({
  body: {
    margin: "0!important",
    padding: "0!important",
    overflowX: "hidden",
    fontFamily: "$sans",
    background: "$background",
  },
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{
          light: "light-theme",
          dark: darkTheme.className,
        }}
        defaultTheme="dark"
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
