import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import superjson from "superjson";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import App from "./App";
import { getLoginUrl } from "./const";
import { trpc } from "./lib/trpc";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

function redirectToLoginIfUnauthorized(error: unknown) {
  if (!(error instanceof TRPCClientError) || typeof window === "undefined") return;
  if (error.message === UNAUTHED_ERR_MSG) window.location.href = getLoginUrl();
}

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.query.state.error);
    console.error("[API Query Error]", event.query.state.error);
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.mutation.state.error);
    console.error("[API Mutation Error]", event.mutation.state.error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
      },
    }),
  ],
});

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");

const rawState = (window as Window & { __RQ_STATE__?: unknown }).__RQ_STATE__;
const dehydratedState = rawState ? (superjson.deserialize(rawState as any) as DehydratedState) : undefined;
const app = (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Router>
          <App />
        </Router>
      </HydrationBoundary>
    </QueryClientProvider>
  </trpc.Provider>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
