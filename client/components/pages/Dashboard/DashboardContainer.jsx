import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import ApplicationsTable from './Applications/ApplicationsTable';

const DashboardContainer = () => {
   const auth = useAuth();

  return (
    <>
      <h2 id="title">Applications Dashboard</h2>
      <div className="tableContainer">
        {auth.user.id ? (
          <>
            <ApplicationsTable />
          </>
        ) : (
          <p>
            Login first <Link to="/login">here</Link>
          </p>
        )}
      </div>
    </>
  );
};
export default DashboardContainer;
