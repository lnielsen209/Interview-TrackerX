import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StepsTable from './StepsTable';

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
      <tr key={id} onClick={() => setShowSteps(!showSteps)}>
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
        <td className="operation">
          <button
            className="deleteButton"
            onClick={() => setShowModal({ action: 'edit', id: idx })}
          >
            Edit
          </button>
          <button className="button" onClick={() => removeApplications(id)}>
            Delete
          </button>
        </td>
      </tr>
      {showSteps && (
        <tr>
          <td colSpan={10}>
            <StepsTable app={dashboardTableRow} />
          </td>
        </tr>
      )}
    </>
  );
};
export default ApplicationsTableRow;
