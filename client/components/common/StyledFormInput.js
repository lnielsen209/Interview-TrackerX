import styled from 'styled-components';
import { Theme } from '../../style/Theme';

const StyledFormInput = styled.input`
  background: ${Theme.secondary};
  color: ${Theme.color};
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
  height: 48px;
  width: 350px;
  border-radius: 6px;
  border: 1px solid rgba(26, 26, 26, 0.2);
  padding: 10px;
  margin: 8px 0px 16px 0px;
  cursor: text;

  &:hover {
    box-shadow: rgb(200, 200, 200) 0px 0px 0px 1px inset;
  }
`;

export { StyledFormInput };
