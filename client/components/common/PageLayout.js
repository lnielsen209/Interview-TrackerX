import React from 'react';
import styled from 'styled-components';
import { MainNav } from '../common/MainNav';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 80vw;
  margin: 10vh auto 0 auto;
  padding: 20;
`;

const PageLayout = ({ children }) => {
  return (
    <>
      <MainNav />
      <Main>{children}</Main>
    </>
  );
};

export default PageLayout;
