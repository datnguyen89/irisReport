import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { TestPageWrapper } from './TestPageStyled'
import { Helmet } from 'react-helmet/es/Helmet'
import { Button } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import UploadModule from '../../../components/UploadModule'
import fileUtils from '../../../utils/fileUtils'
import Viewer, { Worker } from '@phuocng/react-pdf-viewer'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

const TestPage = props => {
  const { fileStore } = props

  const [fileToUpload1, setFileToUpload1] = useState(null)
  const [fileToPreview1, setFileToPreview1] = useState(null)
  const [fileBase641, setFileBase641] = useState(null)
  const [fileToUpload2, setFileToUpload2] = useState(null)
  const [fileToPreview2, setFileToPreview2] = useState(null)
  const [fileBase642, setFileBase642] = useState(null)

  const handleClick = () => {
    // let payload1 = {
    //   fileName: 'ddkkd',
    //   data: fileBase641,
    //   businessCertification: 'test',
    // }
    // let payload2 = {
    //   fileName: 'hd',
    //   data: fileBase642,
    //   businessCertification: 'test',
    // }
    // Promise.all([
    //   fileStore.uploadFile(payload1),
    //   fileStore.uploadFile(payload2),
    // ])
    //   .then(([res1,res2]) => {
    //     console.log('res1', res1)
    //     console.log('res2',res2)
    //
    //   })
    console.log(fileUtils.getFileExt(fileToUpload1?.name))
  }

  return (
    <>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <TestPageWrapper>
        <UploadModule
          uploadButton={
            <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
              Vui lòng chọn tệp1
            </Button>}
          callbackFile={e => setFileToUpload1(e)}
          callbackFileSrcPreview={e => setFileToPreview1(e)}
          callbackFileBase64={e => setFileBase641(e)}
        />
        <UploadModule
          uploadButton={
            <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
              Vui lòng chọn tệp2
            </Button>}
          callbackFile={e => setFileToUpload2(e)}
          callbackFileSrcPreview={e => setFileToPreview2(e)}
          callbackFileBase64={e => setFileBase642(e)}
        />
        <Button onClick={handleClick}>OK</Button>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
          <div style={{ height: '750px' }}>
            <Viewer fileUrl="http://10.54.170.84:11007/Uploads/DKKD2/220307153934244-DKKD.pdf" />
          </div>
        </Worker>
      </TestPageWrapper>
    </>

  )
}

TestPage.propTypes = {}

export default inject('commonStore', 'fileStore')(observer(TestPage))