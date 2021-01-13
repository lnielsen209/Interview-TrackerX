import styled from 'styled-components';

const StyledFormLabel = styled.p`
  font-size: 18px;
  line-height: 24px;
  opacity: ${({ light }) => (light ? '65%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export { StyledFormLabel };
