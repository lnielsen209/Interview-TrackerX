import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StepsTable from '../Steps/StepsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
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

const I = styled(StyledIcon)``;
const AppTd = styled(StyledTd)``;
const AppTh = styled(StyledTh)``;
const AppTr = styled(StyledTr)`
  .hide-ID-col {
    display: none;
  }

  #notes-column {
    max-width: 300px;
  }
`;

const ApplicationsTableRow = ({
  idx,
  dashboardTableRow,
  setShowModal,
  removeApplications,
}) => {
  const {
    id,
    company,
    job_title,
    how_applied,
    url,
    date_applied,
    location,
    found_by,
    notes,
    app_status,
  } = dashboardTableRow;

  const [showSteps, setShowSteps] = useState(false);

  return (
    <>
      <AppTr
        key={id}
        onClick={(e) =>
          e.target.tagName === 'TD' ? setShowSteps(!showSteps) : null
        }
      >
        <AppTd className="hide-ID-col">{id}</AppTd>
        <AppTd>{company}</AppTd>
        <AppTd>{job_title}</AppTd>
        <AppTd>{location}</AppTd>
        <AppTd className="low-priority-col">{found_by}</AppTd>
        <AppTd className="low-priority-col">{how_applied}</AppTd>
        <AppTd className="low-priority-col">
          {new Date(date_applied).toLocaleDateString('en-US')}
        </AppTd>
        <AppTd>{url}</AppTd>
        <AppTd className="low-priority-col" id="notes-column">
          {notes}
        </AppTd>
        <AppTd>{app_status}</AppTd>
        <AppTd>
          <I onClick={() => setShowModal({ action: 'edit', id: idx })}>
            <FontAwesomeIcon icon={faPen} />
          </I>
          <I onClick={() => removeApplications(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </I>
        </AppTd>
      </AppTr>
      <CSSTransition
        in={showSteps}
        timeout={500}
        classNames="showSteps"
        unmountOnExit
      >
        <AppTr>
          <AppTd colSpan={10}>
            <StepsTable app={dashboardTableRow} />
          </AppTd>
        </AppTr>
      </CSSTransition>
    </>
  );
};
export default ApplicationsTableRow;
