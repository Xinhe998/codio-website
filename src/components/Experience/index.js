import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import Select from '../Select';
import TextArea from '../TextArea';
import Button from '../Button';
import './index.scss';

const Experience = ({
  expJob,
  expCompany,
  expPlace,
  expDesc,
  expJobOnChange,
  expCompanyOnChange,
  expPlaceOnChange,
  expDescOnChange,
  expStartYearOptions,
  expStartMonthOptions,
  deleteExpBtn,
}) => {
  const [isStartMonthOpen, setIsStartMonthOpen] = useState(false);
  const [isStartYearOpen, setIsStartYearOpen] = useState(false);

  return (
    <div className="experience">
      <div className="container">
        <TextInput
          title="職稱"
          type="text"
          placeholder="例：前端工程師"
          text={expJob}
          onChange={expJobOnChange}
          required
        />
        <TextInput
          title="公司名稱"
          type="text"
          text={expCompany}
          onChange={expCompanyOnChange}
          required
        />
        <TextInput
          title="地點"
          type="text"
          placeholder="例：台灣台北"
          text={expPlace}
          onChange={expPlaceOnChange}
          required
        />
        <div className="selects">
          <Select
            title="開始年份"
            isOpen={isStartYearOpen}
            switchOptionHandler={setIsStartYearOpen}
            options={expStartYearOptions}
          />
          <Select
            title="開始月份"
            options={expStartMonthOptions}
            isOpen={isStartMonthOpen}
            switchOptionHandler={setIsStartMonthOpen}
          />
        </div>
        <TextArea
          title="工作內容"
          placeholder="說明您在這份工作中扮演的角色和成果"
          text={expDesc}
          onChange={expDescOnChange}
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
  expJob: PropTypes.string,
  expCompany: PropTypes.string,
  expPlace: PropTypes.string,
  expDesc: PropTypes.string,
  expStartYearOptions: PropTypes.array,
  expStartMonthOptions: PropTypes.array,
  expJobOnChange: PropTypes.func,
  expCompanyOnChange: PropTypes.func,
  expPlaceOnChange: PropTypes.func,
  expDescOnChange: PropTypes.func,
  deleteExpBtn: PropTypes.func,
};

export default Experience;
