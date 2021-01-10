import React from 'react';
import ApplicationsModal from './ApplicationsModal.jsx';

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
          Add new application
        </button>
      )}
    </div>
  );
};

export default ApplicationsTableAddButton;
