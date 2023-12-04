import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    greets: String
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
    quote(user_id:ID!): [Quote]
  }

  type User{
    _id: ID
    name: String
    email: String
    role: String
    greets: String
    quotes: [Quote]
  }

  type Quote{
    _id:ID
    quote: String
    user_id: ID
  }

  type Mutation{
    createUser(newUser: NewUser!): User
    signin(userSignin: SigninUser!): AuthUser
  }
  
  input NewUser{
    name:String!
    email:String!
    role:String!
    password: String!
  }
  input SigninUser{
    email:String!
    password:String!
  }
  type AuthUser {
    _id: ID
    name: String
    email: String
    role: String
    token: String!
  }
`;