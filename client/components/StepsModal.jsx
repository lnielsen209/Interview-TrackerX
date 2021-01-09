import React, { useState } from 'react';
import { useAuth } from '../routes/useAuth';

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
  console.log('appID', appId);

  const addStep = (body) => {
    fetch(`/user/${auth.user.id}/application/${appId}/step`, {
      method: 'POST',

      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        data.json();
        console.log('new step added');
        setShowModalStep({ action: null, id: null });
        setUpdateState(true); // add from Lee
      })
      .catch((error) =>
        console.log('addStep ERROR: ', error.response.data.err)
      );
  };

  const editStep = (body) => {
    fetch(`/user/${auth.user.id}/application/${appId}/step/${currentStep.id}`, {
      method: 'PUT',

      headers: {
        'content-type': 'application/JSON',
      },
      body: JSON.stringify(body),
    }).then((data) => {
      data.json();
      console.log(`step updated`);
      setShowModalStep({ action: null, id: null });
      setUpdateState(true); // add from Lee
    });
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
    <div id='div3' className='modalWrapper'>
      <div className='modalBackground'>
        <h2>{modalTitle[action]}</h2>
        <form id='list' className='modalForm'>
          <label>
            Date
            <input
              type='date'
              id='date'
              value={date.slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Progess
            <input
              type='text'
              placeholder='e.g. interview, screening, offer'
              id='step_type'
              value={step_type}
              onChange={(e) => setStepType(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Name
            <input
              type='text'
              // placeholder="contact information"
              id='contact_name'
              value={contact_name}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Role
            <input
              type='text'
              placeholder='e.g. HR representative, manager'
              id='contact_role'
              value={contact_role}
              onChange={(e) => setContractRole(e.target.value)}
              required
            />
          </label>
          <label>
            Contact
            <input
              type='text'
              placeholder='e.g. phone number or email'
              id='contact'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <input
              type='text'
              // placeholder="notes"
              id='notes'
              value={notes}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </label>
          <div className='modalButtonWrapper'>
            <button
              className='modalButton'
              onClick={() => setShowModalStep({ action: null, id: null })}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='modalButton'
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
