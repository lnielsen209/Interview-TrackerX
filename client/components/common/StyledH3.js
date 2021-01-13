import styled from 'styled-components';

const StyledH3 = styled.h3`
  font-weight: 400;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  opacity: ${({ light }) => (light ? '80%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export { StyledH3 };
