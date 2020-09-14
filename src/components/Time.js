import React, { useState, useEffect } from 'react';
import { getValueType } from '../shared/generalUtils';

const Time = ({ value, handleCalendarTimeChange }) => {
  const [timeDate, setTimeDate] = useState(value);
  useEffect(() => {
    handleCalendarTimeChange(timeDate);
  }, [timeDate]);

  const selectHour = (hour, target) => {
    const type = getValueType(value);
    if (type === 'SINGLE_DATE') {
      setTimeDate({
        ...value,
        hour,
      });
    }
    if (type === 'RANGE') {
      setTimeDate({
        ...value,
        [target]: { ...value[target], hour },
      });
    }
  };
  const selectMinuets = (minutes, target) => {
    const type = getValueType(value);
    if (type === 'SINGLE_DATE') {
      setTimeDate({
        ...value,
        minutes,
      });
    }
    if (type === 'RANGE') {
      setTimeDate({
        ...value,
        [target]: { ...value[target], minutes },
      });
    }
  };

  const TimerInput = ({ target, disabled, date }) => {
    const newActiveDate = date || { hour: 24, minutes: 0 };
    return (
      <div className="Calendar__weekDays">
        <input
          type="number"
          value={newActiveDate.hour}
          onChange={e => selectHour(+e.target.value, target)}
          min="0"
          max="24"
          disabled={disabled}
        />
        <input
          type="number"
          value={newActiveDate.minutes}
          onChange={e => selectMinuets(+e.target.value, target)}
          min="0"
          max="60"
          disabled={disabled}
        />
      </div>
    );
  };

  const type = getValueType(value);
  return (
    <>
      {type === 'SINGLE_DATE' && <TimerInput date={timeDate} />}
      {type === 'RANGE' && (
        <>
          <TimerInput target="from" disabled={!value.to || !value.to} date={timeDate.from} />
          <TimerInput target="to" disabled={!value.to || !value.to} date={timeDate.to} />
        </>
      )}
    </>
  );
};

export default Time;
