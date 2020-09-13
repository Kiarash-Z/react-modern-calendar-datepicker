import React, { useState } from 'react';

const Time = ({ value }) => {
  const [hour, setHour] = useState(0);
  console.log(value);
  return (
    <div className="Calendar__weekDays">
      <input type="number" value={hour} onChange={e => setHour(e.target.value)} min="0" max="24" />
      <input type="number" value={hour} onChange={e => setHour(e.target.value)} min="0" max="60" />
    </div>
  );
};

export default Time;
