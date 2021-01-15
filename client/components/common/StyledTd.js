import styled from 'styled-components';
import { Theme } from '../../style/Theme';


const StyledTd = styled.td`
  height: 48px;
  font-size: 18px;
  font-weight: normal;
  line-height: 16px;
  color: ${Theme.color};
  opacity: 80%;
  text-align: center;
  vertical-align: center;
  padding: 10px;
  overflow: auto;
`;

export { StyledTd };
