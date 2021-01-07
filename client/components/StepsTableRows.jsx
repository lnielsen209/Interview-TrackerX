import React from 'react';
import StepsTableRow from './StepsTableRow';

const StepsTableRows = ({ stepData, setShowModalStep, removeStep }) => {
  const tableBody = stepData.map((stepsTableRow, idx) => (
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
