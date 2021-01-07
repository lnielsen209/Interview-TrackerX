import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StepsTable from './StepsTable.jsx';

const Steps = () => {
  const history = useHistory();
  const { state } = useLocation();
  console.log('state in Steps Component ===> ', useLocation().state);

  return (
    <>
      <h1 id="title">Application Progress</h1>
      <p>
        {state.application.job_title} at {state.application.company} in
        {state.application.location}
      </p>
      <StepsTable state={state} />
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};
export default Steps;
