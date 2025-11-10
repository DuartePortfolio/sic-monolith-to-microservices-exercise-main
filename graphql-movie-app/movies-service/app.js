const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./resolvers/movieResolvers');

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL Movies Service running at ${url}`);
});