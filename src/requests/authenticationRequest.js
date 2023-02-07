import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import commonStore from '../stores/commonStore'

const source = axios.CancelToken.source()

export const authenticationRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  userLogin: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/TransferExtendDataForLoginCMSWebsite`,
      headers: {
        'Content-Type': 'application/json',
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  activeDevice: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/LoginForCMSWebsite`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },


  getUserProfile: () => {
    return axios({
      method: 'get',
      url: `${apiUrl}/GetUserProfile`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
    })
  },
  logout: () => {
    return axios({
      method: 'post',
      url: `${apiUrl}/Logout`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      disableSpinner: true,
    })
  },
  getUserInfoWithRolesByUserName: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetUserInfoWithRolesByUserName`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  getTreeRoleByRoleType: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/GetTreeRoleByRoleType`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  updateRoleUser: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UpdateRoleUser`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

  changePassword: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ChangePasswordForCMS`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  forgotPasswordCMSCustomer: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ForgotPasswordCMSCustomer`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  reInvokeToken: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/ReInvokeToken`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },
  refreshToken: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/RefreshToken`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
    })
  },

}
