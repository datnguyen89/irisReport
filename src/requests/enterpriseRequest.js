import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import commonStore from '../stores/commonStore'

const source = axios.CancelToken.source()

export const enterpriseRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  createEnterprise: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/Create`,
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
