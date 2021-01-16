import styled from 'styled-components';
import { Theme } from '../../style/Theme';

const StyledIcon = styled.i`
  color: ${Theme.color_light};
  background-color: ${Theme.secondary};
  width: 40px;
  height: 40px;
  align-items: center;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  opacity: 80%;

  &:hover {
    color: ${Theme.color};
    background-color: ${Theme.background};
  }
`;

export { StyledIcon };
