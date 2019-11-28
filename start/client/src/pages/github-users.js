import React, { Fragment } from 'react';
import styled, { css } from 'react-emotion';
import { colors, unit } from '../styles';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

import { GitHubUsersTile, Header, Button, Loading, Search } from '../components';

const GET_GITHUB_USERS_LIST = gql`
  query GetAllGitHubUsers ($after: String) {
    gitHubUsers(pageSize: 5, after: $after) {
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

export default function GitHubUsers() {
  const { data, loading, error, fetchMore } = useQuery(GET_GITHUB_USERS_LIST);
  console.log(data);
  if (loading) return <Loading />;
  if (error) return <p>Error in fetching data</p>;

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

const StyledInput = styled('input')({
  width: '100%',
  marginBottom: unit * 2,
  padding: `${unit * 1.25}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: 'none',
  ':focus': {
    borderColor: colors.primary,
  },
});
