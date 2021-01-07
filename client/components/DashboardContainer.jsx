import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import SignoutButton from './SignoutButton';
import DashboardTableHeader from './DashboardTableHeader.jsx';
import DashboardTableRows from './DashboardTableRows.jsx';
import DashboardTableFooter from './DashboardTableFooter.jsx';

const Dashboard = () => {
  const [tracker, setTracker] = useState([]);
  const [showModal, setShowModal] = useState({ action: null, id: null }); // none / edit /add
  const [updateState, setUpdateState] = useState(true);

  const context = useContext(UserContext);
  console.log('context user', context.user.id);

  const fetchApplications = async () => {
    const resp = await fetch(`/user/${context.user.id}/application`, {
      method: 'GET',
      headers: { 'content-type': 'application/JSON' },
    });
    const data = await resp.json();
    setTracker(data);
    setUpdateState(false);
  };

  // get the users data from the DB
  useEffect(() => {
    if (updateState) fetchApplications();
  }, [updateState]);

  //Delete application from the DB
  const removeApplications = (id) => {
    fetch(`/user/${context.user.id}/application/${id}`, {
      method: 'DELETE',

      headers: {
        'content-type': 'application/JSON',
      },
    }).then((res) => {
      setUpdateState(true);
    });
  };

  return (
    <>
      <h2 id="title">Applications Dashboard</h2>
      <div className="tableContainer">
        {context.user.id ? (
          <div>
            <table id="tracker">
              <DashboardTableHeader />
              <DashboardTableRows
                tracker={tracker}
                setShowModal={setShowModal}
                removeApplications={removeApplications}
              />
              <DashboardTableFooter
                tracker={tracker}
                showModal={showModal}
                setShowModal={setShowModal}
                setUpdateState={setUpdateState}
              />
            </table>
          </div>
        ) : (
          <p>
            Login first <Link to="/">here</Link>
          </p>
        )}
      </div>
      <SignoutButton />
    </>
  );
};
export default Dashboard;
