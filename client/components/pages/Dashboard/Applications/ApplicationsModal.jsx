import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../routes/useAuth';
import axios from 'axios';

const modalTitle = {
  add: 'Add new application',
  edit: 'Edit application',
};

const ApplicationsModal = ({
  setShowModal,
  action,
  currentApp,
  setUpdateState,
}) => {
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
        history.push('/login');
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
        history.push('/login');
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
    <div id="div3" className="modalWrapper">
      <div className="modalBackground">
        <h2>{modalTitle[action]}</h2>
        <form id="list" className="modalForm">
          <label>
            Company
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
          <label>
            Position
            <input
              type="text"
              value={job_title}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </label>

          <label>
            How I applied
            <input
              type="text"
              placeholder="e.g. email, company website, Glassdoor,..."
              value={how_applied}
              onChange={(e) => setHowApplied(e.target.value)}
              required
            />
          </label>
          <label>
            Date applied
            <input
              type="date"
              value={date_applied.slice(0, 10)}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Found by
            <input
              type="text"
              placeholder="e.g. recruiter/agency, linkedIn, Google,..."
              value={found_by}
              onChange={(e) => setFoundBy(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </label>
          <label>
            App Status
            <select
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
            </select>
          </label>
          <div className="modalButtonWrapper">
            <button
              className="modalButton"
              onClick={() => setShowModal({ action: null, id: null })}
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

export default ApplicationsModal;
