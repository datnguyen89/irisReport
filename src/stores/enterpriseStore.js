import { action, autorun, observable } from 'mobx'
import { enterpriseRequest } from '../requests/enterpriseRequest'

class enterpriseStore {
  @observable formDataStep1 = null
  @observable formDataStep2 = null
  @observable formDataStep3 = null
  @action setFormDataStep1 = data => {
    this.formDataStep1 = data
  }
  @action setFormDataStep2 = data => {
    this.formDataStep2 = data
  }
  @action setFormDataStep3 = data => {
    this.formDataStep3 = data
  }

  @action createEnterprise = (payload) => {
    return new Promise((resolve, reject) => {
      enterpriseRequest.createEnterprise(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}

export default new enterpriseStore()
