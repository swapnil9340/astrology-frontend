"use client";

import { useState } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Dark MUI theme aligned with the AstroVeda palette (mainly for icon colours).
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e11d48" },
    secondary: { main: "#9333ea" },
    background: { default: "#150610", paper: "#1f0916" },
    text: { primary: "#fdeff2", secondary: "#d8b9c4" },
  },
  shape: { borderRadius: 12 },
});

/**
 * Emotion cache + server-insertion registry so MUI styles are injected
 * correctly during SSR in the Next.js App Router.
 */
export default function ThemeRegistry({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui", prepend: true });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
