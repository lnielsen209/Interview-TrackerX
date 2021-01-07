import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import DashboardTable from './DashboardTable.jsx';
import SignoutButton from './SignoutButton';

const Dashboard = () => {
  const context = useContext(UserContext);

  return (
    <>
      <h2 id="title">Applications Dashboard</h2>
      <div className="tableContainer">
        {context.user.id ? (
          <>
            <DashboardTable />
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
export default Dashboard;
