import { action, autorun, observable } from 'mobx'
import { propertyRequest } from '../requests/propertyRequest'
import { RESPONSE_CODE } from '../utils/constant'

class propertyStore {
  constructor() {
    autorun(() => {
      this.hostFileUpload = this.commonProperty?.hosts.find(item => item?.name === 'FileUploadHost')?.value || ''
    })
  }

  @observable hostFileUpload = ''
  @observable listNational = []
  @observable listCity = []
  @observable listDistrict = []
  @observable listWards = []

  @action getListNational = () => {
    return new Promise((resolve, reject) => {
      propertyRequest.getLocation({ locationLevel: 1 })
        .then(response => {
          this.listNational = response?.data?.param
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getListCity = () => {
    return new Promise((resolve, reject) => {
      propertyRequest.getLocation({ locationLevel: 2 })
        .then(response => {
          this.listCity = response?.data?.param
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getListDistrict = () => {
    return new Promise((resolve, reject) => {
      propertyRequest.getLocation({ locationLevel: 3 })
        .then(response => {
          this.listDistrict = response?.data?.param
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getListWards = () => {
    return new Promise((resolve, reject) => {
      propertyRequest.getLocation({ locationLevel: 4 })
        .then(response => {
          this.listWards = response?.data?.param
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable commonProperty = null
  @observable executionOrderStatus = null
  @action getCommonProperty = () => {
    return new Promise((resolve, reject) => {
      propertyRequest.getCommonProperty()
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let param = response?.data?.param
            if (param?.executionOrderStatus?.length > 0) {
              this.executionOrderStatus = [...param?.executionOrderStatus]?.filter(item => ['WAIT_APPROVAL', 'APPROVED', 'REJECT'].includes(item.name))
            }
            this.commonProperty = param
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listTreeRoleByRoleType = []
  @observable listRoleDefault = []
  @action resetTreeRole = () => {
    this.listTreeRoleByRoleType = []
    this.listRoleDefault = []
  }
  @action getTreeRoleByRoleType = (payload) => {
    return new Promise((resolve, reject) => {
      propertyRequest.getTreeRoleByRoleType(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let param = JSON.parse(response?.data?.param)
            this.listTreeRoleByRoleType = param?.treeRolesModel?.children
            this.listRoleDefault = param?.rolesDefaultModel
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

}

export default new propertyStore()
