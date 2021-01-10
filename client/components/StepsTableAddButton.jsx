import React from 'react';
import StepsModal from './StepsModal.jsx';

const StepsTableAddButton = ({
  stepData,
  setUpdateState,
  showModalStep,
  setShowModalStep,
  app,
}) => {
  return (
    <div>
      {showModalStep.action ? (
        <StepsModal
          setShowModalStep={setShowModalStep}
          action={showModalStep.action}
          currentStep={
            showModalStep.action === 'edit' ? stepData[showModalStep.id] : {}
          }
          appId={app.id}
          setUpdateState={setUpdateState}
        />
      ) : (
        <button onClick={() => setShowModalStep({ action: 'add', id: null })}>
          Add new step
        </button>
      )}
    </div>
  );
};

export default StepsTableAddButton;
