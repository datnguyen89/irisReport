import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import commonStore from '../stores/commonStore'

const source = axios.CancelToken.source()

export const reportRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  // region Sum
  exportCustomerBillingReportsSum: (payload, source) => {
    return axios({
      disabledSpinner: true,
      method: 'post',
      url: `${apiUrl}/ExportExcelCustomerBillingReportsSum`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      cancelToken: source.token,
    })
  },
  getCustomerBillingReportsSum: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetCustomerBillingReportsSum`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  // endregion

  // region Detail
  exportCustomerBillingReportsDetail: (payload, source) => {
    return axios({
      disabledSpinner: true,
      method: 'post',
      url: `${apiUrl}/ExportExcelCustomerBillingReportsDetail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      cancelToken: source.token,
    })
  },
  getCustomerBillingReportsDetail: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetCustomerBillingReportsDetail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadBatchExecutionFilesByAccountID: (payload) => {
    return axios({
      disabledSpinner: true,
      method: 'post',
      url: `${apiUrl}/LoadBatchExecutionFilesByAccountID`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  // endregion

  // region Statement
  getStatementReport: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetStatementReport`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getStatementReportExcel: (payload, source) => {
    return axios({
      disabledSpinner: true,
      method: 'post',
      url: `${apiUrl}/GetStatementReportExcel`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      cancelToken: source.token,
    })
  },
  getStatementReportPdf: (payload, source) => {
    return axios({
      disabledSpinner: true,
      method: 'post',
      url: `${apiUrl}/GetStatementReportPDF`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      cancelToken: source.token,
    })
  },
  // endregion

  // region common
  getSysVarForReport: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetSysVarForReport`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getInfoAccountNameForReport: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/getInfoAccountNameForReport`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadDepartmentsByUser: (payload) => {
    return axios({
      method: 'get',
      url: `${apiUrl}/LoadDepartmentsByUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadAccountsByMemberID: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/LoadAccountsByMemberID`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  // endregion

  // region personal
  getAccountDetails: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetAccountDetails`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getCrisis: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetCrisis`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getPaymentReport: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetPaymentReport`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getAccountDetailsExcel: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetAccountDetailsExcel`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getCrisisExcel: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetCrisisExcel`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getPaymentReportExcel: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetPaymentReportExcel`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadTypeAccountGroupList: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/LoadSysvar`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadTypeReportList: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/LoadSysvar`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  loadTypeAccountList: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/LoadSysvar`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getFileNameCache: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetFileNameCache`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getCheckListAccountReport: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetCheckListAccountReport`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  bulkInsertListAccount: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/BulkInsertListAccount`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  getGameDetails: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetGameDetails`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getGameDetailsExcel: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetGameDetailsExcel`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getUserDetailsByUserId: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUserDetailsByUserId`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ent-Token-System': `Bearer ${authenticationStore.entTokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  // endregion
}
