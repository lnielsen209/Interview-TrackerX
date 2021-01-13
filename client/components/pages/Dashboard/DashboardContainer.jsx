import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import ApplicationsTable from './Applications/ApplicationsTable';
import PageLayout from '../../common/PageLayout';

const DashboardContainer = () => {
  const auth = useAuth();

  return (
    <PageLayout>
      <h2 id='title'>Applications Dashboard</h2>
      <div className='tableContainer'>
        {auth.user.id ? (
          <>
            <ApplicationsTable />
          </>
        ) : (
          <p>
            Sign in first <Link to='/signin'>here</Link>
          </p>
        )}
      </div>
    </PageLayout>
  );
};
export default DashboardContainer;
