import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import ApplicationsTableHeader from './ApplicationsTableHeader.jsx';
import ApplicationsTableRows from './ApplicationsTableRows.jsx';
import ApplicationsTableFooter from './ApplicationsTableFooter.jsx';
import axios from 'axios';

const ApplicationsTable = () => {
  const [appData, setAppData] = useState([]);
  const [showModal, setShowModal] = useState({ action: null, id: null }); // none / edit /add
  const [updateState, setUpdateState] = useState(true);

  const auth = useAuth();
    const history = useHistory();


  // get the users data from the DB
  useEffect(() => {
    if (updateState) fetchApplications();
  }, [updateState]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/user/${auth.user.id}/application`);
      setAppData(res.data.userData);
      setUpdateState(false);
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/');
      }
      console.log(
        'Error in fetchApplications of DashboardTable component:',
        error.response.data.err
      );
    }
  };

  //Delete application from the DB
  const removeApplications = async (id) => {
    try {
      const res = await axios.delete(`/user/${auth.user.id}/application/${id}`);
      setUpdateState(true);
    } catch (error) {
       if (error.response.status === 401) {
         history.push('/');
       }
      console.log(
        'Error in removeApplications of DashboardTable component:',
        error.response.data.err
      );
    }
  };

  return (
    <div>
      <table id="tracker">
        <ApplicationsTableHeader />
        <ApplicationsTableRows
          appData={appData}
          setShowModal={setShowModal}
          removeApplications={removeApplications}
        />
        <ApplicationsTableFooter
          appData={appData}
          showModal={showModal}
          setShowModal={setShowModal}
          setUpdateState={setUpdateState}
        />
      </table>
    </div>
  );
};

export default ApplicationsTable;
