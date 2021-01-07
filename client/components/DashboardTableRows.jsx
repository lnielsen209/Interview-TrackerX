import React from 'react';
import DashboardTableRow from './DashboardTableRow.jsx';


const DashboardTableRows = ({ tracker, setShowModal, removeApplications }) => {
  const tableBody = tracker.map((dashboardTableRow, idx) => (
    <DashboardTableRow
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

export default DashboardTableRows;
