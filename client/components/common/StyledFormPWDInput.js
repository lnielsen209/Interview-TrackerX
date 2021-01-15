import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../style/Theme';
import { StyledFormInput } from './StyledFormInput';

const StyledPWDInputWrapper = styled.div`
  display: flex;
`;

const StyledPWDInput = styled(StyledFormInput)`
  width: 80%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ToggleButton = styled.div`
  background: ${Theme.secondary};
  color: ${Theme.color};
  opacity: 75%;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  height: 48px;
  width: 350px;
  border-radius: 4px;
  border: 1px solid ${Theme.color};
  padding: 10px;
  margin: 8px 0px 16px 0px;
  width: 20%;
  box-sizing: border-box;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 0.167s;

  &:hover {
    box-shadow: rgb(200, 200, 200) 0px 0px 0px 1px inset;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledFormPWDInput = (props) => {
  const [type, setType] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    setType((type) => (type === 'password' ? 'text' : 'password'));
    setShowPassword(!showPassword);
    inputRef.current.focus();
  };

  useEffect(() => {
    // Stop cursor from jumping to the beginning of input. Moving cursor to the end of input after the input node focus in handle click
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  }, [type]);

  return (
    <>
      <StyledPWDInputWrapper>
        <StyledPWDInput {...props} type={type} ref={inputRef} />
        <ToggleButton onClick={handleClick}>
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      </StyledPWDInputWrapper>
    </>
  );
};

export { StyledFormPWDInput };
