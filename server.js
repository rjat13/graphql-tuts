import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    greetings: String
  }
`;
const resolvers = {
  Query: {
    greetings: () => "Hello World!",
  },
};

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
