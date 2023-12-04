import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import './config.js'
import './models/User.js';
import './models/Quote.js';
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemaGql.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen()
  .then(({ url, port }) =>
    console.log("your server is running on port :", port, url)
  );
