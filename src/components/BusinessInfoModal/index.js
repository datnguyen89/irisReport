import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { BusinessInfoModalModalWrapper, ImgWrapper } from './BusinessInfoModalStyled'
import { Descriptions, Modal, Spin, Tabs } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SlickSlider from 'components/SlickSlider'
import dateUtils from 'utils/dateUtils'
import PDFViewer from 'mgr-pdf-viewer-react'
import fileUtils from 'utils/fileUtils'
import PdfCustomViewer from '../PdfCustomViewer'

const { TabPane } = Tabs

const BusinessInfoModal = props => {
  // region props, hook, state
  const { visible, onClose, business, propertyStore } = props

  // endregion
  // region destructuring
  const { listNational, listCity, listDistrict, listWards, commonProperty, hostFileUpload } = propertyStore

  const handleCancel = () => {
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

  return (
    <BusinessInfoModalModalWrapper>
      <Modal
        width={'90%'}
        style={{ top: '50px' }}
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        title={'Xem thông tin'}
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
                {business?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Mã số thuế'}>
                {business?.taxCode}
              </Descriptions.Item>
              <Descriptions.Item label={'Tên doang nghiệp'}>
                {business?.businessName}
              </Descriptions.Item>
              <Descriptions.Item label={'Tên viết tắt'}>
                {business?.shortName}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày thành lập'}>
                {dateUtils.convertToStrDate(business?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc gia'}>
                {renderNational(business?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderBusinessDocumentType(business?.businessDocumentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(business?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {business?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(business?.passportExpiredDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {business?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {business?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Fax'}>
                {business?.fax}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại hình doanh nghiệp'}>
                {renderBusinessType(business?.businessType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Lĩnh vực kinh doanh'}>
                {renderBusinessAreas(business?.businessAreas)}
              </Descriptions.Item>
              <Descriptions.Item label={'Nhóm khách hàng'}>
                {renderGroupCustomer(business?.customerGroup)}
              </Descriptions.Item>
              <Descriptions.Item label={'Chi nhánh mở HĐ'}>
                {renderActiveBranch(business?.branch)}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ ĐKKD'}>
                {
                  `
                  ${business?.businessCenterAddress}
                  ${renderWards(business?.businessCenterWardID)}
                  ${renderDistrict(business?.businessCenterDistrictID)}
                  ${renderCity(business?.businessCenterLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ giao dịch'}>
                {
                  `
                  ${business?.tradingAddress}
                  ${renderWards(business?.tradingWardID)}
                  ${renderDistrict(business?.tradingDistrictID)}
                  ${renderCity(business?.tradingLocationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              {
                business?.businessCertificationImageUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && business?.businessCertificationImageUrl ?
                      fileUtils.getFileExt(business?.businessCertificationImageUrl) === '.pdf'
                        ?
                        <PdfCustomViewer url={hostFileUpload + business?.businessCertificationImageUrl} />

                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + business?.businessCertificationImageUrl
                          }
                          alt={''} />
                      : <div />
                  }
                </ImgWrapper>
              }
              {
                business?.contractScanUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && business?.contractScanUrl ?
                      fileUtils.getFileExt(business?.contractScanUrl) === '.pdf'
                        ?
                        <PdfCustomViewer url={hostFileUpload + business?.contractScanUrl} />
                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + business?.contractScanUrl
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
                {business?.representative?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Đại diện'}>
                {renderRepresentativeType(business?.representative?.representativeType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Họ và tên'}>
                {business?.representative?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Giới tính'}>
                {renderGender(business?.representative?.gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày sinh'}>
                {dateUtils.convertToStrDate(business?.representative?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc tịch'}>
                {renderNational(business?.representative?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderDocumentType(business?.representative?.documentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(business?.representative?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {business?.representative?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(business?.representative?.passportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {business?.representative?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.representative?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {business?.representative?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Chức vụ'}>
                {business?.representative?.position}
              </Descriptions.Item>
              <Descriptions.Item label={'Nghề nghiệp'}>
                {business?.representative?.jobName}
              </Descriptions.Item>
              <Descriptions.Item label={'Dân tộc'}>
                {business?.representative?.nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ thường trú'}>
                {
                  `
                  ${business?.representative?.permanentAddress}
                  ${renderWards(business?.representative?.permanentWardID)}
                  ${renderDistrict(business?.representative?.permanentDistrictID)}
                  ${renderCity(business?.representative?.permanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ hiện tại'}>
                {
                  `
                  ${business?.representative?.address}
                  ${renderWards(business?.representative?.wardID)}
                  ${renderDistrict(business?.representative?.districtID)}
                  ${renderCity(business?.representative?.locationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              <ImgWrapper>
                {
                  hostFileUpload && business?.representative?.frontImageUrl ?
                    fileUtils.getFileExt(business?.representative?.frontImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer url={hostFileUpload + business?.representative?.frontImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + business?.representative?.frontImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && business?.representative?.backImageUrl ?
                    fileUtils.getFileExt(business?.representative?.backImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer url={hostFileUpload + business?.representative?.backImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + business?.representative?.backImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              {
                business?.representative?.authorDocumentScanUrl &&
                <ImgWrapper>
                  {
                    hostFileUpload && business?.representative?.authorDocumentScanUrl ?
                      fileUtils.getFileExt(business?.representative?.authorDocumentScanUrl) === '.pdf'
                        ?
                        <PdfCustomViewer url={hostFileUpload + business?.representative?.authorDocumentScanUrl} />
                        :
                        <img
                          className={'previewImg'}
                          src={
                            hostFileUpload + business?.representative?.authorDocumentScanUrl
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
                {business?.chiefAccountant?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Vai trò'}>
                {renderAccountantType(business?.chiefAccountant?.accountantType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Họ và tên'}>
                {business?.chiefAccountant?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Giới tính'}>
                {renderGender(business?.chiefAccountant?.gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày sinh'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Quốc tịch'}>
                {renderNational(business?.chiefAccountant?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Loại giấy tờ'}>
                {renderDocumentType(business?.chiefAccountant?.documentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày cấp'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Nơi cấp'}>
                {business?.chiefAccountant?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngày hết hạn'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.passportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di động'}>
                {business?.chiefAccountant?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.chiefAccountant?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'ĐT cố định'}>
                {business?.chiefAccountant?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Chức vụ'}>
                {business?.chiefAccountant?.position}
              </Descriptions.Item>
              <Descriptions.Item label={'Nghề nghiệp'}>
                {business?.chiefAccountant?.jobName}
              </Descriptions.Item>
              <Descriptions.Item label={'Dân tộc'}>
                {business?.chiefAccountant?.nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ thường trú'}>
                {
                  `
                  ${business?.chiefAccountant?.permanentAddress}
                  ${renderWards(business?.chiefAccountant?.permanentWardID)}
                  ${renderDistrict(business?.chiefAccountant?.permanentDistrictID)}
                  ${renderCity(business?.chiefAccountant?.permanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'Địa chỉ hiện tại'}>
                {
                  `
                  ${business?.chiefAccountant?.address}
                  ${renderWards(business?.chiefAccountant?.wardID)}
                  ${renderDistrict(business?.chiefAccountant?.districtID)}
                  ${renderCity(business?.chiefAccountant?.locationID)}
                  `
                }
              </Descriptions.Item>
            </Descriptions>
            <SlickSlider>
              <ImgWrapper>
                {
                  hostFileUpload && business?.chiefAccountant?.frontImageUrl ?
                    fileUtils.getFileExt(business?.chiefAccountant?.frontImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer url={hostFileUpload + business?.chiefAccountant?.frontImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + business?.chiefAccountant?.frontImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && business?.chiefAccountant?.backImageUrl ?
                    fileUtils.getFileExt(business?.chiefAccountant?.backImageUrl) === '.pdf'
                      ?
                      <PdfCustomViewer url={hostFileUpload + business?.chiefAccountant?.backImageUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + business?.chiefAccountant?.backImageUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
              <ImgWrapper>
                {
                  hostFileUpload && business?.chiefAccountant?.decisionAppointScanUrl ?
                    fileUtils.getFileExt(business?.chiefAccountant?.decisionAppointScanUrl) === '.pdf'
                      ?
                      <PdfCustomViewer url={hostFileUpload + business?.chiefAccountant?.decisionAppointScanUrl} />
                      :
                      <img
                        className={'previewImg'}
                        src={
                          hostFileUpload + business?.chiefAccountant?.decisionAppointScanUrl
                        }
                        alt={''} />
                    : <div />
                }
              </ImgWrapper>
            </SlickSlider>
          </TabPane>
        </Tabs>
      </Modal>
    </BusinessInfoModalModalWrapper>
  )
}

BusinessInfoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  execution: PropTypes.any,
  onSuccess: PropTypes.func,
}

export default inject('propertyStore')(observer(BusinessInfoModal))