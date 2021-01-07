import React from 'react';
import StepsTableRow from './StepsTableRow';

const StepsTableRows = ({ stepsTracker, setShowModalStep, removeStep }) => {
  const tableBody = stepsTracker.map((stepsTableRow, idx) => (
    <StepsTableRow
      key={`stepsTableRow-${idx}`}
      idx={idx}
      stepsTableRow={stepsTableRow}
      setShowModalStep={setShowModalStep}
      removeStep={removeStep}
    />
  ));

  return <tbody>{tableBody}</tbody>;
};

export default StepsTableRows;
