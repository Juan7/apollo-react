const { RESTDataSource } = require('apollo-datasource-rest');

class GitHubUserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/';
  }

  // leaving this inside the class to make the class easier to test
  gitHubUserAPIReducer(gitHubUser) {
    return {
      id: gitHubUser.id || 0,
      cursor: `${gitHubUser.id}`,
      login: `${gitHubUser.login}`,
      url: gitHubUser.url,
      avatar: gitHubUser.avatar_url,
    };
  }

  gitHubUserAPIFullReducer(gitHubUser) {
    return {
      id: gitHubUser.id || 0,
      cursor: `${gitHubUser.id}`,
      login: `${gitHubUser.login}`,
      url: gitHubUser.url,
      avatar: gitHubUser.avatar_url,
      name: gitHubUser.name,
      company: gitHubUser.company,
      blog: gitHubUser.blog,
      location: gitHubUser.location,
      email: gitHubUser.email,
      hireable: gitHubUser.hireable,
      bio: gitHubUser.bio,
      public_repos: gitHubUser.public_repos,
      public_gists: gitHubUser.public_gists,
      followers: gitHubUser.followers,
    };
  }

  gitHubRepositoryAPIReducer(gitHubRepository) {
    return {
      id: gitHubRepository.id || 0,
      cursor: `${gitHubRepository.id}`,
      fullName: `${gitHubRepository.full_name}`,
      url: gitHubRepository.html_url,
      description: gitHubRepository.description,
      owner: {
        id: gitHubRepository.owner.id,
        avatar: gitHubRepository.owner.avatar_url,
      }
    };
  }

  async getAllGitHubUsers() {
    const response = await this.get('users');
    // transform the raw launches to a more friendly
    return Array.isArray(response)
      ? response.map(gitHubUser => this.gitHubUserAPIReducer(gitHubUser)) : [];
  }

  async getGitHubUserByLogin({ login }) {
    const response = await this.get(`users/${login}`)
    return this.gitHubUserAPIFullReducer(response);
  }

  async searchGitHubUserByQuery({ query }) {
    const response = await this.get('search/users', { q: query });
    const gitHubUsers = response["items"]

    return Array.isArray(gitHubUsers)
      ? gitHubUsers.map(gitHubUser => this.gitHubUserAPIReducer(gitHubUser)) : [];
  }

  async getRepositoriesByUser({ login }) {
    const response = await this.get(`users/${login}/repos`);
    return Array.isArray(response)
      ? response.map(gitHubRepository => this.gitHubRepositoryAPIReducer(gitHubRepository)) : [];
  }
}

module.exports = GitHubUserAPI;
