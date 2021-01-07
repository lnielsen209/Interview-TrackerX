import React from 'react';

const StepsTableRows = ({ stepsTracker, setShowModalStep, removeStep }) => {
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
          contact_info,
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
            <td>{contact_info}</td>
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
  return <tbody>{renderBody()}</tbody>;
};

export default StepsTableRows;
