import styled from 'styled-components';

const StyledH1 = styled.h1`
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  opacity: ${({ light }) => (light ? '80%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;


export { StyledH1 };