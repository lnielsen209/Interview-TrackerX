import styled from 'styled-components';
import { Theme } from '../../style/Theme';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${Theme.secondary};
  border-radius: 4px;
  width: 400px;
  margin: 36px;
  padding: 36px;
`;

export { StyledFormWrapper };
