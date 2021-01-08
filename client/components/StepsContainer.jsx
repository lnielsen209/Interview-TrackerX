import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import StepsTable from './StepsTable.jsx';
import SignoutButton from './SignoutButton';

const StepsContainer = () => {
  const history = useHistory();
   const auth = useAuth();
  const { state } = useLocation();
  console.log('state in Steps Component ===> ', useLocation().state);

  return (
    <>
      <h1 id="title">Application Progress</h1>
      <div className="tableContainer">
        {auth.user.id ? (
          <>
            <p>
              {state.application.job_title} at {state.application.company} in
              {state.application.location}
            </p>
            <StepsTable state={state} />
            <button onClick={() => history.goBack()}>Back</button>
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
export default StepsContainer;
