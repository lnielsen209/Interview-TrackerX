import React from 'react';
import StepsModal from './StepsModal.jsx';

const StepsTableFooter = ({
  stepData,
  setUpdateState,
  showModalStep,
  setShowModalStep,
  app,
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
              appId={app.id}
              setUpdateState={setUpdateState}
            />
          ) : (
            <button
              onClick={() => setShowModalStep({ action: 'add', id: null })}
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
