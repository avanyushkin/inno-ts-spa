import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { apolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client/react";
const router = createRouter ({ routeTree });
declare module "@tanstack/react-router" { // для заполнения линков в роутах
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot (document.getElementById ("root")!).render (
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router = {router} />
    </ApolloProvider>
  </React.StrictMode>
);