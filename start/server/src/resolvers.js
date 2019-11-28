const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    gitHubUsers: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allGitHubUsers = await dataSources.gitHubUserAPI.getAllGitHubUsers();
      // we want these in reverse chronological order
      allGitHubUsers.reverse();
      const gitHubUsers = paginateResults({
        after,
        pageSize,
        results: allGitHubUsers
      });
      return {
        gitHubUsers,
        cursor: gitHubUsers.length ? gitHubUsers[gitHubUsers.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: gitHubUsers.length
          ? gitHubUsers[gitHubUsers.length - 1].cursor !==
            allGitHubUsers[allGitHubUsers.length - 1].cursor
          : false
      };
    },
    gitHubUser: (_, { login }, { dataSources }) =>
      dataSources.gitHubUserAPI.getGitHubUserByLogin({ login: login }),
    gitHubRepositories: async (_, { login, pageSize = 20, after }, { dataSources }) => {
      const allGitHubRepositories = await dataSources.gitHubUserAPI.getRepositoriesByUser({ login: login });
      // we want these in reverse chronological order
      allGitHubRepositories.reverse();
      const gitHubRepositories = paginateResults({
        after,
        pageSize,
        results: allGitHubRepositories
      });
      return {
        gitHubRepositories,
        cursor: gitHubRepositories.length ? gitHubRepositories[gitHubRepositories.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: gitHubRepositories.length
          ? gitHubRepositories[gitHubRepositories.length - 1].cursor !==
            allGitHubRepositories[allGitHubRepositories.length - 1].cursor
          : false
      };
    },
  },
  Mutation: {
    searchGitHubUsers: async (_, { query, pageSize = 20, after}, { dataSources }) => {
      const allGitHubUsers = await dataSources.gitHubUserAPI.searchGitHubUserByQuery({ query: query});
      // we want these in reverse chronological order
      allGitHubUsers.reverse();
      const gitHubUsers = paginateResults({
        after,
        pageSize,
        results: allGitHubUsers
      });
      return {
        gitHubUsers,
        cursor: gitHubUsers.length ? gitHubUsers[gitHubUsers.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: gitHubUsers.length
          ? gitHubUsers[gitHubUsers.length - 1].cursor !==
            allGitHubUsers[allGitHubUsers.length - 1].cursor
          : false
      };
    }
  }
};
