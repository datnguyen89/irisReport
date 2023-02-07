import React from 'react'
import PropTypes from 'prop-types'
import { message, notification, Upload } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import fileUtils from '../../utils/fileUtils'
import { ColorText } from '../CommonStyled/CommonStyled'
import { UploadCSVModuleWrapper } from './UploadGameDetailFileStyled'
import { ERROR_COLOR } from '../../utils/constant'


const UploadGameDetailFile = props => {
  // region props, hook, state
  const {
    callbackFile,
    callbackFileBase64,
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
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ]
      let isAcceptType = acceptType.includes(file.type)
      if (!isAcceptType) {
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
          description: 'Vui lòng chọn file định dạng csv/xlsx',
        })
        return
      }
      // if (file.size > 5242880) {
      //   notification.error({
      //     message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
      //     description: 'Dung lượng file phải nhỏ hơn 5MB',
      //   })
      //   return
      // }

      callbackFile(file)
      fileUtils.getBase64(file, res => {
        callbackFileBase64(res, file?.name)
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
    <UploadCSVModuleWrapper>
      <Upload
        beforeUpload={handleBeforeUpload}
      >
        {uploadButton ? uploadButton : <CloudUploadOutlined />}
      </Upload>
    </UploadCSVModuleWrapper>
  )
}

UploadGameDetailFile.propTypes = {
  callbackFile: PropTypes.func.isRequired,
  callbackFileBase64: PropTypes.func.isRequired,
  uploadButton: PropTypes.node,
}

export default UploadGameDetailFile