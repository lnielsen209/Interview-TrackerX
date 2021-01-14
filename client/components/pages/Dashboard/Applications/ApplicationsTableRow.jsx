import React, { useState } from 'react';
import StepsTable from '../Steps/StepsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { StyledIcon } from '../../../common';

const I = styled(StyledIcon)``;

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
      <tr
        key={id}
        onClick={(e) =>
          e.target.tagName === 'TD' ? setShowSteps(!showSteps) : null
        }
      >
        <td id="hide-ID-col">{id}</td>
        <td>{company}</td>
        <td>{job_title}</td>
        <td>{location}</td>
        <td className="low-priority-col">{found_by}</td>
        <td className="low-priority-col">{how_applied}</td>
        <td className="low-priority-col" id="date-column">
          {new Date(date_applied).toLocaleDateString('en-US')}
        </td>
        <td>{url}</td>
        <td className="low-priority-col" id="notes-column">
          {notes}
        </td>
        <td>{app_status}</td>
        <td>
          <I onClick={() => setShowModal({ action: 'edit', id: idx })}>
            <FontAwesomeIcon icon={faPen} />
          </I>
          <I onClick={() => removeApplications(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </I>
        </td>
      </tr>
      <CSSTransition
        in={showSteps}
        timeout={500}
        classNames="showSteps"
        unmountOnExit
      >
        <tr className="stepsTableBackground">
          <td colSpan={10}>
            <StepsTable app={dashboardTableRow} />
          </td>
        </tr>
      </CSSTransition>
    </>
  );
};
export default ApplicationsTableRow;
