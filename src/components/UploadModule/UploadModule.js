import React from 'react'
import PropTypes from 'prop-types'
import { message, notification, Upload } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadModuleWrapper } from './UploadModuleStyled'
import fileUtils from '../../utils/fileUtils'
import { ColorText } from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, ERROR_TITLE } from '../../utils/constant'

const UploadModule = props => {
  // region props, hook, state
  const {
    callbackFile,
    callbackFileBase64,
    callbackFileSrcPreview,
    uploadButton,
  } = props
  // endregion
  // region destructuring

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleBeforeUpload = (file) => {
    if (file) {
      const acceptType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
      ]
      let isAcceptType = acceptType.includes(file.type)
      if (!isAcceptType) {
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Vui lòng chọn file định dạng jpg/jpeg/png/pdf',
        })
        return
      }
      if (file.size > 5242880) {
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Dung lượng ảnh phải nhỏ hơn 5MB',
        })
        return
      }

      const objectUrl = URL.createObjectURL(file)
      callbackFile && callbackFile(file)
      callbackFileSrcPreview && callbackFileSrcPreview(objectUrl)
      fileUtils.getBase64(file, res => {
        callbackFileBase64 && callbackFileBase64(res)
      })
    }
    return false
  }
  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion

  return (
    <UploadModuleWrapper>
      <Upload
        beforeUpload={handleBeforeUpload}
      >
        {uploadButton ? uploadButton : <CloudUploadOutlined />}
      </Upload>
    </UploadModuleWrapper>
  )
}

UploadModule.propTypes = {
  callbackFile: PropTypes.func,
  callbackFileBase64: PropTypes.func,
  callbackFileSrcPreview: PropTypes.func,
  uploadButton: PropTypes.node,
}

export default UploadModule