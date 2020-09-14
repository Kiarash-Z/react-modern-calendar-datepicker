import React from 'react';

const Time = ({ activeDate, onHourSelect, onMinutesSelect, target, disabled }) => {
  const newActiveDate = activeDate || { hour: 24, minutes: 0 };
  return (
    <div className="Calendar__weekDays">
      <input
        type="number"
        value={newActiveDate.hour}
        onChange={e => onHourSelect(+e.target.value, target)}
        min="0"
        max="24"
        disabled={disabled}
      />
      <input
        type="number"
        value={newActiveDate.minutes}
        onChange={e => onMinutesSelect(+e.target.value, target)}
        min="0"
        max="60"
        disabled={disabled}
      />
    </div>
  );
};

export default Time;
