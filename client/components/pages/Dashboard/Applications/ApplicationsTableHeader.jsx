import React from 'react';

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
        <th key={idx} className="low-priority-col">
          {key}
        </th>
      );
    } else return <th key={idx}>{key}</th>;
  });

  return (
    <thead>
      <tr>{tableHeader}</tr>
    </thead>
  );
};

export default ApplicationsTableHeader;
