import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { useAuth } from '../routes/useAuth';
=======
import { UserContext } from '../index';
>>>>>>> Stashed changes
import ApplicationsTable from './ApplicationsTable.jsx';
import SignoutButton from './SignoutButton';

const DashboardContainer = () => {
<<<<<<< Updated upstream
   const auth = useAuth();
=======
  const context = useContext(UserContext);
  console.log("context.user.id", context.user.id)
>>>>>>> Stashed changes

  return (
    <>
      <h2 id="title">Applications Dashboard</h2>
      <div className="tableContainer">
        {auth.user.id ? (
          <>
            <ApplicationsTable />
            <SignoutButton />
          </>
        ) : (
          <p>
            Login first <Link to="/">here</Link>
          </p>
        )}
      </div>
    </>
  );
};
export default DashboardContainer;
