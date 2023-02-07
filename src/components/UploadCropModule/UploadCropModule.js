import React, { useState } from 'react'
import PropTypes, { oneOf } from 'prop-types'
import { message, notification, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadCropModuleWrapper } from './UploadCropModuleStyled'
import { ColorText } from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, ERROR_TITLE } from '../../utils/constant'

const UploadCropModule = props => {
  // region props, hook, state
  const {
    callbackFileCropped,
    callbackFileSrcPreview,
    shape,
    uploadButton,
    modalTitle,
    grid,
    rotate,
    modalOk,
    modalCancel,
  } = props

  // endregion
  // region destructuring

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleBeforeCrop = (file) => {
    console.log(file.type)
    const acceptType = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ]
    let isAcceptType = acceptType.includes(file.type)
    if (!isAcceptType) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn ảnh định dạng jpg/jpeg/png',
      })
      return false
    }
    if (file.size > 5242880) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Dung lượng ảnh phải nhỏ hơn 5MB',
      })
      return false
    }
    return true
  }
  const handleBeforeUpload = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      callbackFileCropped(file)
      callbackFileSrcPreview(objectUrl)
    }

    return false
  }
  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion

  return (
    <UploadCropModuleWrapper>
      <ImgCrop
        grid={grid}
        modalTitle={modalTitle || 'Cập nhật ảnh'}
        beforeCrop={handleBeforeCrop}
        rotate={rotate}
        shape={shape || 'rect'}
        aspect={16/9}
        modalOk={modalOk || 'Xác nhận'}
        modalCancel={modalCancel || 'Hủy'}>
        <Upload
          beforeUpload={handleBeforeUpload}
        >
          {uploadButton ? uploadButton : <CloudUploadOutlined />}
        </Upload>
      </ImgCrop>
    </UploadCropModuleWrapper>
  )
}

UploadCropModule.propTypes = {
  callbackFileCropped: PropTypes.func.isRequired,
  callbackFileSrcPreview: PropTypes.func.isRequired,
  shape: oneOf(['round', 'rect']),
  uploadButton: PropTypes.node,
  modalTitle: PropTypes.node,
  grid: PropTypes.bool.isRequired,
  rotate: PropTypes.bool.isRequired,
  modalOk: PropTypes.node,
  modalCancel: PropTypes.node,
}

export default UploadCropModule