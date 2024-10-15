import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  verbose: true,
  schema: "./src/GraphQL/Types/graphql-schema.graphql",
  documents: ["src/**/*.gql.ts"],
  generates: {
    "./src/GraphQL/Types/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
