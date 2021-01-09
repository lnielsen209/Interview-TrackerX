import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import ApplicationsTable from './ApplicationsTable.jsx';
import SignoutButton from './SignoutButton';

const DashboardContainer = () => {
  const auth = useAuth();

  return (
    <>
      <h2 id='title'>Applications Dashboard</h2>
      <div className='tableContainer'>
        {auth.user.id ? (
          <>
            <ApplicationsTable />
            <SignoutButton />
          </>
        ) : (
          <p>
            Login first <Link to='/'>here</Link>
          </p>
        )}
      </div>
    </>
  );
};
export default DashboardContainer;
