import styled, { keyframes } from 'styled-components';
import { Theme } from '../../style/Theme';

const rotation = keyframes`
from {
  transform: rotate(0deg)
}
to{
    transform: rotate(360deg)
}
`;

const StyledSpinner = styled.div`
  height: 160px;
  width: 160px;
  border: 1px solid ${Theme.primary};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

export { StyledSpinner };
