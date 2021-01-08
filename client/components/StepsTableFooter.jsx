import React from 'react';
import StepsModal from './StepsModal.jsx';

const StepsTableFooter = ({
  state,
  stepData,
  setUpdateState,
  showModalStep,
  setShowModalStep,
}) => {
  return (
    <tfoot>
      <tr>
        <td colSpan="7">
          {showModalStep.action ? (
            <StepsModal
              setShowModalStep={setShowModalStep}
              action={showModalStep.action}
              currentStep={
                showModalStep.action === 'edit'
                  ? stepData[showModalStep.id]
                  : {}
              }
              appId={state.application.id}
              setUpdateState={setUpdateState}
            />
          ) : (
            <button
              onClick={() =>
                setShowModalStep({ action: 'add', id: state.application.id })
              }
            >
              Add new step
            </button>
          )}
        </td>
      </tr>
    </tfoot>
  );
};

export default StepsTableFooter;
