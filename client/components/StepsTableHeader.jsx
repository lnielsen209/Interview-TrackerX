import React from 'react';

const StepsTableHeader = () => {
  //this is the header
  //Operation is for Edit and Delete functionality
  const renderHeader = () => {
    let headerElement = [
      'Date',
      'Progress',
      'Contact Name',
      'Contact Role',
      'Contact Method',
      'Notes',
      'Modify',
    ];

    //now we will map over these values and output as th
    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  return (
    <thead>
      <tr>{renderHeader()}</tr>
    </thead>
  );
};

export default StepsTableHeader;
