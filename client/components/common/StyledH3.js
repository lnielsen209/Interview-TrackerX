import styled from 'styled-components';

const StyledH3 = styled.h3`
  font-weight: 500;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  opacity: ${({ light }) => (light ? '75%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export { StyledH3 };
