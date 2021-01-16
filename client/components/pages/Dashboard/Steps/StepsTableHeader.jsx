import React from 'react';
import styled from 'styled-components';
import { StyledTh, StyledTr } from '../../../common';

const StepsTh = styled(StyledTh)``;
const StepsTr = styled(StyledTr)``;

const StepsTableHeader = () => {
  const headerElement = [
    'Date',
    'Progress',
    'Contact Name',
    'Contact Role',
    'Email',
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
