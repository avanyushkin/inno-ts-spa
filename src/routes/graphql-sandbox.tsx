import { createFileRoute } from "@tanstack/react-router";
import { ApolloSandbox } from "@apollo/sandbox/react";

export const Route = createFileRoute("/graphql-sandbox")({
  component: GraphQLSandbox,
});

function GraphQLSandbox() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GraphQL Sandbox</h1>
      <div className="h-screen">
        <ApolloSandbox />
      </div>
    </div>
  );
}
