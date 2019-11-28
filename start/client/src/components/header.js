import React from 'react';
import styled from 'react-emotion';
import { size } from 'polished';

import { unit, colors } from '../styles';
import githubImage from '../assets/images/gitHub-mark.png';

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97

function pickAvatar() {
  return githubImage;
}

export default function Header({ image, children = 'GitHub Explorer', email = '' }) {
  const avatar = image || pickAvatar();
  return (
    <Container>
      <Image round={!image} src={avatar} alt="Github" />
      <div>
        <h2>{children}</h2>
        <Subheading>{email}</Subheading>
      </div>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: unit * 4.5,
});

const Image = styled('img')(size(134), props => ({
  marginRight: unit * 2.5,
  borderRadius: props.round && '50%',
}));

const Subheading = styled('h5')({
  marginTop: unit / 2,
  color: colors.textSecondary,
});
