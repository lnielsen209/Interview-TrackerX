import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const ModelInnerWrapper = styled(StyledModelInnerWrapper)``;

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

const ApplicationsModal = ({
  setShowModal,
  action,
  currentApp,
  setUpdateState,
}) => {
  const modalTitle = {
    add: 'Add new application',
    edit: 'Edit application',
  };

  const [job_title, setJobTitle] = useState(currentApp.job_title || '');
  const [company, setCompany] = useState(currentApp.company || '');
  const [how_applied, setHowApplied] = useState(currentApp.how_applied || '');
  const [date_applied, setDateApplied] = useState(
    currentApp.date_applied || ''
  );
  const [location, setLocation] = useState(currentApp.location || '');
  const [url, setUrl] = useState(currentApp.url || '');
  const [found_by, setFoundBy] = useState(currentApp.found_by || '');
  const [notes, setNotes] = useState(currentApp.notes || '');
  const [app_status, setAppStatus] = useState(currentApp.app_status || '');

  const auth = useAuth();
  const history = useHistory();

  const addApplication = async (body) => {
    try {
      const res = await axios.post(`/user/${auth.user.id}/application`, body);

      // console.log('new application added');
      setShowModal({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      // console.log('error.response.status ===> ', error.response.status);
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in addApplication of ApplicationsModel component: ',
        error.response.data.err
      );
    }
  };

  const editApplication = async (body) => {
    try {
      const res = await axios.put(
        `/user/${auth.user.id}/application/${currentApp.id}`,
        body
      );

      // console.log('new application edited');
      setShowModal({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in editApplication of ApplicationsModel component: ',
        error.response.data.err
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      job_title,
      company,
      how_applied,
      date_applied,
      url,
      location,
      found_by,
      notes,
      app_status,
    };

    if (action === 'edit') {
      editApplication(body);
    } else {
      addApplication(body);
    }
  };

  // console.log('currentapp ===> ', currentApp);
  return (
    <ModelOuterWrapper>
      <ModelInnerWrapper>
        <H1 center>{modalTitle[action]}</H1>
        <ModelForm>
          <ModelLabel>Company</ModelLabel>
          <ModelInput
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <ModelLabel>Position</ModelLabel>
          <ModelInput
            type="text"
            value={job_title}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <ModelLabel>How I applied </ModelLabel>
          <ModelInput
            type="text"
            placeholder="e.g. email, company website, Glassdoor,..."
            value={how_applied}
            onChange={(e) => setHowApplied(e.target.value)}
            required
          />
          <ModelLabel>Date applied </ModelLabel>
          <ModelInput
            type="date"
            value={date_applied.slice(0, 10)}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
          <ModelLabel>Location </ModelLabel>
          <ModelInput
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <ModelLabel>URL </ModelLabel>
          <ModelInput
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <ModelLabel>Found by </ModelLabel>
          <ModelInput
            type="text"
            placeholder="e.g. recruiter/agency, linkedIn, Google,..."
            value={found_by}
            onChange={(e) => setFoundBy(e.target.value)}
            required
          />
          <ModelLabel>Notes </ModelLabel>
          <ModelInput
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
          <ModelLabel>App Status</ModelLabel>
          <ModelSelect
            as="select"
            value={app_status}
            onChange={(e) => setAppStatus(e.target.value)}
            required
          >
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
            <option value="Phone Screening">Phone Screening</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Offer Accepted">Offer Accepted</option>
            <option value="Offer Rejected">Offer Rejected</option>
            <option value="Application Rejected">Application Rejected</option>
            <option value="Not Interested">Not Interested</option>
          </ModelSelect>
          <Div>
            <ModelButton
              secondary
              small
              onClick={() => setShowModal({ action: null, id: null })}
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

export default ApplicationsModal;
