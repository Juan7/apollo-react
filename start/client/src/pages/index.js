import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import GitHubUsers from './github-users';
import GitHubUser from './github-user';
import GitHubRepositories from './github-repositories';
import SearchGitHubUsers from './search-github-users';

import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <GitHubUsers path="/" />
          <GitHubUser path="user/:login" />
          <GitHubRepositories path="user/:login/repositories" />
          <SearchGitHubUsers path="search/" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
