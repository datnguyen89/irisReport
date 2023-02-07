import { action, autorun, observable } from 'mobx'
import { merchantRequest } from '../requests/merchantRequest'
import { RESPONSE_CODE } from '../utils/constant'

class merchantStore {
  @observable merchantIntegration = null

  @action resetMerchantIntegration = () => {
    this.merchantIntegration = null
  }

  @action getMerchantIntegration = (payload) => {
    return new Promise((resolve, reject) => {
      merchantRequest.getMerchantIntegration(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            this.merchantIntegration = response?.data?.param
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
   @action integrateMerchant = (payload) => {
    return new Promise((resolve, reject) => {
      merchantRequest.integrateMerchant(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

}

export default new merchantStore()
