import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ModalStep from './ModalStep.jsx';
import { UserContext } from '../App.jsx';

const Steps = () => {
  // react hooks
  const [stepsTracker, setStepsTracker] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [showModalStep, setShowModalStep] = useState({
    action: null,
    id: null,
  }); // none / edit /add

  const context = useContext(UserContext);
  const history = useHistory();
  const { state } = useLocation();
  console.log('state in Steps Component ===> ', useLocation().state);

  // get the applications steps data from the DB
  useEffect(() => {
    if (updateState) fetchSteps();
  }, [updateState]);

  const fetchSteps = async () => {
    const resp = await fetch(
      `/user/${context.user.id}/application/${state.application.id}/step`,
      {
        method: 'GET',
        headers: { 'content-type': 'application/JSON' },
      }
    );
    const data = await resp.json();
    console.log(data);
    setStepsTracker(data);
    setUpdateState(false);
  };

  //Delete step from the DB
  const removeStep = (app_id, step_id) => {
    fetch(`/user/${context.user.id}/application/${app_id}/step/${step_id}`, {
      method: 'DELETE',

      headers: {
        'content-type': 'application/JSON',
      },
    }).then((res) => {
      setUpdateState(true);
    });
  };

  //this is the header
  //Operation is for Edit and Delete functionality
  const renderHeader = () => {
    let headerElement = [
      'Date',
      'Progress',
      'Contact Name',
      'Contact Role',
      'Contact Method',
      'Notes',
      'Modify',
    ];

    //now we will map over these values and output as th
    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const renderBody = () => {
    return stepsTracker.map(
      (
        {
          id,
          app_id,
          date,
          step_type,
          contact_name,
          contact_role,
          contact,
          notes,
        },
        index
      ) => {
        return (
          <tr key={id}>
            <td>{new Date(date).toLocaleDateString('en-US')}</td>
            <td>{step_type}</td>
            <td>{contact_name}</td>
            <td>{contact_role}</td>
            <td>{contact}</td>
            <td>{notes}</td>
            <td className="operation">
              <button
                className="deleteButton"
                onClick={() => setShowModalStep({ action: 'edit', id: index })}
              >
                Edit
              </button>
              <button className="button" onClick={() => removeStep(app_id,id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      }
    );
  };

  return (
    <>
      <h1 id="title">Application Progress</h1>
      <p>
        {state.application.job_title} at {state.application.company} in
        {state.application.location}
      </p>
      <div className="tableContainer">
        <table id="stepsTracker">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>

      {showModalStep.action ? (
        <ModalStep
          //setShowModalStep={setShowModalStep}
          setShowModalStep={setShowModalStep}
          action={showModalStep.action}
          currentStep={
            showModalStep.action === 'edit'
              ? stepsTracker[showModalStep.id]
              : {}
          }
          appId={state.application.id}
          setUpdateState={setUpdateState}
        />
      ) : (
        <button
          onClick={() =>
            setShowModalStep({ action: 'add', id: state.application.id })
          }
        >
          Add new step
        </button>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};
export default Steps;
