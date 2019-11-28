import React, { Fragment } from 'react';

import { useQuery } from '@apollo/react-hooks';
import styled from 'react-emotion';
import { Link } from '@reach/router';

import upArrow from '../assets/images/up-arrow-2.png';
import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from '../components/github-users-tile';
import gql from 'graphql-tag';

import { Loading, Header, GitHubUserDetail } from '../components';
import { ActionButton } from '../containers';

export const GET_GITHUB_USER_DETAILS = gql`
  query GetGitHubUserByLogin($login: String!) {
    gitHubUser(login: $login) {
      id
      login
      url
      avatar
      name
      company
      blog
      location
      email
      hireable
      bio
      public_repos
      public_gists
      followers
    }
  }
`;

export const UpLink = styled(Link)(cardClassName, {
  display: 'block',
  width: 5,
  height: 5,
});

export function backgroundImageFormat(image) {
  return `url(${image})`;
}

export default function GitHubUser({ login }) {
  const { data, loading, error } = useQuery(
    GET_GITHUB_USER_DETAILS,
    { variables: { login } }
  );
  // console.log(data);
  console.log(data);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header image={data.gitHubUser.avatar} email={data.gitHubUser.email}>
        {data.gitHubUser.login}
        <UpLink
          to={"/"}
          style={{
            backgroundImage: backgroundImageFormat(upArrow),
          }}>
        </UpLink>
      </Header>

      <GitHubUserDetail {...data.gitHubUser} />
    </Fragment>
  );
}
