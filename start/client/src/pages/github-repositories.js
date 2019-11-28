import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import upArrow from '../assets/images/up-arrow-2.png';
import gql from 'graphql-tag';

import { GitHubRepositoryTile, Header, Button, Loading } from '../components';
import { UpLink, backgroundImageFormat } from './github-user';

const GET_GITHUB_REPOSITORIES_LIST = gql`
  query GetGitHubRepositories ($login: String, $after: String) {
    gitHubRepositories(login:$login, pageSize: 5, after: $after) {
      cursor
    	hasMore
    	gitHubRepositories {
      	id
        fullName
      	url
      	description
        owner {
          id
          avatar
        }
      }
    }
  }
`;

export default function GitHubRepositories({ login }) {
  const { data, loading, error, fetchMore } = useQuery(
    GET_GITHUB_REPOSITORIES_LIST,
    { variables: { login } }
  );
  console.log("data");
  console.log(data);
  if (loading) return <Loading />;
  if (error) return <p>Error in fetching data</p>;
  let owner = {login:login, avatar: null};
  if (data.gitHubRepositories &&
    data.gitHubRepositories.gitHubRepositories){
      owner = data.gitHubRepositories.gitHubRepositories[0].owner;
  }
  console.log(owner);
  return (
    <Fragment>
      <Header image={owner.avatar}>
        {login}
        <UpLink
          to={"../"}
          style={{
            backgroundImage: backgroundImageFormat(upArrow),
          }}>
        </UpLink>
      </Header>
      {data.gitHubRepositories &&
        data.gitHubRepositories.gitHubRepositories &&
        data.gitHubRepositories.gitHubRepositories.map(gitHubRepository => (
          <GitHubRepositoryTile
            key={gitHubRepository.id}
            gitHubRepository={gitHubRepository}
          />
        ))}
        {data.gitHubRepositories &&
          data.gitHubRepositories.hasMore && (
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.gitHubRepositories.cursor,
                  },
                  updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...fetchMoreResult,
                      gitHubRepositories: {
                        ...fetchMoreResult.gitHubRepositories,
                        gitHubRepositories: [
                          ...prev.gitHubRepositories.gitHubRepositories,
                          ...fetchMoreResult.gitHubRepositories.gitHubRepositories,
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
