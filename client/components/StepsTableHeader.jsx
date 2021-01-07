import React from 'react';

const StepsTableHeader = () => {
  const headerElement = [
    'Date',
    'Progress',
    'Contact Name',
    'Contact Role',
    'Contact Method',
    'Notes',
    'Modify',
  ];

  const tableHeader = headerElement.map((key, idx) => <th key={idx}>{key}</th>);

  return (
    <thead>
      <tr>{tableHeader}</tr>
    </thead>
  );
};

export default StepsTableHeader;
