import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import commonStore from '../stores/commonStore'

const source = axios.CancelToken.source()

export const fileRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  uploadFile: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UploadFile`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      disabledEncrypted: true,
    })
  },
  uploadMerchantFile: (payload) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/UploadMerchantFile`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authenticationStore.accessToken || ''}`,
        'Token-Core-System': `Bearer ${authenticationStore.tokenKey || ''}`,
        'Ip-Address': commonStore.ipAddress,
      },
      data: payload,
      disabledEncrypted: true,
    })
  },

}
