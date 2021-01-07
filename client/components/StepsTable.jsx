import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import ModalStep from './ModalStep.jsx';
import axios from 'axios';

const StepsTable = ({state}) => {
  // react hooks
  const [stepsTracker, setStepsTracker] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [showModalStep, setShowModalStep] = useState({
    action: null,
    id: null,
  }); // none / edit /add

  const context = useContext(UserContext);
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
              <button className="button" onClick={() => removeStep(app_id, id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      }
    );
  };
  return (
    <div className="tableContainer">
      <table id="stepsTracker">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
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
    </div>
  );
};

export default StepsTable;
