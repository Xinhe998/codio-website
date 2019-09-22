import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isPast,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  toDate,
} from 'date-fns';
import './index.scss';

const DatePicker = ({
  defaultDate,
  onSelect,
  disabledPastDate,
  switchHandler,
}) => {
  const [currentMonth, setcurrentMonth] = useState(new Date());
  const renderHeader = () => {
    const dateFormat = 'yyyy年MM月';
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'ccc';
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat).substring(0, 3)}
        </div>,
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
              || (disabledPastDate ? isPast(day) && !isToday(day) : null)
                ? 'disabled'
                : isSameDay(day, defaultDate)
                  ? 'selected'
                  : ''
            }`}
            key={day}
            onClick={() => {
              onDateClick(toDate(cloneDay));
              switchHandler(false);
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day) => {
    onSelect(day);
  };

  const nextMonth = () => {
    setcurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setcurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

DatePicker.propTypes = {
  defaultDate: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  disabledPastDate: PropTypes.bool,
  switchHandler: PropTypes.func,
};

DatePicker.defaultProps = {
  defaultDate: '',
  onSelect: null,
  disabledPastDate: true,
};
export default DatePicker;
