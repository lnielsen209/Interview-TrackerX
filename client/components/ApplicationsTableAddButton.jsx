import React from 'react';
import ApplicationsModal from './ApplicationsModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
        <button onClick={() => setShowModal({ action: 'add', id: null })}>
          <FontAwesomeIcon icon={faPlus} />
          Add new application
        </button>
      )}
    </div>
  );
};

export default ApplicationsTableAddButton;
