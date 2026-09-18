import { dehydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import superjson from "superjson";
import App from "./App";
import { trpc } from "./lib/trpc";

export type SsrRenderResult = {
  html: string;
  dehydratedState: unknown;
};

export function render(url: string): SsrRenderResult {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
    },
  });
  const splitIndex = url.indexOf("?");
  const ssrPath = splitIndex === -1 ? url : url.slice(0, splitIndex);
  const ssrSearch = splitIndex === -1 ? "" : url.slice(splitIndex + 1);
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });

  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );

  return { html, dehydratedState: dehydrate(queryClient) };
}
