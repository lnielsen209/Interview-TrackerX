import React from 'react';
import StepsTableRow from './StepsTableRow';

const StepsTableRows = ({ stepsTracker, setShowModalStep, removeStep }) => {
  const renderBody = () => {
    return stepsTracker.map((stepsTableRow, idx) => (
      <StepsTableRow
        key={`stepsTableRow-${idx}`}
        idx={idx}
        stepsTableRow={stepsTableRow}
        setShowModalStep={setShowModalStep}
        removeStep={removeStep}
      />
    ));
  };
  return <tbody>{renderBody()}</tbody>;
};

export default StepsTableRows;
