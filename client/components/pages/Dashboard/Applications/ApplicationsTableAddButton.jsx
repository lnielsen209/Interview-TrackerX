import React from 'react';
import ApplicationsModal from './ApplicationsModal';
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
        <i
          className="addButtonApp"
          onClick={() => setShowModal({ action: 'add', id: null })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </i>
      )}
    </div>
  );
};

export default ApplicationsTableAddButton;
