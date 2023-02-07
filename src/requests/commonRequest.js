import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()
export const commonRequest = {
  cancelRequest: () => {
    source.cancel()
  },

  getMyIp: () => {
    return axios({
      method: 'get',
      url: `https://api.ipify.org?format=json`,
      headers: {
        'Content-Type': 'application/json',
      },
      disabledEncrypted: true,
      disabledSpinner: true,
    })
  },
}