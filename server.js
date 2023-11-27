import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from "./fakeData.js";

const typeDefs = gql`
  type Query {
    greets: String
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
    quote(user_id:ID!): [Quote]
  }

  type User{
    id: ID
    name: String
    email: String,
    role: String,
    greets: String,
    quotes: [Quote]
  }

  type Quote{
    id:ID
    quote: String
    user_id: ID
  }
`;
const resolvers = {
  Query: {
    greets: () => "Hello World!",
    users: () => users,
    quotes: () => quotes,
    user: (_, args) => users.find((u) => u.id == args.id),
    quote: (_, {user_id}) => quotes.filter(q => q.user_id == user_id)
  },
  User:{
    greets:(parent) => `Hi ${parent.name}!`,
    quotes: (parent) => quotes.filter((q) => q.user_id === parent.id)
  }
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
