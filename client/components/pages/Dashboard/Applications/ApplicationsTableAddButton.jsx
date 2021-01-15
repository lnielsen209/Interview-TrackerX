import React from 'react';
import ApplicationsModal from './ApplicationsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledIcon } from '../../../common';

const I = styled(StyledIcon)`
  margin-top: 20px;
`;

const ApplicationsTableAddButton = ({
  appData,
  showModal,
  setShowModal,
  setUpdateState,
}) => {
  return (
    <div>
      {showModal.action ? (
        <ApplicationsModal
          setShowModal={setShowModal}
          setUpdateState={setUpdateState}
          action={showModal.action}
          currentApp={showModal.action === 'edit' ? appData[showModal.id] : {}}
        />
      ) : (
        <I
          onClick={() => setShowModal({ action: 'add', id: null })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </I>
      )}
    </div>
  );
};

export default ApplicationsTableAddButton;
