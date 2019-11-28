const { gql } = require('apollo-server');

const typeDefs = gql`

  type GitHubUser {
    id: ID!
    login: String
    url: String
    avatar: String
  }

  type GitHubFullUser {
    id: ID!
    login: String
    url: String
    avatar: String
    name: String,
    company: String,
    blog: String,
    location: String,
    email: String,
    hireable: Boolean,
    bio: String,
    public_repos: Int,
    public_gists: Int,
    followers: Int,
  }

  type GitHubRepository {
    id: ID!
    cursor: String
    fullName: String
    url: String
    description: String
    owner: GitHubUser
  }

  type Query {
    gitHubUsers(
      pageSize: Int
      after: String
    ): GitHubUserConnection!
    gitHubUser(login: String): GitHubFullUser
    gitHubRepositories(
      login: String
      pageSize: Int
      after: String
    ): GitHubRepositoryConnection!
  }

  type Mutation {
    searchGitHubUsers(
      query: String,
      pageSize: Int
      after: String ): GitHubUserConnection!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type GitHubUserConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    gitHubUsers: [GitHubUser]!
  }

  type GitHubRepositoryConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    gitHubRepositories: [GitHubRepository]
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
