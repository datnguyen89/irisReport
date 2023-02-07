import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ReportFilterFormWrapper } from './ReportFilterFormStyled'
import { Button, Col, DatePicker, Divider, Form, Input, notification, Row, Select, Space } from 'antd'
import UploadModule from '../UploadModule'
import validator from '../../validator'
import {
  DEVICE,
  ERROR_COLOR,
  FILE_TYPE,
  REPORT_TYPE,
  RESPONSE_CODE,
  SHORT_DATE,
  STATUS_ACC,
  USER_TYPE,
} from '../../utils/constant'
import { ColorText, FlexBox } from '../CommonStyled/CommonStyled'
import reportStore from '../../stores/reportStore'
import { CheckOutlined, SearchOutlined } from '@ant-design/icons'
import CheckAccountsModal from '../CheckAccountsModal'
import moment from 'moment'
import UploadCSVModule from '../UploadCSVModule'

const { RangePicker } = DatePicker

const ReportFilterForm = props => {
  // region props, hook, state =================
  const {
    commonStore,
    reportStore,
    onFilter,
    fileType,
  } = props
  const {
    fileNameCached,
    typeAccountGroupList,
    typeAccountList,
    typeReportList,
    payloadCheckAccounts,
    setPayloadCheckAccounts,
  } = reportStore
  const { appTheme, device } = commonStore

  const [fileUpload, setFileUpload] = useState()
  const [fileBase64, setFileBase64] = useState()
  const [filePreview, setFilePreview] = useState()
  const [reportType, setReportType] = useState(null)
  const [firstLoad, setFirstLoad] = useState(true)

  const [visibleCheckAccountsModal, setVisibleCheckAccountsModal] = useState(false)

  const [form] = Form.useForm()
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleFinish = (e) => {
    onFilter(e)
  }
  const handleCallbackFile = (e) => {
    if (!e) return
    setFileUpload(e)
    form.setFieldsValue({
      FileAccounts: e?.name,
    })
  }
  const handleCallbackFileBase64 = (base64, name) => {
    if (!base64) return
    let userTypeSelected = form.getFieldValue('TypeAccount')
    if (userTypeSelected === null || userTypeSelected === undefined) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
        description: 'Vui lòng chọn loại tài khoản',
      })
      return
    }
    setFileBase64(base64)
    let payload = {
      FileType: fileType,
      FileData: base64,
      FileName: name,
      OverWrite: true,
    }
    reportStore.bulkInsertListAccount(payload)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          reportStore.getFileNameCache({ FileType: fileType })
            .then(res => {
              handleClickCheckAccounts()
            })
        } else {
          form.setFieldsValue({
            FileAccounts: null,
          })
        }
      })
  }
  const handleClickCheckAccounts = () => {
    let userTypeSelected = form.getFieldValue('TypeAccount')
    if (userTypeSelected === null || userTypeSelected === undefined) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
        description: 'Vui lòng chọn loại tài khoản',
      })
      return
    }
    let payload = {
      ...payloadCheckAccounts,
      UserType: userTypeSelected,
    }
    setPayloadCheckAccounts(payload)
    reportStore.getCheckListAccountReport()
      .then(res => {
        console.log(res?.responseCode)
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          setVisibleCheckAccountsModal(true)
        }
      })
  }

  const handleChangeReportType = (e) => {
    if (e === REPORT_TYPE.ACCOUNT_DETAILS.VALUE) {
      form.setFieldsValue({
        RangePicker: undefined,
      })
    }
    setReportType(e)
  }

  const handleCallBackFilter = () => {
    form.submit()
  }

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    switch (fileType) {
      case FILE_TYPE.PERSONAL:
        reportStore.loadTypeAccountList({
          TableName: 'CTKV_REPORT',
          ColumnName: 'TypeAccount',
        })
          .then(res => {
            if (res?.sysvar?.length > 0) {
              form.setFieldsValue({
                TypeAccount: res?.sysvar[0]?.Value,
              })
            }
          })
        break
      case FILE_TYPE.BUSINESS:
        reportStore.loadTypeAccountList({
          TableName: 'CTKV_REPORT',
          ColumnName: 'UserTypeDN',
        })
          .then(res => {
            if (res?.sysvar?.length > 0) {
              form.setFieldsValue({
                TypeAccount: res?.sysvar[0]?.Value,
              })
            }
          })
        break
      default:
        break
    }
    reportStore.loadTypeReportList({
      TableName: 'CTKV_REPORT',
      ColumnName: 'TypeReport',
    })
      .then(res => {
        if (res?.sysvar?.length > 0) {
          form.setFieldsValue({
            TypeReport: res?.sysvar[0]?.Value,
          })
        }
      })
    reportStore.loadTypeAccountGroupList({
      TableName: 'CTKV_REPORT',
      ColumnName: 'TypeAccountGroup',
    })

  }, [])

  useEffect(() => {
    form.setFieldsValue({
      FileAccounts: fileNameCached,
    })
  }, [fileNameCached])

  useEffect(() => {
    form.setFieldsValue({
      RangePicker: [moment().startOf('month'), moment()],
    })
  }, [reportType])

  // endregion
  return (
    <ReportFilterFormWrapper>
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Row justify={'space-between'} gutter={[16, 16]}>
          <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              name={'TypeAccount'}
              rules={[
                { required: true, message: 'Vui lòng chọn loại tài khoản' },
              ]}
            >
              <Select placeholder={'Loại tài khoản *'}>
                {
                  typeAccountList?.length > 0 &&
                  typeAccountList.map((item, index) =>
                    <Select.Option key={index} value={item?.Value}>{item?.Description}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              name={'TypeAccountGroup'}
            >
              <Select allowClear placeholder={'Nhóm khách hàng'}>
                {
                  typeAccountGroupList?.length > 0 &&
                  typeAccountGroupList.map((item, index) =>
                    <Select.Option key={index} value={item?.Value}>{item?.Description}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              name={'TypeReport'}
              rules={[
                { required: true, message: 'Vui lòng chọn loại báo cáo' },
              ]}
            >
              <Select placeholder={'Loại báo cáo *'} onChange={handleChangeReportType}>
                {
                  typeReportList?.length > 0 &&
                  typeReportList.map((item, index) =>
                    <Select.Option key={index} value={item?.Value}>{item?.Description}</Select.Option>,
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
            <FlexBox gap={'16px'}>
              <Form.Item
                name={'FileAccounts'}
                rules={[
                  { required: true, message: 'Vui lòng chọn tệp tài khoản' },
                ]}
              >
                <Input placeholder={'Tệp tài khoản *'} />
              </Form.Item>
              <UploadCSVModule
                uploadButton={<Button>Chọn</Button>}
                callbackFile={e => handleCallbackFile(e)}
                callbackFileBase64={(base64, name) => handleCallbackFileBase64(base64, name)} />
              <Button
                onClick={handleClickCheckAccounts}
                icon={<CheckOutlined />}>
                Kiểm tra
              </Button>
              <a
                href={process.env.PUBLIC_URL + `/TemplateAccounts.csv`}
                style={{ whiteSpace: 'nowrap', marginTop: 5 }}
                download
              >
                Tải file mẫu
              </a>
            </FlexBox>
          </Col>
          {
            (
              reportType === REPORT_TYPE.CRISIS.VALUE
              ||
              reportType === REPORT_TYPE.PAYMENT_REPORT.VALUE
            ) &&
            <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                rules={[{ validator: validator.validateRangePickerExport }]}
                name={'RangePicker'}
              >
                <RangePicker
                  placeholder={['Từ ngày', 'Đến ngày']}
                  allowClear={false}
                  format={SHORT_DATE}
                  style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          }
          <Col xxl={8} xl={24} lg={24} md={24} sm={24} xs={24}>
            <FlexBox justifyContent={device === DEVICE.DESKTOP ? 'end' : 'center'}>
              <Button
                icon={<SearchOutlined />}
                style={{ minWidth: 150 }}
                type={'primary'}
                htmlType={'submit'}>
                Tra cứu
              </Button>
            </FlexBox>
          </Col>
        </Row>
      </Form>
      <CheckAccountsModal
        open={visibleCheckAccountsModal}
        onFilter={handleCallBackFilter}
        onClose={() => setVisibleCheckAccountsModal(false)} />

    </ReportFilterFormWrapper>
  )
}

ReportFilterForm.propTypes = {
  onFilter: PropTypes.func,
  fileType: PropTypes.number,
}

export default inject('commonStore', 'reportStore')(observer(ReportFilterForm))