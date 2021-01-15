import React from 'react';
import StepsModal from './StepsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledIcon } from '../../../common';

const I = styled(StyledIcon)``;

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
        <I
          onClick={() => setShowModalStep({ action: 'add', id: null })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </I>
      )}
    </div>
  );
};

export default StepsTableAddButton;
