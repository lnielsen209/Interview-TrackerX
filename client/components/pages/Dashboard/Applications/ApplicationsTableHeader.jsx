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

const AppTd = styled(StyledTd)``;
const AppTh = styled(StyledTh)``;
const AppTr = styled(StyledTr)`
  .hide-ID-col {
    display: none;
  }
`;

const ApplicationsTableHeader = () => {
  const headerElement = [
    'Company',
    'Position',
    'Location',
    'Found by',
    'Applied via',
    'Date applied',
    'URL',
    'Notes',
    'Status',
    'Modify',
  ];

  const tableHeader = headerElement.map((key, idx) => {
    if (
      key === 'Found by' ||
      key === 'Applied via' ||
      key === 'Date applied' ||
      key === 'Notes'
    ) {
      return (
        <AppTh key={idx} className="low-priority-col">
          {key}
        </AppTh>
      );
    } else return <AppTh key={idx}>{key}</AppTh>;
  });

  return (
    <thead>
      <AppTr>{tableHeader}</AppTr>
    </thead>
  );
};

export default ApplicationsTableHeader;
