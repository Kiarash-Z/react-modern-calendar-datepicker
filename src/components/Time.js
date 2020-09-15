/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { getValueType } from '../shared/generalUtils';

const Time = ({ value, handleCalendarTimeChange, time, onSetTime }) => {
  useEffect(() => {
    handleCalendarTimeChange(value);
  }, [time]);
  const selectHour = (hour, target) => {
    if (hour > 24) hour = 24;
    if (hour < 0) hour = 0;
    const type = getValueType(value);
    if (type === 'SINGLE_DATE') {
      onSetTime({
        ...time,
        hour,
      });
    }
    if (type === 'RANGE') {
      onSetTime({
        ...time,
        [target]: { ...time[target], hour },
      });
    }
  };
  const selectMinuets = (minutes, target) => {
    if (minutes > 60) minutes = 60;
    if (minutes < 0) minutes = 0;
    const type = getValueType(value);
    if (type === 'SINGLE_DATE') {
      onSetTime({
        ...time,
        minutes,
      });
    }
    if (type === 'RANGE') {
      onSetTime({
        ...time,
        [target]: { ...time[target], minutes },
      });
    }
  };

  const type = getValueType(value);
  return (
    <>
      {type === 'SINGLE_DATE' && (
        <div className="Calendar__time Calendar__weekDays">
          <input
            className="Calendar__time--input x"
            value={time.hour}
            onChange={e => selectHour(+e.target.value)}
            min="0"
            max="24"
            type="number"
          />
          <span className="Calendar__time--label">:</span>
          <input
            className="Calendar__time--input"
            value={time.minutes}
            onChange={e => selectMinuets(+e.target.value)}
            min="0"
            max="60"
            type="number"
          />
        </div>
      )}
      {type === 'RANGE' && (
        <>
          <div className="Calendar__time Calendar__weekDays">
            <input
              className="Calendar__time--input x"
              value={time.from.hour}
              onChange={e => selectHour(+e.target.value, 'from')}
              min="0"
              max="24"
              type="number"
              disabled={!value.to || !value.to}
            />
            <span className="Calendar__time--label">:</span>
            <input
              className="Calendar__time--input"
              value={time.from.minutes}
              onChange={e => selectMinuets(+e.target.value, 'from')}
              min="0"
              max="60"
              type="number"
              disabled={!value.to || !value.to}
            />
          </div>
          <div className="Calendar__time Calendar__weekDays">
            <input
              className="Calendar__time--input x"
              value={time.to.hour}
              onChange={e => selectHour(+e.target.value, 'to')}
              min="0"
              max="24"
              type="number"
              disabled={!value.to || !value.to}
            />
            <span className="Calendar__time--label">:</span>
            <input
              className="Calendar__time--input"
              value={time.to.minutes}
              onChange={e => selectMinuets(+e.target.value, 'to')}
              min="0"
              max="60"
              type="number"
              disabled={!value.to || !value.to}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Time;
