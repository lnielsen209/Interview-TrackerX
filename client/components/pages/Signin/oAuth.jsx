import React from 'react';

import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledButton,
  StyledH1,
  StyledModelForm,
  StyledModelInnerWrapper,
  StyledModelOuterWrapper,
} from '../../common';
import { Theme } from '../../../style/Theme';

const OAuthButton = styled(StyledButton)`
  width: 50%;
`;

const oAuth = () => {
  return (
    <div>
      <OAuthButton>
        <a href="/auth/google">Signin with Google</a>
      </OAuthButton>
      <OAuthButton>
        <a href="/auth/github">Signin with Github</a>
      </OAuthButton>
    </div>
  );
};

export default oAuth;
