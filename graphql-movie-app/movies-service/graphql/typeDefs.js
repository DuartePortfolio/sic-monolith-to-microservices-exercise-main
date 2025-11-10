const { gql } = require('apollo-server');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int!
  }

  type Query {
    movies: [Movie!]!
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(title: String!, year: Int!): Movie!
    updateMovie(id: ID!, title: String, year: Int): Movie!
    deleteMovie(id: ID!): Movie!
  }
`;

module.exports = typeDefs;
