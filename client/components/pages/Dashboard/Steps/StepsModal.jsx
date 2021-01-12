import React, { useState } from 'react';
import { useAuth } from '../../../../routes/useAuth';
import axios from 'axios';

const modalTitle = {
  add: 'Add new step',
  edit: 'Edit step',
};

const StepsModal = ({
  setShowModalStep,
  action,
  currentStep,
  appId,
  setUpdateState,
}) => {
  const [date, setDate] = useState(currentStep.date || '');
  const [step_type, setStepType] = useState(currentStep.step_type || '');
  const [contact_name, setContactName] = useState(
    currentStep.contact_name || ''
  );
  const [contact_role, setContractRole] = useState(
    currentStep.contact_role || ''
  );
  const [contact, setContact] = useState(currentStep.contact || '');
  const [notes, setNote] = useState(currentStep.notes || '');

  const auth = useAuth();
  // console.log('appID ===> ', appId);

  const addStep = async (body) => {
    try {
      const res = await axios.post(
        `/user/${auth.user.id}/application/${appId}/step`,
        body
      );

      // console.log('new step added');
      setShowModalStep({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      // console.log('error.response.status ===> ', error.response.status);
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in addStep of StepsModel component: ',
        error.response.data.err
      );
    }
  };

  const editStep = async (body) => {
    try {
      const res = await axios.put(
        `/user/${auth.user.id}/application/${appId}/step/${currentStep.id}`,
        body
      );
      setShowModalStep({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in editStep of StepsModel component: ',
        error.response.data.err
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      appId,
      date,
      step_type,
      contact_name,
      contact_role,
      contact,
      notes,
    };

    if (action === 'edit') {
      editStep(body);
    } else {
      addStep(body);
    }
  };

  return (
    <div id="div3" className="modalWrapper">
      <div className="modalBackground">
        <h2>{modalTitle[action]}</h2>
        <form id="list" className="modalForm">
          <label>
            Date
            <input
              type="date"
              value={date.slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Progess
            <input
              type="text"
              placeholder="e.g. interview, screening, offer"
              value={step_type}
              onChange={(e) => setStepType(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Name
            <input
              type="text"
              value={contact_name}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Role
            <input
              type="text"
              placeholder="e.g. HR representative, manager"
              value={contact_role}
              onChange={(e) => setContractRole(e.target.value)}
              required
            />
          </label>
          <label>
            Contact
            <input
              type="text"
              placeholder="e.g. phone number or email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <input
              type="text"
              value={notes}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </label>
          <div className="modalButtonWrapper">
            <button
              className="modalButton"
              onClick={() => setShowModalStep({ action: null, id: null })}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modalButton"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepsModal;
