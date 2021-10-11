import React from 'react';

const StatusDisplay = ({ status, additionalStyleClass = '', errorMessage }) => {
  const insertStyleClass = (existingClass) => {
    if (additionalStyleClass) {
      return `${existingClass}__${additionalStyleClass}`;
    }
  };

  if (status === 'loading')
    return (
      <div
        className={`loading-spinner-container ${insertStyleClass(
          'loading-spinner-container'
        )}`}
      >
        <div
          className={`loading-spinner ${insertStyleClass('loading-spinner')}`}
        ></div>
      </div>
    );

  if (status === 'failed')
    return (
      <div className={`error ${insertStyleClass('error')}`}>
        <i className="fas fa-exclamation-triangle error__icon" />
        <span className="error__message">{errorMessage}</span>
      </div>
    );

  return null;
};

export default StatusDisplay;
