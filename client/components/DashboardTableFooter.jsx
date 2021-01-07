import React from 'react';
import ModalApplication from './ModalApplication.jsx';


const DashboardTableFooter = ({ tracker, showModal, setShowModal, setUpdateState }) => {
  return (
    <tfoot>
      <tr>
        <td colSpan="10">
          {showModal.action ? (
            <ModalApplication
              setShowModal={setShowModal}
              setUpdateState={setUpdateState}
              action={showModal.action}
              currentApp={
                showModal.action === 'edit' ? tracker[showModal.id] : {}
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

export default DashboardTableFooter;
