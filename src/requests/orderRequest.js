import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import commonStore from '../stores/commonStore'

const source = axios.CancelToken.source()

export const orderRequest = {
  cancelRequest: () => {
    source.cancel()
  },

  // region User
  createUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  confirmApprovalUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ConfirmApprovalUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getUserExecutions: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUserExecutions`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getAllUserExecutions: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetAllUserExecutions`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getUserExecutionDetail: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUserExecutionDetail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  deleteUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  deleteEditUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteEditUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  updateCreateUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateCreateUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getMembersDetailByAccountName: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetMembersDetailByAccountName`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  createEditUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateEditUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  updateEditUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateEditUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  confirmApprovalEditUserExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ConfirmApprovalEditUserExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  // endregion

  // region Business
  createBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  approveBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ApproveBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  createEditBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateEditBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  approveEditBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ApproveEditBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getBusinessExecutions: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetBusinessExecutions`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getAllBusinessExecutions: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetAllBusinessExecutions`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  ValidateBusiness: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ValidateBusiness`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  // endregion

  // region BusinessManager
  getBusiness: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetBusiness`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  getBusinessDetail: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetOrganizationDetail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  deleteBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  deleteEditBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteEditBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  updateBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  updateEditBusinessExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateEditBusinessExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  // endregion

  // region Merchant
  createMerchantExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getMerchantExecutions: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetMerchantExecutions`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  approveMerchantExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ApproveMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  approveEditMerchantExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ApproveEditMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getMerchant: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetMerchant`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  deleteMerchantExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  deleteEditMerchantExecution: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/DeleteEditMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  createEditMerchantExecution: (payload) => { // Tạo yêu cầu thay đổi thông tin merchant
    return axios({
      method: 'post',
      url: `${apiUrl}/CreateEditMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  updateMerchantExecution: (payload) => { // Sửa yêu cầu thêm mới hồ sơ merchant
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  updateEditMerchantExecution: (payload) => { // Sửa yêu cầu thay đổi thông tin merchant
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateEditMerchantExecution`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  checkExistBusiness: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/CheckTaxCodeExisted`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      disableAutoError: true,
    })
  },
  // endregion
}