import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { IoMdAdd, IoIosClose } from 'react-icons/io';
import { MdTextFields, MdImage } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { Circle } from 'rc-progress';
import { useDropzone } from 'react-dropzone';
import TextArea from '../TextArea';
import Dropdown from './Dropdown';
import Modal from '../Modal';

import * as action from '../../actions';
import './index.scss';

if (process.env.NODE_ENV === 'production' || process.env.CIRCLECI) {
  var { imgurClient } = process.env;
} else {
  var { imgurClient } = require('../../../config/project_config');
}

const { CancelToken } = axios;
let cancel;

const ArticleEditors = ({
  selectedType,
  changeType,
  value,
  changeValue,
  onEnter,
  isrenderAddBtn,
  textRef,
}) => {
  const ArticleEditorTextRef = textRef;
  const [newInputText, setNewInputText] = useState('');
  const [isShowAddBtn, setIsShowAddBtn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [menuOptions, setMenuOptions] = useState({
    1: [
      <MdTextFields />,
      'Text',
      () => {
        ArticleEditorTextRef.current.focus();
        changeType('text');
      },
    ],
    2: [
      <MdImage />,
      'Image',
      () => {
        setIsImageUploadModalOpen(true);
        changeType('image');
      },
    ],
    3: [<FaCode />, 'Code'],
  });
  const [file, setFile] = useState({});
  const [isUploading, setIsUplaoding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // upload image to imgur
  const uploadImage = (img) => {
    const formData = new FormData();
    formData.append('image', img); // required
    axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
        'Content-Type': 'text',
        Authorization: `Client-ID ${imgurClient}`,
      },
      mimeType: 'multipart/form-data',
      onUploadProgress: (progressEvent) => {
        setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        console.log(res);
        setIsUplaoding(false);
        setFile(res.data.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        }
        console.log(e);
        setIsUplaoding(false);
        setIsImageUploadModalOpen(true);
      });
  };

  const delImage = (img) => {
    if (img.deletehash) {
      axios({
        method: 'DELETE',
        url: `https://api.imgur.com/3/image/${img.deletehash}`,
        headers: {
          'Content-Type': 'text',
          Authorization: `Client-ID ${config.imgurClient}`,
        },
        mimeType: 'multipart/form-data',
      });
      setFile({});
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setIsUplaoding(true);
      uploadImage(acceptedFiles[0]);
    },
  });

  const ImgPreview = () => (
    <div key={file.id}>
      <div className="imgupload_preview">
        <img src={file.link} alt={file.id} />
      </div>
    </div>
  );

  return (
    <div
      className="ArticleEditor"
      onMouseEnter={() => setIsShowAddBtn(true)}
      onMouseMove={() => setIsShowAddBtn(true)}
    >
      {isrenderAddBtn && (
        <button
          type="button"
          className="add_content_btn"
          style={Object.assign(
            {},
            isShowAddBtn ? { opacity: '1' } : { opacity: '0' },
            isMenuOpen
              ? { transform: 'rotate(45deg)' }
              : { transform: 'unset' },
          )}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            ArticleEditorTextRef.current.focus();
          }}
        >
          <IoMdAdd />
        </button>
      )}
      {!isImageUploadModalOpen && selectedType === 'text' && (
        <TextArea
          text={value}
          onChange={(e) => {
            // setNewInputText(e.target.value);
            changeValue(e.target.value);
            setIsShowAddBtn(false);
          }}
          onEnter={onEnter}
          ref={ArticleEditorTextRef}
        />
      )}
      {selectedType === 'image' && !value && (
        <div className="waitfor_img_upload">
          <MdImage />
          插入圖片
        </div>
      )}
      {selectedType === 'image' && value && (
        <div className="img_block">
          <img src={value} alt={value} />
        </div>
      )}
      {isImageUploadModalOpen && (
        <Modal
          isOpen={isImageUploadModalOpen}
          className="imgUplodaModal"
          title="插入圖片"
          onClose={() => {
            setIsImageUploadModalOpen(false);
            delImage(file);
            setFile({});
            changeType('text');
          }}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          confirmBtnText="插入圖片"
          cancelBtnText="取消"
          disabled={!file.link}
          Confirm={() => {
            setIsImageUploadModalOpen(false);
            changeValue(file.link); // will trigger rerender
          }}
        >
          <section className="container">
            {!file.link && !isUploading && (
              <div className="img_dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>點擊或拖曳圖片至此</p>
              </div>
            )}
            {isUploading && (
              <div className="upload_rogress_circle">
                <span onClick={cancel} className="upload_cancel_btn">
                  <IoIosClose />
                </span>
                <Circle
                  percent={uploadProgress}
                  strokeWidth="7"
                  trailWidth="5"
                  strokeColor="#3597EC"
                />
              </div>
            )}
            {file.link && !isUploading ? (
              <aside>
                <ImgPreview />
              </aside>
            ) : null}
          </section>
        </Modal>
      )}
      <Dropdown
        isOpen={isMenuOpen}
        swichOptionHandler={setIsMenuOpen}
        options={menuOptions}
      />
    </div>
  );
};
ArticleEditors.propTypes = {
  selectedType: PropTypes.string,
  changeType: PropTypes.func,
  value: PropTypes.string,
  changeValue: PropTypes.func,
  onFocus: PropTypes.func,
  onEnter: PropTypes.func,
  isrenderAddBtn: PropTypes.bool,
};

ArticleEditors.defaultProps = {
  selectedType: 'text',
  value: '',
  isrenderAddBtn: true,
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(ArticleEditors),
);
