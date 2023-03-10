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
        title={'Xem th??ng tin'}
        open={visible}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Th??ng tin doanh nghi???p' key='1'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'S??? ??KKD'}>
                {business?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'M?? s??? thu???'}>
                {business?.taxCode}
              </Descriptions.Item>
              <Descriptions.Item label={'T??n doang nghi???p'}>
                {business?.businessName}
              </Descriptions.Item>
              <Descriptions.Item label={'T??n vi???t t???t'}>
                {business?.shortName}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y th??nh l???p'}>
                {dateUtils.convertToStrDate(business?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Qu???c gia'}>
                {renderNational(business?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Lo???i gi???y t???'}>
                {renderBusinessDocumentType(business?.businessDocumentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y c???p'}>
                {dateUtils.convertToStrDate(business?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'N??i c???p'}>
                {business?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y h???t h???n'}>
                {dateUtils.convertToStrDate(business?.passportExpiredDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di ?????ng'}>
                {business?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'??T c??? ?????nh'}>
                {business?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Fax'}>
                {business?.fax}
              </Descriptions.Item>
              <Descriptions.Item label={'Lo???i h??nh doanh nghi???p'}>
                {renderBusinessType(business?.businessType)}
              </Descriptions.Item>
              <Descriptions.Item label={'L??nh v???c kinh doanh'}>
                {renderBusinessAreas(business?.businessAreas)}
              </Descriptions.Item>
              <Descriptions.Item label={'Nh??m kh??ch h??ng'}>
                {renderGroupCustomer(business?.customerGroup)}
              </Descriptions.Item>
              <Descriptions.Item label={'Chi nh??nh m??? H??'}>
                {renderActiveBranch(business?.branch)}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? ??KKD'}>
                {
                  `
                  ${business?.businessCenterAddress}
                  ${renderWards(business?.businessCenterWardID)}
                  ${renderDistrict(business?.businessCenterDistrictID)}
                  ${renderCity(business?.businessCenterLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? giao d???ch'}>
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
          <TabPane tab='Th??ng tin ng?????i ?????i di???n' key='2'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'S??? gi???y t???'}>
                {business?.representative?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'?????i di???n'}>
                {renderRepresentativeType(business?.representative?.representativeType)}
              </Descriptions.Item>
              <Descriptions.Item label={'H??? v?? t??n'}>
                {business?.representative?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Gi???i t??nh'}>
                {renderGender(business?.representative?.gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y sinh'}>
                {dateUtils.convertToStrDate(business?.representative?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Qu???c t???ch'}>
                {renderNational(business?.representative?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Lo???i gi???y t???'}>
                {renderDocumentType(business?.representative?.documentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y c???p'}>
                {dateUtils.convertToStrDate(business?.representative?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'N??i c???p'}>
                {business?.representative?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y h???t h???n'}>
                {dateUtils.convertToStrDate(business?.representative?.passportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di ?????ng'}>
                {business?.representative?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.representative?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'??T c??? ?????nh'}>
                {business?.representative?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Ch???c v???'}>
                {business?.representative?.position}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngh??? nghi???p'}>
                {business?.representative?.jobName}
              </Descriptions.Item>
              <Descriptions.Item label={'D??n t???c'}>
                {business?.representative?.nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? th?????ng tr??'}>
                {
                  `
                  ${business?.representative?.permanentAddress}
                  ${renderWards(business?.representative?.permanentWardID)}
                  ${renderDistrict(business?.representative?.permanentDistrictID)}
                  ${renderCity(business?.representative?.permanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? hi???n t???i'}>
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
          <TabPane tab='Th??ng tin k??? to??n tr?????ng' key='3'>
            <Descriptions
              className={'mt-16 mb-16'}
              labelStyle={{ width: '15%' }}
              bordered
              column={2}
              size={'small'}>
              <Descriptions.Item label={'S??? gi???y t???'}>
                {business?.chiefAccountant?.passport}
              </Descriptions.Item>
              <Descriptions.Item label={'Vai tr??'}>
                {renderAccountantType(business?.chiefAccountant?.accountantType)}
              </Descriptions.Item>
              <Descriptions.Item label={'H??? v?? t??n'}>
                {business?.chiefAccountant?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label={'Gi???i t??nh'}>
                {renderGender(business?.chiefAccountant?.gender)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y sinh'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.birthDay, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Qu???c t???ch'}>
                {renderNational(business?.chiefAccountant?.national)}
              </Descriptions.Item>
              <Descriptions.Item label={'Lo???i gi???y t???'}>
                {renderDocumentType(business?.chiefAccountant?.documentType)}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y c???p'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.passportDate, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'N??i c???p'}>
                {business?.chiefAccountant?.passportPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'Ng??y h???t h???n'}>
                {dateUtils.convertToStrDate(business?.chiefAccountant?.passportExpire, 'DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label={'Di ?????ng'}>
                {business?.chiefAccountant?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label={'Email'}>
                {business?.chiefAccountant?.email}
              </Descriptions.Item>
              <Descriptions.Item label={'??T c??? ?????nh'}>
                {business?.chiefAccountant?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={'Ch???c v???'}>
                {business?.chiefAccountant?.position}
              </Descriptions.Item>
              <Descriptions.Item label={'Ngh??? nghi???p'}>
                {business?.chiefAccountant?.jobName}
              </Descriptions.Item>
              <Descriptions.Item label={'D??n t???c'}>
                {business?.chiefAccountant?.nation}
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? th?????ng tr??'}>
                {
                  `
                  ${business?.chiefAccountant?.permanentAddress}
                  ${renderWards(business?.chiefAccountant?.permanentWardID)}
                  ${renderDistrict(business?.chiefAccountant?.permanentDistrictID)}
                  ${renderCity(business?.chiefAccountant?.permanentLocationID)}
                  `
                }
              </Descriptions.Item>
              <Descriptions.Item span={2} label={'?????a ch??? hi???n t???i'}>
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