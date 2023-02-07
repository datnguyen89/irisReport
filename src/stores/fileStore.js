import { action, autorun, observable } from 'mobx'
import { fileRequest } from '../requests/fileRequest'
import { departmentRequest } from '../requests/departmentRequest'

class fileStore {
  @action uploadFile = (payload) => {
    return new Promise((resolve, reject) => {
      fileRequest.uploadFile(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action uploadMerchantFile = (payload) => {
    return new Promise((resolve, reject) => {
      fileRequest.uploadMerchantFile(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

}

export default new fileStore()
