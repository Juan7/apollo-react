const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const cors = require('cors');
const resolvers = require('./resolvers');

const GitHubUserAPI = require('./datasources/githubuser');

const server = new ApolloServer({
  cors: {
		origin: '*',			// <- allow request from all domains
		credentials: true},
  typeDefs,
  resolvers,
  dataSources: () => ({
    gitHubUserAPI: new GitHubUserAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
