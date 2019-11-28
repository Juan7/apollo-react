import React from 'react';
import styled from 'react-emotion';
import { Link } from '@reach/router';

import upArrow from '../assets/images/up-arrow-2.png';
import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './github-users-tile';

const GitHubUserDetail = ({
    id,
    login,
    avatar,
    url,
    name,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    public_repos,
    public_gists,
    followers }) => (
  <Card
    style={{
      background: "#81C784",
    }}
  >
    <h3>Name: {name}</h3>
    <h4>Company: {company}</h4>
    <h4>Blog: {blog}</h4>
    <h4>Location: {location}</h4>
    <h4>Public Repositories: {public_repos}</h4>
    <h4>Followers: {followers}</h4>
    <h4>Bio: {bio}</h4>
    <RepositoriesLink
      to={`/user/${login}/repositories`}>
        Repositories
    </RepositoriesLink>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

const RepositoriesLink = styled(Link)(cardClassName, {
  display: 'contents',
  width: 15,
  height: 15,
});

export default GitHubUserDetail;
