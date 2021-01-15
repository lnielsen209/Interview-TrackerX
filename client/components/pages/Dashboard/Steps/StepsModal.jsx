import React, { useState } from 'react';
import { useAuth } from '../../../../routes/useAuth';
import axios from 'axios';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledButton,
  StyledH1,
  StyledModelForm,
  StyledModelInnerWrapper,
  StyledModelOuterWrapper,
} from '../../../common';
import { Theme } from '../../../../style/Theme';

const ModelOuterWrapper = styled(StyledModelOuterWrapper)``;

const ModelInnerWrapper = styled(StyledModelInnerWrapper)`
  height: 65%;
`;

const ModelForm = styled(StyledModelForm)``;

const H1 = styled(StyledH1)`
  margin-bottom: 8px;
`;

const ModelLabel = styled(StyledFormLabel)`
  color: ${Theme.primary};
  opacity: 80%;
  line-height: 16px;
`;

const ModelInput = styled(StyledFormInput)`
  height: 36px;
  width: 100%;
`;

const ModelSelect = styled(StyledFormInput)`
  height: 36px;
  width: 100%;
  padding: 0px 10px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ModelButton = styled(StyledButton)`
  background: ${Theme.background};
  margin: 0px 10px;
`;

const StepsModal = ({
  setShowModalStep,
  action,
  currentStep,
  appId,
  setUpdateState,
}) => {
  const modalTitle = {
    add: 'Add new step',
    edit: 'Edit step',
  };

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
    <ModelOuterWrapper>
      <ModelInnerWrapper>
        <H1 center>{modalTitle[action]}</H1>
        <ModelForm>
          <ModelLabel>Date </ModelLabel>
          <ModelInput
            type="date"
            value={date.slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <ModelLabel>Progess </ModelLabel>
          <ModelInput
            type="text"
            placeholder="e.g. interview, screening, offer"
            value={step_type}
            onChange={(e) => setStepType(e.target.value)}
            required
          />
          <ModelLabel>Contact Name </ModelLabel>
          <ModelInput
            type="text"
            value={contact_name}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
          <ModelLabel>Contact Role </ModelLabel>
          <ModelInput
            type="text"
            placeholder="e.g. HR representative, manager"
            value={contact_role}
            onChange={(e) => setContractRole(e.target.value)}
            required
          />
          <ModelLabel>Contact </ModelLabel>
          <ModelInput
            type="text"
            placeholder="e.g. phone number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <ModelLabel>Notes </ModelLabel>
          <ModelInput
            type="text"
            value={notes}
            onChange={(e) => setNote(e.target.value)}
            required
          />
          <Div>
            <ModelButton
              secondary
              small
              onClick={() => setShowModalStep({ action: null, id: null })}
            >
              Cancel
            </ModelButton>

            <ModelButton secondary small type="submit" onClick={handleSubmit}>
              Save
            </ModelButton>
          </Div>
        </ModelForm>
      </ModelInnerWrapper>
    </ModelOuterWrapper>
  );
};

export default StepsModal;
