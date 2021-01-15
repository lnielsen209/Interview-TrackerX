import React from 'react';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledFormPWDInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
  StyledIcon,
  StyledSpinner,
  StyledTable,
  StyledTableWrapper,
  StyledTd,
  StyledTh,
  StyledTr,
} from '../../../common';

const StepsTd = styled(StyledTd)``;
const StepsTh = styled(StyledTh)`
  opacity: 1;
`;
const StepsTr = styled(StyledTr)``;

const StepsTableHeader = () => {
  const headerElement = [
    'Date',
    'Progress',
    'Contact Name',
    'Contact Role',
    'Contact Method',
    'Notes',
    'Modify',
  ];

  const tableHeader = headerElement.map((key, idx) => (
    <StepsTh key={idx}>{key}</StepsTh>
  ));

  return (
    <thead>
      <StepsTr>{tableHeader}</StepsTr>
    </thead>
  );
};

export default StepsTableHeader;
