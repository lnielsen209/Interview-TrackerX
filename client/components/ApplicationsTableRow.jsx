import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationsTableRow = ({
  idx,
  dashboardTableRow,
  appData,
  setShowModal,
  removeApplications,
}) => {
  const appStatusLabel = {
    1: 'Not Applied',
    2: 'Applied',
    3: 'Phone Screening',
    4: 'Technical Interview',
    5: 'Interviewing',
    6: 'Offer Received',
    7: 'Offer Accepted',
    8: 'Offer Rejected',
    9: 'Application Rejected',
    10: 'Not Interested',
  };

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

  return (
    <tr key={id}>
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
      <td>{appStatusLabel[app_status]}</td>
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

        <Link
          to={{
            pathname: `/application/${id}/step`,
            state: { application: appData[idx] },
          }}
        >
          <button src="step" className="editStep">
            View progress
          </button>
        </Link>
      </td>
    </tr>
  );
};
export default ApplicationsTableRow;
