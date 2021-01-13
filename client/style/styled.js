import styled from 'styled-components';
import { theme } from '../style/theme';

export const H1 = styled.h1`
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 200;
  line-height: 50px;
  color: ${theme.primary};
`;

export const PLeft = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  opacity: 60%;
  text-align: left;
`;

export const PCenter = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  opacity: 60%;
  text-align: center;
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${theme.secondary};
  border-radius: 4px;
  width: 400px;
  margin: 36px;
  padding: 24px;
`;

export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${theme.secondary};
  border-radius: 4px;
  width: 400px;
  margin: 36px;
  padding: 24px;
`;

export const Input = styled.input`
  background: ${theme.secondary};
  color: ${theme.color};
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
  height: 48px;
  width: 352px;
  border-radius: 4px;
  border: 1px solid ${theme.color};
  padding: 10px;
  margin: 16px 0px;
  cursor: text;

  &:hover {
    box-shadow: rgb(0, 115, 177) 0px 0px 0px 1px;
  }
`;
