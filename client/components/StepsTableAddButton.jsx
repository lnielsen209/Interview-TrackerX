import React from 'react';
import StepsModal from './StepsModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
        <i
          className="addButtonStep"
          onClick={() => setShowModalStep({ action: 'add', id: null })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </i>
      )}
    </div>
  );
};

export default StepsTableAddButton;
