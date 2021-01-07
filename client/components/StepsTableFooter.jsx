import React from 'react';
import ModalStep from './ModalStep.jsx';

const StepsTableFooter = ({
  state,
  stepsTracker,
  setUpdateState,
  showModalStep,
  setShowModalStep,
}) => {
  return (
    <tfoot>
      <tr>
        <td colSpan="7">
          {showModalStep.action ? (
            <ModalStep
              setShowModalStep={setShowModalStep}
              action={showModalStep.action}
              currentStep={
                showModalStep.action === 'edit'
                  ? stepsTracker[showModalStep.id]
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
