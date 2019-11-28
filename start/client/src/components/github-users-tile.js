import React from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';
import { Link } from '@reach/router';

import galaxy from '../assets/images/galaxy.jpg';
import iss from '../assets/images/iss.jpg';
import moon from '../assets/images/moon.jpg';
import { unit } from '../styles';

const backgrounds = [galaxy, iss, moon];
export function getBackgroundImage(id) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

export default ({ gitHubUser }) => {
  const { id, avatar, url, login } = gitHubUser;
  let Image = styled('img')(size(134), props => ({
    marginRight: unit * 2.5,
    borderRadius: props.round && '50%',
  }));
  return (
    <StyledLink
      to={`/user/${login}`}
      style={{
        backgroundImage: getBackgroundImage(id),
      }}
    >
      <Image round="50" src={`${avatar}`} />

      <h3>{login}</h3>
      <h5>{url}</h5>
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
