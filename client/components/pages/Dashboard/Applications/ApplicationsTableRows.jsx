import React from 'react';
import ApplicationsTableRow from './ApplicationsTableRow';

const ApplicationsTableRows = ({
  appData,
  setShowModal,
  removeApplications,
}) => {
  const tableBody = appData.map((dashboardTableRow, idx) => (
    <ApplicationsTableRow
      key={`dashboardTableRow-${idx}`}
      idx={idx}
      dashboardTableRow={dashboardTableRow}
      appData={appData}
      setShowModal={setShowModal}
      removeApplications={removeApplications}
    />
  ));

  return <tbody>{tableBody}</tbody>;
};

export default ApplicationsTableRows;
