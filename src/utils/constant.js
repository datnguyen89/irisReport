import config from '../config'

export const APP_CLIENT_ID = 7
export const CMS_CLIENT = {
  ID: 5,
  LABEL: 'Quản lý doanh nghiệp',
  URL: config.cmsUrl,
}
export const REPORT_CLIENT = {
  ID: 7,
  LABEL: 'Báo cáo',
  URL: config.reportUrl,
}
export const SIDEBAR_WIDTH_EXPAND = 240
export const SIDEBAR_WIDTH_COLLAPSE = 64
export const DEVICE = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
}
export const FULL_DATE = 'DD-MM-YYYY HH:mm:ss'
export const LONG_DATE = 'DD-MM-YYYY HH:mm'
export const SHORT_DATE = 'DD-MM-YYYY'
export const STRING_DATE = 'YYYYMMDD'
export const PAGES = {
  HOME: {
    NAME: 'home',
    PATH: '/',
  },
  TEST: {
    NAME: 'test',
    PATH: '/test',
  },
  LOGIN: {
    NAME: 'login',
    PATH: '/login',
  },
  PERSONAL_REPORT: {
    NAME: 'personal-report',
    PATH: '/personal-report',
  },
  BUSINESS_REPORT: {
    NAME: 'business-report',
    PATH: '/business-report',
  },
  GAMEDETAIL_REPORT: {
    NAME: 'gamedetail-report',
    PATH: '/gamedetail-report',
  },
  NOT_PERMISSION: {
    NAME: 'not-permission',
    PATH: '/not-permission',
  },
  FORGOT_PASSWORD: {
    NAME: 'forgot-password',
    PATH: '/forgot-password',
  },
}
export const RESPONSE_CODE = {
  EXISTED: -2,
  ERROR: -1,
  SUCCESS: 0,
  FILL_DATA: 1,
  REQUIRE_OTP: -10021, // Yêu cầu nhập mã OTP
  MAX_OTP_FAILED: -10105, // OTP không đúng, quá số lần cho phép
}
export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
    mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
    SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
    /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
    U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
    5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
    eQIDAQAB
    -----END PUBLIC KEY-----`
export const FILE_TYPE = {
  PERSONAL: 1,
  BUSINESS: 2,
}
export const USER_TYPE = {
  PERSONAL: 1,
  MOBILE_MONEY: 10,
  BUSINESS: 2,
}
export const STATUS_ACC = {
  INVALID: -1,
  ALL: 0,
  VALID: 1,
}
export const REPORT_TYPE = {
  ACCOUNT_DETAILS: {
    VALUE: 1,
  },
  CRISIS: {
    VALUE: 2,
  },
  PAYMENT_REPORT: {
    VALUE: 3,
  },
}


export const ROLE_TYPES = ['Init', 'Review', 'Approve']


export const EXECUTION_ORDER_STATUS = {
  DELETED: -4,
  HIDDEN: -3,
  WAIT_APPROVAL: 0,
  REJECT: -2,
  REVIEWED: 1,
  APPROVED: 2,
  IN_PROGRESS: -1,
}

export const ROLES = {
  APPROVEORGUSER: 'ApproveOrgUser',
  APPROVEORG: 'ApproveOrg',
  DEPARTMENTMGMT: 'DepartmentMgmt',
  UPDATEROLEUSERCUSTOMERCMS: 'UpdateRoleUserCustomerCms',
  INITORGUSER: 'InitOrgUser',
  INITORG: 'InitOrg',
  STATEMENTREPORT: 'StatementReportCMSCustomer',
  INITMERCHANT: 'InitMerchant',
  INITMERCHANTUSER: 'InitMerchantUser',
  APPROVEMERCHANT: 'ApproveMerchant',
  APPROVEMERCHANTUSER: 'ApproveMerchantUser',
  INTEGRATEMERCHANT: 'InteMerchantMgmt',
  VIEWINTEMERCHANT: 'ViewInteMerchant',
}
export const THEME_LIST = [
  {
    name: 'blue',
    borderRadius: '8px',
    solidColor: '#0465B0',
    solidLightColor: 'rgb(233, 245, 254)',
    gradientColor: 'linear-gradient(108.88deg, #04BEFE 0%, #4481EB 100%)',
    shadowColor: '0 2px 10px rgba(68, 129, 235, 0.5)',
    lightShadowColor: '0 2px 4px rgba(61, 147, 190, 0.24), 0 4px 8px rgba(61, 153, 190, 0.16)',
  },
  {
    name: 'pink',
    borderRadius: '8px',
    solidColor: '#FE5196',
    solidLightColor: 'rgb(254, 237, 235)',
    gradientColor: 'linear-gradient(108.84deg, #F77062 0%, #FE5196 100%)',
    shadowColor: '0 2px 10px rgba(254, 81, 150, 0.5)',
    lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
  },
  {
    name: 'green',
    borderRadius: '8px',
    solidColor: '#008445',
    solidLightColor: '#ecf9f6',
    gradientColor: 'linear-gradient(90deg,#54e5b0 24.37%,#008445 78.07%)',
    shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
    lightShadowColor: '0 2px 4px rgba(61, 190, 163, 0.24), 0 4px 8px rgba(61, 190, 163, 0.16)',
  },
  {
    name: 'violet',
    borderRadius: '8px',
    solidColor: 'rgb(229,46,113)',
    solidLightColor: 'rgba(229,46,113, .2)',
    gradientColor: 'linear-gradient(to top left,#ff8a00,#e52e71)',
    shadowColor: '0px 2px 10px rgba(229,46,113, 0.5)',
    lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
  },
  {
    name: 'black',
    borderRadius: '8px',
    solidColor: 'rgb(70, 70, 70)',
    solidLightColor: 'rgb(200, 200, 200)',
    gradientColor: 'linear-gradient(108.88deg, rgb(121, 121, 121) 0%, rgb(70, 70, 70) 100%)',
    shadowColor: '0px 2px 10px rgba(70, 70, 70, 0.5)',
    lightShadowColor: '0 2px 4px rgba(0, 0, 0, 0.22), 0 4px 8px rgba(0, 0, 0, 0.04)',
  },
]
export const ACTION = {
  INSERT: 1,
  UPDATE: 2,
  DELETE: 3,
  ACTIVE: 4,
  INACTIVE: 5,
}

export const EXECUTION_TYPE_ID = {
  ADD_BUSINESS: 1001001,
  UPDATE_BUSINESS: 1001002,
  ADD_USER: 1002001,
  UPDATE_USER: 1002002,
  ADD_MERCHANT: 3001001,
  UPDATE_MERCHANT: 3001002,
}
export const REPRESENTATIVE_TYPE = {
  LEGAL_REPRESENTATIVE: 1,          // Đại diện theo pháp luật
  AUTHORIZED_REPRESENTATIVE: 2,      // Đại diện ủy quyền
}
export const USER_ID = {
  NOT_ACTIVE_AND_KYC: 1,          // Đại diện theo pháp luật
  LOCKED: 2,
  NOT_LINK_BANK: 2,
  CLOSED: -9,
}


export const INFO_COLOR = '#0465B0'
export const SUCCESS_COLOR = '#52c41a'
export const WARNING_COLOR = '#faad14'
export const ERROR_COLOR = 'red'
export const INFO_TITLE = 'Thông báo'
export const SUCCESS_TITLE = 'Thông báo'
export const WARNING_TITLE = 'Cảnh báo'
export const ERROR_TITLE = 'Thông báo lỗi'
export const TEXT_403 = 'Bạn không có quyền sử dụng chức năng này'
export const PROPERTIES_KEY = {
  MERCHANT_TYPE: 'merchantType',
  BUSINESS_TYPE_MERCHANT: 'businessTypeMerchant',
  BUSINESS_AREAS: 'businessAreas',
  ACTIVE_BRANCH: 'activeBranch',
  GROUP_CUSTOMER: 'groupCustomer',
  REPRESENTATIVE_TYPE: 'representativeType',
  GENDER: 'gender',
  DOCUMENT_TYPE: 'documentType',
}
export const PAYMENT_TYPE = {
  MBFBANK: {
    VALUE: '7',
    DESCRIPTION: 'Thẻ ATM nội địa',
  },
  INTCARD: {
    VALUE: '8',
    DESCRIPTION: 'Thẻ quốc tế',
  },
  MBFWALLET: {
    VALUE: '10',
    DESCRIPTION: 'Ví điện tử',
  },
}