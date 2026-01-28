import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://jsonplaceholder.typicode.com/graphql",
    headers: {
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
  }),
  cache: new InMemoryCache(),
});
