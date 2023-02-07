import React from 'react'
import PropTypes from 'prop-types'
import { message, notification, Upload } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadModuleWrapper } from './UploadModuleStyled'
import fileUtils from '../../utils/fileUtils'
import { ColorText } from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, ERROR_TITLE } from '../../utils/constant'

const UploadImageModule = props => {
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
      ]
      let isAcceptType = acceptType.includes(file.type)
      if (!isAcceptType) {
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Vui lòng chọn file định dạng jpg/jpeg/png',
        })
        return
      }
      if (file.size > 512000) {
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Dung lượng ảnh phải nhỏ hơn 500KB',
        })
        return
      }

      const objectUrl = URL.createObjectURL(file)
      callbackFile(file)
      callbackFileSrcPreview(objectUrl)
      fileUtils.getBase64(file, res => {
        callbackFileBase64(res)
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

UploadImageModule.propTypes = {
  callbackFile: PropTypes.func.isRequired,
  callbackFileBase64: PropTypes.func.isRequired,
  callbackFileSrcPreview: PropTypes.func.isRequired,
  uploadButton: PropTypes.node,
}

export default UploadImageModule