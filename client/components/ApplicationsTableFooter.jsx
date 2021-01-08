import React from 'react';
import ApplicationsModal from './ApplicationsModal.jsx';

const ApplicationsTableFooter = ({
  appData,
  showModal,
  setShowModal,
  setUpdateState,
}) => {
  return (
    <tfoot>
      <tr>
        <td colSpan="10">
          {showModal.action ? (
            <ApplicationsModal
              setShowModal={setShowModal}
              setUpdateState={setUpdateState}
              action={showModal.action}
              currentApp={
                showModal.action === 'edit' ? appData[showModal.id] : {}
              }
            />
          ) : (
            <button onClick={() => setShowModal({ action: 'add', id: null })}>
              Add new application
            </button>
          )}
        </td>
      </tr>
    </tfoot>
  );
};

export default ApplicationsTableFooter;