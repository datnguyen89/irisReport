import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { CustomApproveBusinessCustomerModalWrapper, ImgWrapper } from './ApproveBusinessCustomerModalStyled'
import { Button, Col, Descriptions, Divider, Form, Input, message, Modal, notification, Row, Spin, Tabs } from 'antd'
import { ColorText, RowCenterDiv, RowSpaceBetweenDiv } from '../CommonStyled/CommonStyled'
import { CheckCircleOutlined, CheckSquareOutlined, ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SlickSlider from '../SlickSlider'
import IMAGES from '../../images'
import { toJS } from 'mobx'
import stringUtils from '../../utils/stringUtils'
import dateUtils from '../../utils/dateUtils'
import PDFViewer from 'mgr-pdf-viewer-react'
import fileUtils from '../../utils/fileUtils'
import {
  ERROR_COLOR,
  ERROR_TITLE,
  EXECUTION_ORDER_STATUS,
  EXECUTION_TYPE_ID,
  RESPONSE_CODE,
  ROLES,
} from '../../utils/constant'
import PdfCustomViewer from '../PdfCustomViewer'

const { TabPane } = Tabs

const CustomApproveBusinessCustomerModal = props => {
  // region props, hook, state
  const { visible, onClose, execution, propertyStore, orderStore, authenticationStore, onSuccess } = props
  const [reason, setReason] = useState(undefined)

  // endregion
  // region destructuring
  const { listNational, listCity, listDistrict, listWards, commonProperty, hostFileUpload } = propertyStore
  const { extendData } = authenticationStore

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleConfirm = (confirmStatus) => {
    Modal.confirm({
      title: 'Thông báo',
      icon: confirmStatus ? <CheckCircleOutlined /> : <StopOutlined />,
      content: `Bạn có chắc chắn ${confirmStatus ? 'phê duyệt' : 'từ chối phê duyệt'} khách hàng?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        if (!confirmStatus && (!reason || reason.trim()?.length === 0)) {
          notification.error({
            message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
            description: 'Vui lòng nhập lý do từ chối',
          })
          return
        }
        let payload = {
          approvalStatus: confirmStatus,
          reason: reason || '',
          executionID: Number(execution.executionID),
          updateTime: Number(execution.updateTime),
          extendData,
        }

        if (execution.executionType === EXECUTION_TYPE_ID.ADD_BUSINESS)
          orderStore.approveBusinessExecution(payload)
            .then(res => {
              if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                onSuccess()
                setReason('')
                message.success(res?.description)
              }
            })
        else
          orderStore.approveEditBusinessExecution(payload)
            .then(res => {
              if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                onSuccess()
                setReason('')
                message.success(res?.description)
              }
            })
      },
      onCancel: () => {
      },
    })
  }
  const handleChangeReason = (v) => {
    setReason(v.currentTarget.value)
  }
  const handleCancel = () => {
    setReason(undefined)
    onClose()
  }
  // endregion
  // region function render
  const renderNational = (v) => {
    return listNational?.find(item => item?.locationId === v)?.locationName || ''
  }
  const renderBusinessDocumentType = (v) => {
    return commonProperty?.businessDocumentType.find(item => item?.value === v)?.name || ''
  }
  const renderBusinessType = (v) => {
    return commonProperty?.businessType.find(item => item?.value === v)?.name || ''
  }
  const renderBusinessAreas = (v) => {
    return commonProperty?.businessAreas.find(item => item?.value === v)?.name || ''
  }
  const renderGroupCustomer = (v) => {
    return commonProperty?.groupCustomer.find(item => item?.value === v)?.name || ''
  }
  const renderActiveBranch = (v) => {
    return commonProperty?.activeBranch.find(item => item?.value === v)?.name || ''
  }
  const renderGender = (v) => {
    return commonProperty?.gender.find(item => item?.value === v)?.name || ''
  }
  const renderDocumentType = (v) => {
    return commonProperty?.documentType.find(item => item?.value === v)?.name || ''
  }
  const renderAccountantType = (v) => {
    return commonProperty?.accountantType.find(item => item?.value === v)?.name || ''
  }
  const renderRepresentativeType = (v) => {
    return commonProperty?.representativeType.find(item => item?.value === v)?.name || ''
  }

  const renderCity = (v) => {
    return listCity?.find(item => item?.locationId === v)?.locationName
      ? `, ${listCity?.find(item => item?.locationId === v)?.locationName}`
      : ''
  }
  const renderDistrict = (v) => {
    return listDistrict?.find(item => item?.locationId === v)?.locationName
      ? `, ${listDistrict?.find(item => item?.locationId === v)?.locationName}`
      : ''
  }
  const renderWards = (v) => {
    return listWards?.find(item => item?.locationId === v)?.locationName
      ? `, ${listWards?.find(item => item?.locationId === v)?.locationName}`
      : ''
  }
  // endregion
  // region side effect
  useEffect(() => {
    if (stringUtils.parseDataJson(execution?.orderStatusData)?.length > 0) {
      let executionHasReason = stringUtils.parseDataJson(execution?.orderStatusData)?.findLast(item => item?.Reason?.length > 0)
      setReason(executionHasReason?.Reason)
    }
  }, [execution])
  // endregion

  return (
    <CustomApproveBusinessCustomerModalWrapper>
      <Modal
        width={'90%'}
        style={{ top: '50px' }}
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        title={authenticationStore.checkRole(ROLES.APPROVEORG) ? 'Duyệt khách hàng doanh nghiệp' : 'Xem thông tin'}
        open={visible}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Thông tin doanh nghiệp' key='1'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'Số ĐKKD'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Mã số thuế'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.TaxCode}
              </Descriptions.Item>
              <Descriptions.Item label={'Tên doang nghiệp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessName}
              </Descriptions.Item>
              <Descriptions.Item label={'Tên viết tắt'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ShortName}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày thành lập'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BirthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc gia'}>
                {renderNational(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.National)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderBusinessDocumentType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessDocumentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.PassportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.PassportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.PassportExpiredDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Fax'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Fax}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại hình doanh nghiệp'}>
                {renderBusinessType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Lĩnh vực kinh doanh'}>
                {renderBusinessAreas(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessAreas)}
              </Descriptions.Item>
              <Descriptions.Item label={'Nhóm khách hàng'}>
                {renderGroupCustomer(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.CustomerGroup)}
              </Descriptions.Item>
              <Descriptions.Item label={'Chi nhánh mở HĐ'}>
                {renderActiveBranch(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Branch)}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ ĐKKD'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCenterAddress}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCenterWardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCenterDistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCenterLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ giao dịch'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.TradingAddress}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.TradingWardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.TradingDistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.TradingLocationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              {
                stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCertificationImageUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCertificationImageUrl ?
                      fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCertificationImageUrl) === '.pdf'
                        ?
                        <PdfCustomViewer
                          url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCertificationImageUrl} />
                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.BusinessCertificationImageUrl
                          }
                          alt={''} />
                      : <div />
                  }
                </ImgWrapper>
              }
              {
                stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ContractScanUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ContractScanUrl ?
                      fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ContractScanUrl) === '.pdf'
                        ?
                        <PdfCustomViewer
                          url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ContractScanUrl} />
                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ContractScanUrl
                          }
                          alt={''} />
                      : <div />
                  }
                </ImgWrapper>
              }
            </SlickSlider>
          </TabPane>
          <TabPane tab='Thông tin người đại diện' key='2'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'Số giấy tờ'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Đại diện'}>
                {renderRepresentativeType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.RepresentativeType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Họ và tên'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.FullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Giới tính'}>
                {renderGender(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày sinh'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.BirthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc tịch'}>
                {renderNational(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.National)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderDocumentType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.DocumentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PassportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PassportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PassportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Chức vụ'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Position}
              </Descriptions.Item>
              <Descriptions.Item label={'Nghề nghiệp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.JobName}
              </Descriptions.Item>
              <Descriptions.Item label={'Dân tộc'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ thường trú'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PermanentAddress}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PermanentWardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PermanentDistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.PermanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ hiện tại'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.Address}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.WardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.DistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.LocationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              <ImgWrapper>
                {
                  hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.FrontImageUrl ?
                    fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.FrontImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer
                        url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.FrontImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.FrontImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.BackImageUrl ?
                    fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.BackImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer
                        url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.BackImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.BackImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              {
                stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.AuthorDocumentScanUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.AuthorDocumentScanUrl ?
                      fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.AuthorDocumentScanUrl) === '.pdf'
                        ?
                        <PdfCustomViewer
                          url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.AuthorDocumentScanUrl} />
                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.Representative?.AuthorDocumentScanUrl
                          }
                          alt={''} />
                      : <div />
                  }
                </ImgWrapper>
              }
            </SlickSlider>
          </TabPane>
          <TabPane tab='Thông tin kế toán trưởng' key='3'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'Số giấy tờ'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Vai trò'}>
                {renderAccountantType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.AccountantType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Họ và tên'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.FullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Giới tính'}>
                {renderGender(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày sinh'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.BirthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc tịch'}>
                {renderNational(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.National)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderDocumentType(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DocumentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PassportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PassportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PassportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Chức vụ'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Position}
              </Descriptions.Item>
              <Descriptions.Item label={'Nghề nghiệp'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.JobName}
              </Descriptions.Item>
              <Descriptions.Item label={'Dân tộc'}>
                {stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ thường trú'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PermanentAddress}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PermanentWardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PermanentDistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.PermanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ hiện tại'}>
                {
                  `
                  ${stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.Address}
                  ${renderWards(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.WardID)}
                  ${renderDistrict(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DistrictID)}
                  ${renderCity(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.LocationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              <ImgWrapper>
                {
                  hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.FrontImageUrl ?
                    fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.FrontImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer
                        url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.FrontImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.FrontImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.BackImageUrl ?
                    fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.BackImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer
                        url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.BackImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.BackImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DecisionAppointScanUrl ?
                    fileUtils.getFileExt(stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DecisionAppointScanUrl) === '.pdf'
                      ?
                      <PdfCustomViewer
                        url={hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DecisionAppointScanUrl} />

                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + stringUtils.parseDataJson(execution?.executionData)?.BusinessInfo?.ChiefAccountant?.DecisionAppointScanUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
            </SlickSlider>
          </TabPane>
        </Tabs>

        <Divider>Thông tin phê duyệt</Divider>

        <Form
          colon={false}>
          <Row justify={'center'}>
            <Col span={18}>
              <Form.Item label={''}>
                <Input.TextArea
                  maxLength={200}
                  showCount
                  disabled={!authenticationStore.checkRole(ROLES.APPROVEORG) || execution?.orderStatus !== EXECUTION_ORDER_STATUS.WAIT_APPROVAL}
                  value={reason} placeholder={'Lý do'}
                  onChange={handleChangeReason} rows={4} />
              </Form.Item>
            </Col>
          </Row>

          {
            authenticationStore.checkRole(ROLES.APPROVEORG) && execution?.orderStatus === EXECUTION_ORDER_STATUS.WAIT_APPROVAL &&
            <RowCenterDiv>
              <Button className={'mr-16'} onClick={() => handleConfirm(false)}>
                <StopOutlined /> Từ chối
              </Button>
              <Button type={'primary'} onClick={() => handleConfirm(true)}>
                <CheckSquareOutlined /> Phê duyệt
              </Button>
            </RowCenterDiv>
          }
        </Form>
      </Modal>
    </CustomApproveBusinessCustomerModalWrapper>
  )
}

CustomApproveBusinessCustomerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  execution: PropTypes.any,
  onSuccess: PropTypes.func,
}

export default inject('propertyStore', 'orderStore', 'authenticationStore')(observer(CustomApproveBusinessCustomerModal))