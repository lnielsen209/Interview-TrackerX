import React from 'react';
import ApplicationsTableRow from './ApplicationsTableRow.jsx';

const ApplicationsTableRows = ({
  tracker,
  setShowModal,
  removeApplications,
}) => {
  const tableBody = tracker.map((dashboardTableRow, idx) => (
    <ApplicationsTableRow
      key={`dashboardTableRow-${idx}`}
      idx={idx}
      dashboardTableRow={dashboardTableRow}
      tracker={tracker}
      setShowModal={setShowModal}
      removeApplications={removeApplications}
    />
  ));

  return <tbody>{tableBody}</tbody>;
};

export default ApplicationsTableRows;
