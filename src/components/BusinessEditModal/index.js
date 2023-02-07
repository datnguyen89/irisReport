import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {
  DEVICE,
  ERROR_COLOR,
  ERROR_TITLE,
  EXECUTION_ORDER_STATUS,
  EXECUTION_TYPE_ID,
  REPRESENTATIVE_TYPE,
  RESPONSE_CODE,
  ROLES,
  SHORT_DATE,
} from '../../utils/constant'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
} from 'antd'
import {
  CheckOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import validator from '../../validator'
import UploadModule from 'components/UploadModule'
import PDFViewer from 'mgr-pdf-viewer-react'
import { ColorText, RowCenterDiv, RowFlexEndDiv } from 'components/CommonStyled/CommonStyled'
import moment from 'moment'
import dateUtils from 'utils/dateUtils'
import fileUtils from 'utils/fileUtils'
import fileStore from 'stores/fileStore'
import { resolve } from 'path'
import { set } from 'lodash'
import PdfCustomViewer from '../PdfCustomViewer'

const { TabPane } = Tabs

const BusinessEditModal = props => {
  // region props, hook, state =================
  const {
    commonStore,
    propertyStore,
    enterpriseStore,
    orderStore,
    visible,
    business,
    organizationID,
    // executionType,
    onClose,
    onSuccess,
  } = props
  const { appTheme, device } = commonStore
  const {
    commonProperty,
    listNational,
    listCity,
    listDistrict,
    listWards,
    hostFileUpload,
  } = propertyStore

  const [formEditBusiness] = Form.useForm()

  const [isValidDKKD, setIsValidDKKD] = useState(-1) // -1: chưa kiểm tra, 0: đã tồn tại, 1: chưa tồn tại
  const [messageValidDKKD, setMessageValidDKKD] = useState('')
  const [isValidMaSoThue, setIsValidMaSoThue] = useState(-1) // -1: chưa kiểm tra, 0: đã tồn tại, 1: chưa tồn tại
  const [messageValidMaSoThue, setMessageValidMaSoThue] = useState('')
  const [fileToUploadDKKD, setFileToUploadDKKD] = useState(null)
  const [fileToPreviewDKKD, setFileToPreviewDKKD] = useState('')
  const [fileBase64DKKD, setFileBase64DKKD] = useState(null)
  const [fileToUploadScanHD, setFileToUploadScanHD] = useState(null)
  const [fileToPreviewScanHD, setFileToPreviewScanHD] = useState('')
  const [fileBase64ScanHD, setFileBase64ScanHD] = useState(null)
  const [cityDKKD, setCityDKKD] = useState([])
  const [districtDKKD, setDistrictDKKD] = useState([])
  const [wardsDKKD, setWardsDKKD] = useState([])
  const [cityGD, setCityGD] = useState([])
  const [districtGD, setDistrictGD] = useState([])
  const [wardsGD, setWardsGD] = useState([])

  const [isValidSoGiayToRepresentation, setIsValidSoGiayToRepresentation] = useState(-1) // -1: chưa kiểm tra, 0: đã tồn tại, 1: chưa tồn tại
  const [messageValidSoGiayToRepresentation, setMessageValidSoGiayToRepresentation] = useState('')
  const [fileToUploadRepresentationFront, setFileToUploadRepresentationFront] = useState(null)
  const [fileToPreviewRepresentationFront, setFileToPreviewRepresentationFront] = useState('')
  const [fileBase64RepresentationFront, setFileBase64RepresentationFront] = useState(null)
  const [fileToUploadRepresentationBack, setFileToUploadRepresentationBack] = useState(null)
  const [fileToPreviewRepresentationBack, setFileToPreviewRepresentationBack] = useState('')
  const [fileBase64RepresentationBack, setFileBase64RepresentationBack] = useState(null)
  const [fileToUploadUyQuyen, setFileToUploadUyQuyen] = useState(null)
  const [fileToPreviewUyQuyen, setFileToPreviewUyQuyen] = useState('')
  const [fileBase64UyQuyen, setFileBase64UyQuyen] = useState(null)
  const [showVBUQ, setShowVBUQ] = useState(false)
  const [cityThuongTruRepresentation, setCityThuongTruRepresentation] = useState([])
  const [districtThuongTruRepresentation, setDistrictThuongTruRepresentation] = useState([])
  const [wardsThuongTruRepresentation, setWardsThuongTruRepresentation] = useState([])
  const [cityHienTaiRepresentation, setCityHienTaiRepresentation] = useState([])
  const [districtHienTaiRepresentation, setDistrictHienTaiRepresentation] = useState([])
  const [wardsHienTaiRepresentation, setWardsHienTaiRepresentation] = useState([])

  const [isValidSoGiayToAccounting, setIsValidSoGiayToAccounting] = useState(-1) // -1: chưa kiểm tra, 0: đã tồn tại, 1: chưa tồn tại/hợp lệ
  const [messageValidSoGiayToAccounting, setMessageValidSoGiayToAccounting] = useState('')
  const [fileToUploadAccountingFront, setFileToUploadAccountingFront] = useState(null)
  const [fileToPreviewAccountingFront, setFileToPreviewAccountingFront] = useState('')
  const [fileBase64AccountingFront, setFileBase64AccountingFront] = useState(null)
  const [fileToUploadAccountingBack, setFileToUploadAccountingBack] = useState(null)
  const [fileToPreviewAccountingBack, setFileToPreviewAccountingBack] = useState('')
  const [fileBase64AccountingBack, setFileBase64AccountingBack] = useState(null)
  const [fileToUploadAccountingBoNhiem, setFileToUploadAccountingBoNhiem] = useState(null)
  const [fileToPreviewAccountingBoNhiem, setFileToPreviewAccountingBoNhiem] = useState('')
  const [fileBase64AccountingBoNhiem, setFileBase64AccountingBoNhiem] = useState(null)
  const [cityThuongTruAccounting, setCityThuongTruAccounting] = useState([])
  const [districtThuongTruAccounting, setDistrictThuongTruAccounting] = useState([])
  const [wardsThuongTruAccounting, setWardsThuongTruAccounting] = useState([])
  const [cityHienTaiAccounting, setCityHienTaiAccounting] = useState([])
  const [districtHienTaiAccounting, setDistrictHienTaiAccounting] = useState([])
  const [wardsHienTaiAccounting, setWardsHienTaiAccounting] = useState([])

  const defaultPanes = ['business', 'representative', 'chiefAccountant']
  const [activeKey, setActiveKey] = useState(defaultPanes[0])

  useEffect(() => {
    console.log('business', business)
    if (!business)
      return

    // Set preview image + document
    setFileToUploadDKKD(null)
    setFileToUploadScanHD(null)
    setFileToPreviewDKKD(hostFileUpload + business?.businessCertificationImageUrl)
    setFileToPreviewScanHD(hostFileUpload + business?.contractScanUrl)

    setFileToUploadRepresentationFront(null)
    setFileToUploadRepresentationBack(null)
    setFileToUploadUyQuyen(null)
    setFileToPreviewRepresentationFront(hostFileUpload + business?.representative?.frontImageUrl)
    setFileToPreviewRepresentationBack(hostFileUpload + business?.representative?.backImageUrl)
    setFileToPreviewUyQuyen(hostFileUpload + business?.representative?.authorDocumentScanUrl)

    setFileToUploadAccountingFront(null)
    setFileToUploadAccountingBack(null)
    setFileToUploadAccountingBoNhiem(null)
    setFileToPreviewAccountingFront(hostFileUpload + business?.chiefAccountant?.frontImageUrl)
    setFileToPreviewAccountingBack(hostFileUpload + business?.chiefAccountant?.backImageUrl)
    setFileToPreviewAccountingBoNhiem(hostFileUpload + business?.chiefAccountant?.decisionAppointScanUrl)

    // Format date
    let customBusiness = business
    customBusiness.birthDay = dateUtils.convertToDatetime(customBusiness?.birthDay)
    customBusiness.passportDate = dateUtils.convertToDatetime(customBusiness?.passportDate)
    customBusiness.passportExpiredDate = dateUtils.convertToDatetime(customBusiness?.passportExpiredDate)

    customBusiness.representative.birthDay = dateUtils.convertToDatetime(customBusiness?.representative?.birthDay)
    customBusiness.representative.passportDate = dateUtils.convertToDatetime(customBusiness?.representative?.passportDate)
    customBusiness.representative.passportExpire = dateUtils.convertToDatetime(customBusiness?.representative?.passportExpire)

    customBusiness.chiefAccountant.birthDay = dateUtils.convertToDatetime(customBusiness?.chiefAccountant?.birthDay)
    customBusiness.chiefAccountant.passportDate = dateUtils.convertToDatetime(customBusiness?.chiefAccountant?.passportDate)
    customBusiness.chiefAccountant.passportExpire = dateUtils.convertToDatetime(customBusiness?.chiefAccountant?.passportExpire)

    // Set localtion
    handleChangeCityDKKD(customBusiness.businessCenterLocationID)
    handleChangeDistrictDKKD(customBusiness.businessCenterDistrictID)

    handleChangeCityGD(customBusiness.tradingLocationID)
    handleChangeDistrictGD(customBusiness.tradingDistrictID)

    handleChangeCityThuongTruRepresentation(customBusiness.representative.permanentLocationID)
    handleChangeDistrictThuongTruRepresentation(customBusiness.representative.permanentDistrictID)

    handleChangeCityHienTaiRepresentation(customBusiness.representative.locationID)
    handleChangeDistrictHienTaiRepresentation(customBusiness.representative.districtID)

    handleChangeCityThuongTruAccounting(customBusiness.chiefAccountant.permanentLocationID)
    handleChangeDistrictThuongTruAccounting(customBusiness.chiefAccountant.permanentDistrictID)

    handleChangeCityHienTaiAccounting(customBusiness.chiefAccountant.locationID)
    handleChangeDistrictHienTaiAccounting(customBusiness.chiefAccountant.districtID)

    if (business?.executionType === EXECUTION_TYPE_ID.ADD_BUSINESS) {
      setIsValidDKKD(1)
      setIsValidMaSoThue(1)
    }

    setIsValidSoGiayToAccounting(1)
    setIsValidSoGiayToRepresentation(1)

    setShowVBUQ(customBusiness.representative.representativeType === REPRESENTATIVE_TYPE.AUTHORIZED_REPRESENTATIVE)

    formEditBusiness.setFieldsValue(customBusiness)
  }, [business])
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const onTabChange = (key) => {
    setActiveKey(key)
  }

  const disabledDateFuture = (current) => {
    // Không được chọn ngày sinh ở tương lai
    return current && current > moment().startOf('day').add(1, 'days')
  }

  const disabledDatePast = (current) => {
    // Không được chọn ngày quá khứ
    return current && current < moment().startOf('day').add(1, 'days')
  }

  const handleCancel = () => {
    formEditBusiness.resetFields()
    onClose()
  }

  const onFinishEdit = (formCollection) => {
    let submitData = formCollection

    // Validate date time
    submitData.birthDay = dateUtils.convertToMilliseconds(submitData?.birthDay)
    submitData.passportDate = dateUtils.convertToMilliseconds(submitData?.passportDate)
    submitData.passportExpiredDate = dateUtils.convertToMilliseconds(submitData?.passportExpiredDate)

    submitData.representative.birthDay = dateUtils.convertToMilliseconds(submitData?.representative?.birthDay)
    submitData.representative.passportDate = dateUtils.convertToMilliseconds(submitData?.representative?.passportDate)
    submitData.representative.passportExpire = dateUtils.convertToMilliseconds(submitData?.representative?.passportExpire)

    submitData.chiefAccountant.birthDay = dateUtils.convertToMilliseconds(submitData?.chiefAccountant?.birthDay)
    submitData.chiefAccountant.passportDate = dateUtils.convertToMilliseconds(submitData?.chiefAccountant?.passportDate)
    submitData.chiefAccountant.passportExpire = dateUtils.convertToMilliseconds(submitData?.chiefAccountant?.passportExpire)

    let dkkd = fileToUploadDKKD ? {
      fileName: 'DKKD' + fileUtils.getFileExt(fileToUploadDKKD?.name),
      data: fileBase64DKKD,
      businessCertification: submitData.passport,
    } : null

    let hopDong = fileToUploadScanHD ? {
      fileName: 'HopDong' + fileUtils.getFileExt(fileToUploadScanHD?.name),
      data: fileBase64ScanHD,
      businessCertification: submitData.passport,
    } : null

    let daiDienMatTruoc = fileToUploadRepresentationFront ? {
      fileName: 'MatTruoc' + fileUtils.getFileExt(fileToUploadRepresentationFront?.name),
      data: fileBase64RepresentationFront,
      businessCertification: submitData.passport,
    } : null

    let daiDienMatSau = fileToUploadRepresentationBack ? {
      fileName: 'MatSau' + fileUtils.getFileExt(fileToUploadRepresentationBack?.name),
      data: fileBase64RepresentationBack,
      businessCertification: submitData.passport,
    } : null

    let daiDienUyQuyen = fileToUploadUyQuyen ? {
      fileName: 'Vanbanuyquyen' + fileUtils.getFileExt(fileToUploadUyQuyen?.name),
      data: fileBase64UyQuyen,
      businessCertification: submitData.passport,
    } : null

    let keToanMatTruoc = fileToUploadAccountingFront ? {
      fileName: 'MatTruoc' + fileUtils.getFileExt(fileToUploadAccountingFront?.name),
      data: fileBase64AccountingFront,
      businessCertification: submitData.passport,
    } : null

    let keToanMatSau = fileToUploadAccountingBack ? {
      fileName: 'MatSau' + fileUtils.getFileExt(fileToUploadAccountingBack?.name),
      data: fileBase64AccountingBack,
      businessCertification: submitData.passport,
    } : null

    let keToanBoNhiem = fileToUploadAccountingBoNhiem ? {
      fileName: 'QDBoNhiemKTT' + fileUtils.getFileExt(fileToUploadAccountingBoNhiem?.name),
      data: fileBase64AccountingBoNhiem,
      businessCertification: submitData.passport,
    } : null

    if (!daiDienMatTruoc && !business.representative.frontImageUrl) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn ảnh giấy tờ người đại diện mặt trước',
      })
      return
    }

    if (!daiDienMatSau && !business.representative.backImageUrl) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn ảnh giấy tờ người đại diện mặt sau',
      })
      return
    }

    if (!daiDienUyQuyen && !business.representative.authorDocumentScanUrl
      && submitData?.representative?.representativeType === REPRESENTATIVE_TYPE.AUTHORIZED_REPRESENTATIVE) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn văn bản ủy quyền',
      })
      return
    }

    if (!keToanMatTruoc && !business.chiefAccountant.frontImageUrl) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn ảnh giấy tờ kế toán mặt trước',
      })
      return
    }

    if (!keToanMatSau && !business.chiefAccountant.backImageUrl) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn ảnh giấy tờ kế toán mặt sau',
      })
      return
    }

    if (!keToanBoNhiem && !business.chiefAccountant.decisionAppointScanUrl) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng chọn giấy tờ quyết định bổ nhiệm',
      })
      return
    }

    Promise.all([
      dkkd && fileStore.uploadFile(dkkd),
      hopDong && fileStore.uploadFile(hopDong),
      daiDienMatTruoc && fileStore.uploadFile(daiDienMatTruoc),
      daiDienMatSau && fileStore.uploadFile(daiDienMatSau),
      daiDienUyQuyen && fileStore.uploadFile(daiDienUyQuyen),
      keToanMatTruoc && fileStore.uploadFile(keToanMatTruoc),
      keToanMatSau && fileStore.uploadFile(keToanMatSau),
      keToanBoNhiem && fileStore.uploadFile(keToanBoNhiem),
      new Promise((resolve) => {
        resolve(true)
      }),
    ]).then(([resDkkd, resHopDong, resDaiDienMatTruoc, resDaiDienMatSau, resDaiDienUyQuyen, resKeToanMatTruoc, resKeToanMatSau, resKeToanBoNhiem]) => {
      // Add image + document url to execution
      submitData.businessCertificationImageUrl = dkkd ? resDkkd?.fileUrl : business.businessCertificationImageUrl
      submitData.contractScanUrl = hopDong ? resHopDong?.fileUrl : business.contractScanUrl

      submitData.representative.frontImageUrl = daiDienMatTruoc ? resDaiDienMatTruoc?.fileUrl : business.representative.frontImageUrl
      submitData.representative.backImageUrl = daiDienMatSau ? resDaiDienMatSau?.fileUrl : business.representative.backImageUrl
      submitData.representative.authorDocumentScanUrl = daiDienUyQuyen ? resDaiDienUyQuyen?.fileUrl : business.representative.authorDocumentScanUrl

      submitData.chiefAccountant.frontImageUrl = keToanMatTruoc ? resKeToanMatTruoc?.fileUrl : business.chiefAccountant.frontImageUrl
      submitData.chiefAccountant.backImageUrl = keToanMatSau ? resKeToanMatSau?.fileUrl : business.chiefAccountant.backImageUrl
      submitData.chiefAccountant.decisionAppointScanUrl = keToanBoNhiem ? resKeToanBoNhiem?.fileUrl : business.chiefAccountant.decisionAppointScanUrl

      let payload = {
        organizationID: organizationID,
        businessInfo: {
          ...submitData,
          linkbankCount: business.linkbankCount,
          accountID: business.accountID,
        },
        executionID: business?.executionID,
      }

      // Edit old exection
      if (business?.executionID > 0) {
        if (business.executionType === EXECUTION_TYPE_ID.ADD_BUSINESS)
          orderStore.updateBusinessExecution(payload)
            .then(res => {
              if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                message.success(res?.description)
                formEditBusiness.resetFields()
                if (onClose) onClose()
                if (onSuccess) onSuccess()
              }
            })
        if (business.executionType === EXECUTION_TYPE_ID.UPDATE_BUSINESS)
          orderStore.updateEditBusinessExecution(payload)
            .then(res => {
              if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                message.success(res?.description)
                formEditBusiness.resetFields()
                if (onClose) onClose()
                if (onSuccess) onSuccess()
              }
            })
      }
      // Create new exection
      else
        orderStore.createEditBusinessExecution(payload)
          .then(res => {
            if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
              message.success(res?.description)
              formEditBusiness.resetFields()
              if (onClose) onClose()
              if (onSuccess) onSuccess()
            }
          })
    }).catch((err) => {
      console.log(err)
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Không upload được ảnh đính kèm',
      })
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    if (errorInfo?.errorFields?.length === 0)
      return

    let firstErrField = errorInfo.errorFields[0].name
    let activeKey = defaultPanes.find(x => x === firstErrField[0])

    if (activeKey)
      setActiveKey(activeKey)
    else
      setActiveKey(defaultPanes[0])

    formEditBusiness.scrollToField(firstErrField, { behavior: 'smooth' })
  }
  // endregion

  // region Thông tin doanh nghiệp
  const validateDKKD = (rule, value, callback) => {
    const regex = /^\S$|^\S[\s\S]*\S$/
    if (!value || value?.trim()?.length === 0) {
      callback('Vui lòng nhập số ĐKKD')
    } else if (value && !regex.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (isValidDKKD === 0) {
      callback(messageValidDKKD)
    } else {
      callback()
    }
  }

  const handleSearchDKKD = (value, e) => {
    if (!value || value?.trim()?.length === 0) return
    e && e.preventDefault()
    let payload = {
      BusinessCertificate: value,
    }
    orderStore.ValidateBusiness(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            setIsValidDKKD(1)
            setMessageValidDKKD('')
            formEditBusiness.validateFields(['business_dkkd'])
            break
          default:
            setIsValidDKKD(0)
            setMessageValidDKKD(res?.description)
            formEditBusiness.validateFields(['business_dkkd'])
            break
        }
      })
  }

  const validateMaSoThue = (rule, value, callback) => {
    const regex = /^\S$|^\S[\s\S]*\S$/
    if (!value || value?.trim()?.length === 0) {
      callback('Vui lòng nhập mã số thuế')
    } else if (value && !regex.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (isValidMaSoThue === 0) {
      callback(messageValidMaSoThue)
    } else {
      callback()
    }
  }

  const handleSearchMaSoThue = (taxCode, e) => {
    e && e.preventDefault()
    if (!taxCode || taxCode?.trim()?.length === 0) return

    orderStore.ValidateBusiness({ taxCode })
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            setIsValidMaSoThue(1)
            setMessageValidMaSoThue('')
            formEditBusiness.validateFields(['taxCode'])
            break
          default:
            setIsValidMaSoThue(0)
            setMessageValidMaSoThue(res?.description)
            formEditBusiness.validateFields(['taxCode'])
            break
        }
      })
  }

  const validateNgayHetHanBusiness = (rule, value, callback) => {
    let business_ngayCap = formEditBusiness.getFieldValue('passportExpiredDate')
    if (!value) callback()
    if (value < business_ngayCap) {
      callback(`Ngày hết hạn phải lớn hơn ngày cấp`)
    } else {
      callback()
    }
  }

  const handleChangeCityDKKD = (e) => {
    console.log('handleChangeCityDKKD', e)
    let filterDistrictDKKD = [...listDistrict].filter(item => item.parentId === e)
    setDistrictDKKD(filterDistrictDKKD)
    formEditBusiness.setFieldsValue({
      business_districtDKKD: undefined,
      business_wardsDKKD: undefined,
    })
  }

  const handleChangeDistrictDKKD = (e) => {
    let filterWardsDKKD = [...listWards].filter(item => item.parentId === e)
    setWardsDKKD(filterWardsDKKD)
    formEditBusiness.setFieldsValue({
      business_wardsDKKD: undefined,
    })
  }

  const handleChangeCityGD = (e) => {
    console.log('handleChangeCityGD', e)
    let filterDistrictGD = [...listDistrict].filter(item => item.parentId === e)
    setDistrictGD(filterDistrictGD)
    formEditBusiness.setFieldsValue({
      business_districtGiaoDich: undefined,
      business_wardsGiaoDich: undefined,
    })
  }

  const handleChangeDistrictGD = (e) => {
    let filterWardsGD = [...listWards].filter(item => item.parentId === e)
    setWardsGD(filterWardsGD)
    formEditBusiness.setFieldsValue({
      business_wardsGiaoDich: undefined,
    })
  }
  // endregion

  // region Thông tin người đại diện
  const handleChangeDD = (e) => {
    console.log(e.target.value)
    let show = e.target.value === 2
    setShowVBUQ(show)
  }

  const validateSoGiayToRepresentation = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9]*$/
    if (!value || value?.trim()?.length === 0) {
      callback('Vui lòng nhập số giấy tờ!')
    } else if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số hoặc chữ không dấu không có khoảng trắng!')
    } else if (isValidSoGiayToRepresentation === 0) {
      callback(messageValidSoGiayToRepresentation)
    } else {
      callback()
    }
  }

  const handleSearchSoGiayToRepresentation = (value, e) => {
    e.preventDefault()
    if (!value || value?.trim()?.length === 0) return
    let payload = {
      RepresentativePassport: value,
    }
    orderStore.ValidateBusiness(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            setIsValidSoGiayToRepresentation(1)
            setMessageValidSoGiayToRepresentation('')
            formEditBusiness.validateFields(['representative', 'passport'])
            break
          default:
            setIsValidSoGiayToRepresentation(0)
            setMessageValidSoGiayToRepresentation(res?.description)
            formEditBusiness.validateFields(['representative', 'passport'])
            break
        }
      })
  }

  const validateNgayHetHanRepresentation = (rule, value, callback) => {
    let representation_ngayCap = formEditBusiness.getFieldValue(['representative', 'passportExpire'])
    if (!value) callback()
    if (value < representation_ngayCap) {
      callback(`Ngày hết hạn phải lớn hơn ngày cấp`)
    } else {
      callback()
    }
  }

  const handleChangeCityThuongTruRepresentation = (e) => {
    let filterDistrictThuongTru = [...listDistrict].filter(item => item.parentId === e)
    setDistrictThuongTruRepresentation(filterDistrictThuongTru)
    formEditBusiness.setFieldsValue({
      representation_districtThuongTru: undefined,
      representation_wardsThuongTru: undefined,
    })
  }

  const handleChangeDistrictThuongTruRepresentation = (e) => {
    let filterWardsThuongTru = [...listWards].filter(item => item.parentId === e)
    setWardsThuongTruRepresentation(filterWardsThuongTru)
    formEditBusiness.setFieldsValue({
      representation_wardsThuongTru: undefined,
    })
  }

  const handleChangeCityHienTaiRepresentation = (e) => {
    let filterDistrictHienTai = [...listDistrict].filter(item => item.parentId === e)
    setDistrictHienTaiRepresentation(filterDistrictHienTai)
    formEditBusiness.setFieldsValue({
      representation_districtHienTai: undefined,
      representation_wardsHienTai: undefined,
    })
  }

  const handleChangeDistrictHienTaiRepresentation = (e) => {
    let filterWardsHienTai = [...listWards].filter(item => item.parentId === e)
    setWardsHienTaiRepresentation(filterWardsHienTai)
    formEditBusiness.setFieldsValue({
      representation_wardsHienTai: undefined,
    })
  }
  // endregion

  // region Thông tin kế toán trưởng
  const validateSoGiayToAccounting = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9]*$/
    if (!value || value?.trim()?.length === 0) {
      callback('Vui lòng nhập số giấy tờ')
    } else if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số hoặc chữ không dấu không có khoảng trắng!')
    } else if (isValidSoGiayToAccounting === 0) {
      callback(messageValidSoGiayToAccounting)
    } else {
      callback()
    }
  }

  const handleSearchSoGiayToAccounting = (value, e) => {
    e.preventDefault()
    if (!value || value?.trim()?.length === 0) return
    let payload = {
      AccountantPassport: value,
    }
    orderStore.ValidateBusiness(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            setIsValidSoGiayToAccounting(1)
            setMessageValidSoGiayToAccounting('')
            formEditBusiness.validateFields(['chiefAccountant', 'passport'])
            break
          default:
            setIsValidSoGiayToAccounting(0)
            setMessageValidSoGiayToAccounting(res?.description)
            formEditBusiness.validateFields(['chiefAccountant', 'passport'])
            break
        }
      })
  }

  const validateNgayHetHanAccounting = (rule, value, callback) => {
    let accounting_ngayCap = formEditBusiness.getFieldValue(['chiefAccountant', 'passportExpire'])
    if (!value) callback()
    if (value < accounting_ngayCap) {
      callback(`Ngày hết hạn phải lớn hơn ngày cấp`)
    } else {
      callback()
    }
  }

  const handleChangeCityThuongTruAccounting = (e) => {
    let filterDistrictThuongTru = [...listDistrict].filter(item => item.parentId === e)
    setDistrictThuongTruAccounting(filterDistrictThuongTru)
    formEditBusiness.setFieldsValue({
      accounting_districtThuongTru: undefined, accounting_wardsThuongTru: undefined,
    })
  }

  const handleChangeDistrictThuongTruAccounting = (e) => {
    let filterWardsThuongTru = [...listWards].filter(item => item.parentId === e)
    setWardsThuongTruAccounting(filterWardsThuongTru)
    formEditBusiness.setFieldsValue({
      accounting_wardsThuongTru: undefined,
    })
  }

  const handleChangeCityHienTaiAccounting = (e) => {
    let filterDistrictHienTai = [...listDistrict].filter(item => item.parentId === e)
    setDistrictHienTaiAccounting(filterDistrictHienTai)
    formEditBusiness.setFieldsValue({
      accounting_districtHienTai: undefined, accounting_wardsHienTai: undefined,
    })
  }

  const handleChangeDistrictHienTaiAccounting = (e) => {
    let filterWardsHienTai = [...listWards].filter(item => item.parentId === e)
    setWardsHienTaiAccounting(filterWardsHienTai)
    formEditBusiness.setFieldsValue({
      accounting_wardsHienTai: undefined,
    })
  }
  // endregion

  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (!listCity || listCity?.length === 0) return
    setCityDKKD([...listCity])
    setCityGD([...listCity])
    setCityThuongTruRepresentation([...listCity])
    setCityHienTaiRepresentation([...listCity])
    setCityThuongTruAccounting([...listCity])
    setCityHienTaiAccounting([...listCity])
  }, [listCity])

  const passportInput = () => {
    console.log(business?.executionType)
    console.log(parseInt(business?.accountID ?? 0))

    // Chưa từng liên kết bank
    if (business?.executionType === EXECUTION_TYPE_ID.UPDATE_BUSINESS
      && parseInt(business?.accountID ?? 0) > 0)
      return (
        <Form.Item
          rules={[
            { validator: validateDKKD },
          ]}
          label={<span className={'custom-required'}>Số ĐKKD</span>} name={'passport'}>
          <Input disabled />
        </Form.Item>
      )

    return (
      <Form.Item
        rules={[
          { validator: validateDKKD },
        ]}
        label={<span className={'custom-required'}>Số ĐKKD</span>} name={'passport'}>
        <Input.Search
          onChange={() => setIsValidDKKD(-1)}
          suffix={
            isValidDKKD === 1
              ? <CheckOutlined style={{ color: 'green', marginLeft: 4 }} />
              : <span />
          }
          maxLength={20}
          placeholder={'Nhập nội dung'}
          enterButton
          showCount={true}
          onSearch={handleSearchDKKD} />
      </Form.Item>
    )
  }

  const businessNameInput = () => {
    if (business?.executionType === EXECUTION_TYPE_ID.UPDATE_BUSINESS
      && business.linkbankCount > 0)
      return (
        <Form.Item
          label={'Tên doanh nghiệp'} name={'businessName'}>
          <Input maxLength={100} showCount={true} disabled />
        </Form.Item>
      )

    return (
      <Form.Item
        rules={[
          { required: true, message: 'Vui lòng nhập tên doanh nghiệp' },
          { validator: validator.validateTrim },
        ]}
        label={'Tên doanh nghiệp'} name={'businessName'}>
        <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
      </Form.Item>
    )
  }

  const representativeFullNameInput = () => {
    if (business?.executionType === EXECUTION_TYPE_ID.UPDATE_BUSINESS
      && business.linkbankCount > 0)
      return (
        <Form.Item
          label={'Họ và tên'} name={['representative', 'fullName']}>
          <Input maxLength={100} showCount={true} disabled />
        </Form.Item>
      )

    return (
      <Form.Item
        rules={[
          { required: true, message: 'Vui lòng nhập họ và tên' },
          { validator: validator.validateTrimNoSpecial },
        ]}
        label={'Họ và tên'} name={['representative', 'fullName']}>
        <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
      </Form.Item>
    )
  }

  const representativeMoblieInput = () => {
    if (business?.executionType === EXECUTION_TYPE_ID.UPDATE_BUSINESS
      && business.linkbankCount > 0)
      return (
        <Form.Item
          label={'Di động'} name={['representative', 'mobile']}>
          <Input maxLength={10} showCount={true} disabled />
        </Form.Item>
      )

    return (
      <Form.Item
        rules={[
          { required: true, message: 'Vui lòng nhập số di động' },
          { validator: validator.validateOnlyNumber },
        ]}
        label={'Di động'} name={['representative', 'mobile']}>
        <Input maxLength={10} placeholder={'Nhập nội dung'} showCount={true} />
      </Form.Item>
    )
  }

  // endregion
  return (
    <Modal
      forceRender={true}
      width={'90%'}
      style={{ top: '50px' }}
      maskClosable={false}
      onCancel={handleCancel}
      footer={null}
      title={business?.executionType === EXECUTION_TYPE_ID.ADD_BUSINESS ? 'Thêm mới khách hàng doanh nghiệp' : 'Cập nhật khách hàng doanh nghiệp'}
      open={visible}>
      <Form
        validateTrigger={'onSubmit'}
        onFinish={onFinishEdit}
        onFinishFailed={onFinishFailed}
        labelAlign={'left'}
        labelCol={{ xxl: 8, xl: 8, lg: 24, md: 24, sm: 24, xs: 24 }}
        wrapperCol={{ xxl: 16, xl: 16, lg: 24, md: 24, sm: 24, xs: 24 }}
        colon={false}
        form={formEditBusiness}>
        <Tabs
          defaultActiveKey='business'
          activeKey={activeKey}
          onChange={onTabChange}
        >
          <TabPane tab='Thông tin doanh nghiệp' key={defaultPanes[0]} forceRender>
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                {passportInput()}
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                {business?.executionType === EXECUTION_TYPE_ID.ADD_BUSINESS &&
                  <Form.Item
                    rules={[
                      { validator: validateMaSoThue },
                    ]}
                    label={<span className={'custom-required'}>Mã số thuế</span>} name={'taxCode'}>
                    <Input.Search
                      onChange={() => setIsValidMaSoThue(-1)}
                      suffix={
                        isValidMaSoThue === 1
                          ? <CheckOutlined style={{ color: 'green', marginLeft: 4 }} />
                          : <span />
                      }
                      maxLength={20}
                      placeholder={'Nhập nội dung'}
                      enterButton showCount={true}
                      onSearch={handleSearchMaSoThue} />
                  </Form.Item>}
                {business?.executionType !== EXECUTION_TYPE_ID.ADD_BUSINESS &&
                  <Form.Item
                    label={<span className={'custom-required'}>Mã số thuế</span>} name={'taxCode'}>
                    <Input disabled />
                  </Form.Item>}
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                {businessNameInput()}
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên viết tắt' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Tên viết tắt'} name={'shortName'}>
                  <Input maxLength={20} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập' }]}
                  label={'Ngày thành lập'} name={'birthDay'}>
                  <DatePicker
                    disabledDate={disabledDateFuture}
                    style={{ width: '100%' }}
                    format={SHORT_DATE} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={'Quốc gia'} name={'national'}>
                  <Select placeholder={'Chọn quốc gia'}>
                    {
                      listNational && listNational?.length > 0 && listNational.map(item =>
                        <Select.Option key={item.locationId} value={item.locationId}>{item.locationName}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={'Loại giấy tờ'} name={'businessDocumentType'}>
                  <Select placeholder={'Chọn loại giấy tờ'}>
                    {
                      commonProperty?.businessDocumentType && commonProperty?.businessDocumentType.map(item =>
                        <Select.Option key={item.value} value={item.value}>{item?.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
                  label={'Ngày cấp'} name={'passportDate'}>
                  <DatePicker
                    disabledDate={disabledDateFuture}
                    style={{ width: '100%' }}
                    format={SHORT_DATE} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Vui lòng nhập nơi cấp' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Nơi cấp'} name={'passportPlace'}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validateNgayHetHanBusiness }]}
                  label={'Ngày hết hạn'} name={'passportExpiredDate'}>
                  <DatePicker
                    disabledDate={disabledDatePast}
                    format={SHORT_DATE}
                    style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Vui lòng nhập số di động' },
                    { validator: validator.validateOnlyNumber },
                  ]}
                  label={'Di động (nhận SMS)'} name={'mobile'}>
                  <Input maxLength={10} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateEmail },
                  ]}
                  label={'Email'} name={'email'}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateOnlyNumber },
                  ]}
                  label={'ĐT cố định'} name={'phone'}>
                  <Input maxLength={20} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateOnlyStringAndNumber },
                  ]}
                  label={'Fax'} name={'fax'}>
                  <Input maxLength={20} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn loại hình doanh nghiệp' }]}
                  label={'Loại hình doanh nghiệp'} name={'businessType'}>
                  <Select placeholder={'Vui lòng chọn'}>
                    {
                      commonProperty?.businessType && commonProperty?.businessType.map(item =>
                        <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn lĩnh vực kinh doanh' }]}
                  label={'Lĩnh vực kinh doanh'} name={'businessAreas'}>
                  <Select placeholder={'Vui lòng chọn'}>
                    {
                      commonProperty?.businessAreas && commonProperty?.businessAreas.map(item =>
                        <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  label={'Nhóm khách hàng'} name={'customerGroup'}>
                  <Select placeholder={'Vui lòng chọn'}>
                    {
                      commonProperty?.groupCustomer && commonProperty?.groupCustomer.map(item =>
                        <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  label={'Chi nhánh mở HĐ'} name={'branch'}>
                  <Select placeholder={'Chọn chi nhánh mở HĐ'}
                          showSearch
                          optionFilterProp={'name'}>
                    {
                      commonProperty?.activeBranch && commonProperty?.activeBranch.map(item =>
                        <Select.Option value={item.value} key={item.value} name={item.name}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ ĐKKD' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Địa chỉ ĐKKD'} name={'businessCenterAddress'}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'businessCenterLocationID'}>
                  <Select
                    onChange={handleChangeCityDKKD}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      cityDKKD && cityDKKD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'businessCenterDistrictID'}>
                  <Select
                    onChange={handleChangeDistrictDKKD}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      districtDKKD && districtDKKD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'businessCenterWardID'}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      wardsDKKD && wardsDKKD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ giao dịch' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Địa chỉ giao dịch'} name={'tradingAddress'}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'tradingLocationID'}>
                  <Select
                    onChange={handleChangeCityGD}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      cityGD && cityGD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'tradingDistrictID'}>
                  <Select
                    onChange={handleChangeDistrictGD}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      districtGD && districtGD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={'tradingWardID'}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      wardsGD && wardsGD?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label={'Ảnh ĐKKD/GPTL'}>
                  <UploadModule
                    uploadButton={
                      <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                        Vui lòng chọn tệp
                      </Button>}
                    callbackFile={e => setFileToUploadDKKD(e)}
                    callbackFileBase64={e => setFileBase64DKKD(e)}
                    callbackFileSrcPreview={e => setFileToPreviewDKKD(e)}
                  />


                </Form.Item>
                {
                  (fileToUploadDKKD?.type === 'application/pdf' || fileToPreviewDKKD.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewDKKD} />
                    :
                    fileToPreviewDKKD
                    && <img className={'previewImg'} src={fileToPreviewDKKD} alt={''} />
                }
              </Col>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label={'Bản scan hợp đồng'}>
                  <UploadModule
                    uploadButton={
                      <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                        Vui lòng chọn tệp
                      </Button>}
                    callbackFile={e => setFileToUploadScanHD(e)}
                    callbackFileBase64={e => setFileBase64ScanHD(e)}
                    callbackFileSrcPreview={e => setFileToPreviewScanHD(e)} />

                </Form.Item>
                {
                  (fileToUploadScanHD?.type === 'application/pdf' || fileToPreviewScanHD.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewScanHD} />
                    :
                    fileToPreviewScanHD
                    && <img className={'previewImg'} src={fileToPreviewScanHD} alt={''} />
                }
              </Col>
            </Row>
            {
              business?.orderStatus === EXECUTION_ORDER_STATUS.REJECT &&
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={'reason'}
                    label={'Lý do từ chối'}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input.TextArea
                      maxLength={200}
                      showCount
                      disabled={true}
                      placeholder={'Lý do'} rows={3} />
                  </Form.Item>
                </Col>
              </Row>
            }
          </TabPane>

          <TabPane tab='Thông tin người đại diện' key={defaultPanes[1]} forceRender>
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validateSoGiayToRepresentation },
                  ]}
                  label={<span className={'custom-required'}>Số giấy tờ</span>} name={['representative', 'passport']}>
                  <Input.Search
                    onChange={() => setIsValidSoGiayToRepresentation(-1)}
                    suffix={
                      isValidSoGiayToRepresentation === 1
                        ? <CheckOutlined style={{ color: 'green', marginLeft: 4 }} />
                        : <span />
                    }
                    maxLength={20}
                    placeholder={'Nhập nội dung'}
                    enterButton showCount={true}
                    onSearch={handleSearchSoGiayToRepresentation} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn hình thức đại diện' }]}
                  label={'Đại diện'} name={['representative', 'representativeType']}>
                  <Radio.Group onChange={handleChangeDD}
                               style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <Space
                      style={{ width: '100%' }}
                      direction={device === DEVICE.MOBILE ? 'vertical' : 'horizontal'}>
                      {
                        commonProperty?.representativeType && commonProperty?.representativeType.map(item =>
                          <Radio value={item.value} key={item.value}>{item.name}</Radio>,
                        )
                      }
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                {representativeFullNameInput()}
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                  label={'Giới tính'} name={['representative', 'gender']}>
                  <Select placeholder={'Vui lòng chọn'}>
                    {
                      commonProperty?.gender && commonProperty?.gender.map(item =>
                        <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                  label={'Ngày sinh'} name={['representative', 'birthDay']}>
                  <DatePicker
                    disabledDate={disabledDateFuture}
                    style={{ width: '100%' }}
                    format={SHORT_DATE} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn quốc tịch' }]}
                  label={'Quốc tịch'} name={['representative', 'national']}>
                  <Select placeholder={'Chọn quốc tịch'}>
                    {
                      listNational && listNational?.length > 0 && listNational.map(item =>
                        <Select.Option key={item.locationId} value={item.locationId}>{item.locationName}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn' }]}
                  label={'Loại giấy tờ'} name={['representative', 'documentType']}>
                  <Select placeholder={'Chọn loại giấy tờ'}>
                    {
                      commonProperty?.documentType && commonProperty?.documentType.map(item =>
                        <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
                  label={'Ngày cấp'} name={['representative', 'passportDate']}>
                  <DatePicker
                    disabledDate={disabledDateFuture}
                    style={{ width: '100%' }}
                    format={SHORT_DATE} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Vui lòng nhập nơi cấp' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Nơi cấp'} name={['representative', 'passportPlace']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validateNgayHetHanRepresentation }]}
                  label={'Ngày hết hạn'} name={['representative', 'passportExpire']}>
                  <DatePicker
                    disabledDate={disabledDatePast}
                    format={SHORT_DATE}
                    style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                {representativeMoblieInput()}
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateEmail },
                  ]}
                  label={'Email'} name={['representative', 'email']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateOnlyNumber },
                  ]}
                  label={'ĐT cố định'} name={['representative', 'phone']}>
                  <Input maxLength={20} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateTrim },
                  ]}
                  label={'Chức vụ'} name={['representative', 'position']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateTrim },
                  ]}
                  label={'Nghề nghiệp'} name={['representative', 'jobName']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { validator: validator.validateTrim },
                  ]}
                  label={'Dân tộc'} name={['representative', 'nation']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ thường trú' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Địa chỉ thường trú'} name={['representative', 'permanentAddress']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={['representative', 'permanentLocationID']}>
                  <Select
                    onChange={handleChangeCityThuongTruRepresentation}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      cityThuongTruRepresentation && cityThuongTruRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['representative', 'permanentDistrictID']}>
                  <Select
                    onChange={handleChangeDistrictThuongTruRepresentation}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      districtThuongTruRepresentation && districtThuongTruRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['representative', 'permanentWardID']}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      wardsThuongTruRepresentation && wardsThuongTruRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ hiện tại' },
                    { validator: validator.validateTrim },
                  ]}
                  label={'Địa chỉ hiện tại'} name={['representative', 'address']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['representative', 'locationID']}>
                  <Select
                    onChange={handleChangeCityHienTaiRepresentation}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      cityHienTaiRepresentation && cityHienTaiRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['representative', 'districtID']}>
                  <Select
                    onChange={handleChangeDistrictHienTaiRepresentation}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      districtHienTaiRepresentation && districtHienTaiRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['representative', 'wardID']}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {
                      wardsHienTaiRepresentation && wardsHienTaiRepresentation?.map(item =>
                        <Select.Option
                          key={item.locationId}
                          name={item.locationName}
                          value={item.locationId}>
                          {item.locationName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                           label={<span className={'custom-required'}>Ảnh giấy tờ mặt trước</span>}>
                  <UploadModule
                    uploadButton={
                      <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                        Vui lòng chọn tệp
                      </Button>}
                    callbackFile={e => setFileToUploadRepresentationFront(e)}
                    callbackFileBase64={e => setFileBase64RepresentationFront(e)}
                    callbackFileSrcPreview={e => setFileToPreviewRepresentationFront(e)}
                  />
                </Form.Item>
                {
                  (fileToUploadRepresentationFront?.type === 'application/pdf' || fileToPreviewRepresentationFront.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewRepresentationFront} />
                    :
                    fileToPreviewRepresentationFront
                    && <img className={'previewImg'} src={fileToPreviewRepresentationFront} alt={''} />
                }
              </Col>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                           label={<span className={'custom-required'}>Ảnh giấy tờ mặt sau</span>}>
                  <UploadModule
                    uploadButton={
                      <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                        Vui lòng chọn tệp
                      </Button>}
                    callbackFile={e => setFileToUploadRepresentationBack(e)}
                    callbackFileBase64={e => setFileBase64RepresentationBack(e)}
                    callbackFileSrcPreview={e => setFileToPreviewRepresentationBack(e)} />

                </Form.Item>
                {
                  (fileToUploadRepresentationBack?.type === 'application/pdf' || fileToPreviewRepresentationBack.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewRepresentationBack} />
                    :
                    fileToPreviewRepresentationBack
                    && <img className={'previewImg'} src={fileToPreviewRepresentationBack} alt={''} />
                }
              </Col>
              {
                showVBUQ &&
                <Col span={24}>
                  <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                             label={<span className={'custom-required'}>Văn bản ủy quyền</span>}>
                    <UploadModule
                      uploadButton={
                        <Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                          Vui lòng chọn tệp
                        </Button>}
                      callbackFile={e => setFileToUploadUyQuyen(e)}
                      callbackFileBase64={e => setFileBase64UyQuyen(e)}
                      callbackFileSrcPreview={e => setFileToPreviewUyQuyen(e)} />

                  </Form.Item>
                  {
                    (fileToUploadUyQuyen?.type === 'application/pdf' || fileToPreviewUyQuyen.endsWith('.pdf'))
                      ?
                      <PdfCustomViewer url={fileToPreviewUyQuyen} />
                      :
                      fileToPreviewUyQuyen
                      && <img className={'previewImg'} src={fileToPreviewUyQuyen} alt={''} />
                  }
                </Col>
              }

            </Row>
          </TabPane>

          <TabPane tab='Thông tin kế toán trưởng' key={defaultPanes[2]} forceRender>
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validateSoGiayToAccounting }]}
                  label={<span className={'custom-required'}>Số giấy tờ</span>} name={['chiefAccountant', 'passport']}>
                  <Input.Search
                    suffix={isValidSoGiayToAccounting === 1 ?
                      <CheckOutlined style={{ color: 'green', marginLeft: 4 }} /> : <span />}
                    onChange={() => setIsValidSoGiayToAccounting(-1)}
                    maxLength={20} placeholder={'Nhập nội dung'}
                    enterButton showCount={true}
                    onSearch={handleSearchSoGiayToAccounting} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn hình loại kế toán' }]}
                  label={'Kế toán'} name={['chiefAccountant', 'accountantType']}>
                  <Radio.Group style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <Space
                      style={{ width: '100%' }}
                      direction={device === DEVICE.MOBILE ? 'vertical' : 'horizontal'}>
                      {commonProperty?.accountantType && commonProperty?.accountantType.map(item => <Radio
                        key={item.value}
                        value={item.value}>{item.name}</Radio>)}
                    </Space>
                  </Radio.Group>
                </Form.Item>

              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{
                    required: true,
                    message: 'Vui lòng nhập họ và tên',
                  }, { validator: validator.validateTrimNoSpecial }]}
                  label={'Họ và tên'} name={['chiefAccountant', 'fullName']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>

              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={'Giới tính'} name={['chiefAccountant', 'gender']}>
                  <Select placeholder={'Vui lòng chọn'}>
                    {commonProperty?.gender && commonProperty?.gender.map(item => <Select.Option value={item.value}
                                                                                                 key={item.value}>{item.name}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={'Ngày sinh'} name={['chiefAccountant', 'birthDay']}>
                  <DatePicker disabledDate={disabledDateFuture} style={{ width: '100%' }}
                              format={SHORT_DATE} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={'Quốc tịch'} name={['chiefAccountant', 'national']}>
                  <Select placeholder={'Chọn quốc tịch'}>
                    {listNational && listNational?.length > 0 && listNational.map(item => <Select.Option
                      key={item.locationId} value={item.locationId}>{item.locationName}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={'Loại giấy tờ'} name={['chiefAccountant', 'documentType']}>
                  <Select placeholder={'Chọn loại giấy tờ'}>
                    {commonProperty?.documentType && commonProperty?.documentType.map(item => <Select.Option
                      value={item.value} key={item.value}>{item.name}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={'Ngày cấp'} name={['chiefAccountant', 'passportDate']}>
                  <DatePicker disabledDate={disabledDateFuture} style={{ width: '100%' }}
                              format={SHORT_DATE} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập ' }, { validator: validator.validateTrim }]}
                  label={'Nơi cấp'} name={['chiefAccountant', 'passportPlace']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validateNgayHetHanAccounting }]}
                  label={'Ngày hết hạn'} name={['chiefAccountant', 'passportExpire']}>
                  <DatePicker
                    disabledDate={disabledDatePast}
                    format={SHORT_DATE}
                    style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập ' }, { validator: validator.validateOnlyNumber }]}
                  label={'Di động'} name={['chiefAccountant', 'mobile']}>
                  <Input maxLength={10} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validator.validateEmail }]}
                  label={'Email'} name={['chiefAccountant', 'email']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validator.validateOnlyNumber }]}
                  label={'ĐT cố định'} name={['chiefAccountant', 'phone']}>
                  <Input maxLength={20} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validator.validateTrim }]}
                  label={'Chức vụ'} name={['chiefAccountant', 'position']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validator.validateTrim }]}
                  label={'Nghề nghiệp'} name={['chiefAccountant', 'jobName']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  rules={[{ validator: validator.validateTrim }]}
                  label={'Dân tộc'} name={['chiefAccountant', 'nation']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }, { validator: validator.validateTrim }]}
                  label={'Địa chỉ thường trú'} name={['chiefAccountant', 'permanentAddress']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng chọn ' }]}
                  label={''} name={['chiefAccountant', 'permanentLocationID']}>
                  <Select
                    onChange={handleChangeCityThuongTruAccounting}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {cityThuongTruAccounting && cityThuongTruAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['chiefAccountant', 'permanentDistrictID']}>
                  <Select
                    onChange={handleChangeDistrictThuongTruAccounting}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {districtThuongTruAccounting && districtThuongTruAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['chiefAccountant', 'permanentWardID']}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {wardsThuongTruAccounting && wardsThuongTruAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }, { validator: validator.validateTrim }]}
                  label={'Địa chỉ hiện tại'} name={['chiefAccountant', 'address']}>
                  <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['chiefAccountant', 'locationID']}>
                  <Select
                    onChange={handleChangeCityHienTaiAccounting}
                    placeholder={'Tỉnh/Thành phố'}
                    showSearch
                    optionFilterProp={'name'}>
                    {cityHienTaiAccounting && cityHienTaiAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['chiefAccountant', 'districtID']}>
                  <Select
                    onChange={handleChangeDistrictHienTaiAccounting}
                    placeholder={'Quận/Huyện'}
                    showSearch
                    optionFilterProp={'name'}>
                    {districtHienTaiAccounting && districtHienTaiAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={4} xl={4} lg={8} md={8} sm={8} xs={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                  label={''} name={['chiefAccountant', 'wardID']}>
                  <Select
                    placeholder={'Phường/Xã'}
                    showSearch
                    optionFilterProp={'name'}>
                    {wardsHienTaiAccounting && wardsHienTaiAccounting?.map(item => <Select.Option
                      key={item.locationId}
                      name={item.locationName}
                      value={item.locationId}>
                      {item.locationName}
                    </Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                           label={<span className={'custom-required'}>Ảnh giấy tờ mặt trước</span>}>
                  <UploadModule
                    uploadButton={<Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                      Vui lòng chọn tệp
                    </Button>}
                    callbackFile={e => setFileToUploadAccountingFront(e)}
                    callbackFileBase64={e => setFileBase64AccountingFront(e)}
                    callbackFileSrcPreview={e => setFileToPreviewAccountingFront(e)}
                  />
                </Form.Item>
                {
                  (fileToUploadAccountingFront?.type === 'application/pdf' || fileToPreviewAccountingFront.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewAccountingFront} />
                    : fileToPreviewAccountingFront &&
                    <img className={'previewImg'} src={fileToPreviewAccountingFront} alt={''} />}
              </Col>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                           label={<span className={'custom-required'}>Ảnh giấy tờ mặt sau</span>}>
                  <UploadModule
                    uploadButton={<Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                      Vui lòng chọn tệp
                    </Button>}
                    callbackFile={e => setFileToUploadAccountingBack(e)}
                    callbackFileBase64={e => setFileBase64AccountingBack(e)}
                    callbackFileSrcPreview={e => setFileToPreviewAccountingBack(e)} />

                </Form.Item>
                {
                  (fileToUploadAccountingBack?.type === 'application/pdf' || fileToPreviewAccountingBack.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewAccountingBack} />
                    : fileToPreviewAccountingBack &&
                    <img className={'previewImg'} src={fileToPreviewAccountingBack} alt={''} />
                }
              </Col>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                           label={<span className={'custom-required'}>Quyết định bổ nhiệm</span>}>
                  <UploadModule
                    uploadButton={<Button type={'link'} className={'mb-16'}><CloudUploadOutlined />
                      Vui lòng chọn tệp
                    </Button>}
                    callbackFile={e => setFileToUploadAccountingBoNhiem(e)}
                    callbackFileBase64={e => setFileBase64AccountingBoNhiem(e)}
                    callbackFileSrcPreview={e => setFileToPreviewAccountingBoNhiem(e)} />

                </Form.Item>
                {
                  (fileToUploadAccountingBoNhiem?.type === 'application/pdf' || fileToPreviewAccountingBoNhiem.endsWith('.pdf'))
                    ?
                    <PdfCustomViewer url={fileToPreviewAccountingBoNhiem} />
                    : fileToPreviewAccountingBoNhiem &&
                    <img className={'previewImg'} src={fileToPreviewAccountingBoNhiem} alt={''} />
                }
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <RowCenterDiv>
          <Button
            style={{ minWidth: 150 }}
            block={device === DEVICE.MOBILE}
            type={'default'} onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            style={{ minWidth: 150, marginLeft: 16 }}
            block={device === DEVICE.MOBILE}
            type={'primary'}
            htmlType={'submit'}>
            Lưu thông tin
          </Button>
        </RowCenterDiv>
      </Form>
    </Modal>
  )
}

BusinessEditModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  business: PropTypes.object,
}

export default inject('commonStore', 'enterpriseStore', 'propertyStore', 'orderStore')(observer(BusinessEditModal))