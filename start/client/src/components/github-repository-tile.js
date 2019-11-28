import React from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';
import { Link } from '@reach/router';

import { unit } from '../styles';

const backgrounds = ["#ebd4c7", "#93f295", "#f092e7"];
export function getBackgroundColor(id) {
  return `${backgrounds[Number(id) % backgrounds.length]}`;
}

export default ({ gitHubRepository }) => {
  const { id, fullName, url, description } = gitHubRepository;
  return (
    <StyledLink
      to="#"
      style={{
        background: getBackgroundColor(id),
      }}
    >
      <h3>{fullName}</h3>
      <h4>{url}</h4>
      <h4>{description}</h4>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: 'black',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const padding = unit * 2;
const StyledLink = styled(Link)(cardClassName, {
  display: 'block',
  height: 193,
  marginTop: padding,
  textDecoration: 'none',
  ':not(:last-child)': {
    marginBottom: padding * 2,
  },
});
