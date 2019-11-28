import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Button from './button';
import space from '../assets/images/space.jpg';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Curve } from '../assets/curve.svg';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { colors, unit } from '../styles';

export default class SearchForm extends Component {
  state = { query: '' };

  onChange = event => {
    const query = event.target.value;
    this.setState(s => ({ query }));
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.search({ variables: { query: this.state.query } });
  };

  render() {
    return (
      <Container>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledInput
            required
            type="text"
            name="query"
            placeholder="Search users..."
            data-testid="login-input"
            onChange={this.onChange}
          />
          <Button type="submit">Search</Button>
        </StyledForm>
      </Container>
    );
  }
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: 'white',
  backgroundColor: colors.primary,
  backgroundImage: `url(${space})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledForm = styled('form')({
  width: '100%',
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
  color: colors.text,
  backgroundColor: 'white',
});

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
