import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import StepsHeader from './StepsTableHeader.jsx';
import StepsRow from './StepsTableRows.jsx';
import StepsFooter from './StepsTableFooter.jsx';
import axios from 'axios';

const StepsTable = ({ state }) => {
  // react hooks
  const [stepsTracker, setStepsTracker] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [showModalStep, setShowModalStep] = useState({
    action: null,
    id: null,
  }); // none / edit /add

  const context = useContext(UserContext);
  console.log('state in Steps Component ===> ', useLocation().state);


  console.log('stepsTracker ===> ', stepsTracker)

  // get the applications steps data from the DB
  useEffect(() => {
    if (updateState) fetchSteps();
  }, [updateState]);

  const fetchSteps = async () => {
    try {
      const res = await axios.get(
        `/user/${context.user.id}/application/${state.application.id}/step`
      );
      if (res.status === 200) {
        setStepsTracker(res.data);
        setUpdateState(false);
      }
    } catch (error) {
      console.log('Error in fetchSteps of StepsTable component:', error);
    }
  };

  //Delete step from the DB
  const removeStep = async (app_id, step_id) => {
    try {
      const res = await axios.delete(
        `/user/${context.user.id}/application/${app_id}/step/${step_id}`
      );
      if (res.status === 200) {
        setUpdateState(true);
      }
    } catch (error) {
      console.log('Error in handleSubmit of StepsTable component:', error);
    }
  };

 
  return (
    <div className="tableContainer">
      <table id="stepsTracker">
        <StepsHeader />
        <StepsRow
          stepsTracker={stepsTracker}
          setShowModalStep={setShowModalStep}
          removeStep={removeStep}
        />
        <StepsFooter
          state={state}
          stepsTracker={stepsTracker}
          setUpdateState={setUpdateState}
          showModalStep={showModalStep}
          setShowModalStep={setShowModalStep}
        />
      </table>
    </div>
  );
};

export default StepsTable;
