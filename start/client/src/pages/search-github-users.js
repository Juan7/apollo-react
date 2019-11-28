import React, { Fragment } from 'react';
import styled, { css } from 'react-emotion';
import { colors, unit } from '../styles';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SearchForm } from '../components';
import gql from 'graphql-tag';

import { GitHubUsersTile, Header, Button, Loading, Search } from '../components';

const SEARCH_GITHUB_USERS_LIST = gql`
  mutation SearchGitHubUsers ($query: String, $after: String) {
    searchGitHubUsers(query:$query, pageSize: 5, after: $after) {
      cursor
    	hasMore
      gitHubUsers {
        id
        url
        avatar
        login
      }
    }
  }
`;

export default function SearchInit() {


}

export function SearchGitHubUsers({ query }) {
  const client = useApolloClient();
  const [data, loading, error, fetchMore ] = useMutation(
    SEARCH_GITHUB_USERS_LIST,
    {
      variables: { query },
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;
  return (
    <Fragment>
      <Header />
      {data.gitHubUsers &&
        data.gitHubUsers.gitHubUsers &&
        data.gitHubUsers.gitHubUsers.map(gitHubUser => (
          <GitHubUsersTile
            key={gitHubUser.id}
            gitHubUser={gitHubUser}
          />
        ))}
        {data.gitHubUsers &&
          data.gitHubUsers.hasMore && (
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.gitHubUsers.cursor,
                  },
                  updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...fetchMoreResult,
                      gitHubUsers: {
                        ...fetchMoreResult.gitHubUsers,
                        gitHubUsers: [
                          ...prev.gitHubUsers.gitHubUsers,
                          ...fetchMoreResult.gitHubUsers.gitHubUsers,
                        ],
                      },
                    };
                  },
                })
              }
            >
              Load More
            </Button>
          )
        }
    </Fragment>
  );
}
