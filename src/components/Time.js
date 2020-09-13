import React from 'react';

const Time = ({ activeDate, onHourSelect, onMinutesSelect }) => {
  console.log('from Time');
  console.log(activeDate);
  return (
    <div className="Calendar__weekDays">
      <input
        type="number"
        value={activeDate.hour}
        onChange={e => onHourSelect(+e.target.value)}
        min="0"
        max="24"
      />
      <input
        type="number"
        value={activeDate.minutes}
        onChange={e => onMinutesSelect(+e.target.value)}
        min="0"
        max="60"
      />
    </div>
  );
};

export default Time;
