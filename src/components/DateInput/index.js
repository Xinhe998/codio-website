import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import TextInput from '../TextInput';
import { format } from 'date-fns';
import { IoMdCalendar } from 'react-icons/io'
import useClickOutside from '../../hooks/useClickOutside';

const DateInput = ({
  defaultDate,
  onSelect,
  disabledPastDate,
  title,
  placeholder,
  isOpenDatePicker,
  onFocus,
  onBlur,
  switchHandler,
  required,
}) => {
  const dateInputRef = useRef();
  useClickOutside(isOpenDatePicker, dateInputRef, () => switchHandler(false));
  return (
    <div className="DateInput" ref={dateInputRef}>
      <TextInput
        title={title}
        text={format(defaultDate, 'yyyy/MM/dd')}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        icon={<IoMdCalendar />}
        onChange={() => {}}
        required={required}
      />
      {isOpenDatePicker && (
        <DatePicker
          defaultDate={defaultDate}
          onSelect={onSelect}
          switchHandler={switchHandler}
          disabledPastDate={disabledPastDate}
        />
      )}
    </div>
  );
};

DateInput.propTypes = {
  defaultDate: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  disabledPastDate: PropTypes.bool,
  isOpenDatePicker: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

DateInput.defaultProps = {
  defaultDate: '',
  onSelect: null,
  disabledPastDate: true,
  title: '',
  placeholder: '',
  isOpenDatePicker: false,
};
export default DateInput;
