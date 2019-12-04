import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import Button from '../Button';
import './index.scss';
import Checkbox from '../Checkbox';
import DateInput from '../DateInput';

const Experience = ({
  deleteExpBtn,
  onChange,
}) => {

  const [isChecked, setIsChecked] = useState(false);
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [isStartDayOnFocus, setIsStartDayOnFocus] = useState(false);
  const [isEndDayOnFocus, setIsEndDayOnFocus] = useState(false);
  const [expJob, setExpJob] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPlace, setExpPlace] = useState('');
  const [expDesc, setExpDesc] = useState('');

  return (
    <div className="experience" onChange={onChange}>
      <div className="container">
        <TextInput
          title="職稱"
          type="text"
          placeholder="例：前端工程師"
          text={expJob}
          onChange={e => setExpJob(e.target.value)}
          required
        />
        <TextInput
          title="公司名稱"
          type="text"
          text={expCompany}
          onChange={e => setExpCompany(e.target.value)}
          required
        />
        <TextInput
          title="地點"
          type="text"
          placeholder="例：台灣台北"
          text={expPlace}
          onChange={e => setExpPlace(e.target.value)}
          required
        />
        <div className="selects">
          <DateInput
            title="開始日期"
            placeholder="dd/mm/yyyy"
            defaultDate={startDay}
            onSelect={setStartDay}
            disabledPastDate={false}
            isOpenDatePicker={isStartDayOnFocus}
            onFocus={() => setIsStartDayOnFocus(true)}
            switchHandler={setIsStartDayOnFocus}
            required
          // onBlur={() => setIsBirthOnFocus(false)}
          />
          <DateInput
            title="結束日期"
            placeholder="dd/mm/yyyy"
            defaultDate={endDay}
            onSelect={setEndDay}
            disabledPastDate={false}
            isOpenDatePicker={isEndDayOnFocus}
            onFocus={() => setIsEndDayOnFocus(true)}
            switchHandler={setIsEndDayOnFocus}
            required
          // onBlur={() => setIsBirthOnFocus(false)}
          />

        </div>
        <Checkbox
          text="在職中"
          checked={isChecked}
          name="isStillWorking"
          onChange={() => { }}
        />
        <TextArea
          title="工作內容"
          placeholder="說明您在這份工作中扮演的角色和成果"
          text={expDesc}
          onChange={e => setExpDesc(e.target.value)}
        />
        <div className="exp_button">
          <Button
            className="delete_btn"
            text="刪除"
            type="primary"
            size="small"
            theme="red"
            onClick={deleteExpBtn}
          />
        </div>
      </div>
    </div>
  );
};

Experience.propTypes = {

  onChange: PropTypes.func,
  deleteExpBtn: PropTypes.func,
};

export default Experience;
