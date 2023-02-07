import { action, autorun, observable } from 'mobx'
import { departmentRequest } from '../requests/departmentRequest'
import { RESPONSE_CODE } from '../utils/constant'

class departmentStore {

  @observable listDepartment = null
  @observable totalCountDepartment = 0
  @observable objFilterDept = {
    OrganizationID: '',
    PageIndex: 1,
    PageSize: 10,
  }
  @action setObjFilterDept = obj => {
    this.objFilterDept = obj
  }

  @action resetDepartment = () => {
    this.listDepartment = null
    this.objFilterDept = {
      OrganizationID: '',
      PageIndex: 1,
      PageSize: 10,
    }
  }

  @action getDepartmentPagination = () => {
    return new Promise((resolve, reject) => {
      departmentRequest.getDepartmentPagination(this.objFilterDept)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let param = JSON.parse(response?.data?.param)
            this.listDepartment = param?.deptResponseViewModels || []
            this.totalCountDepartment = param?.totalCount || 0
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action addDepartment = (payload) => {
    return new Promise((resolve, reject) => {
      departmentRequest.addDepartment(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action inactiveDepartment = (payload) => {
    return new Promise((resolve, reject) => {
      departmentRequest.inactiveDepartment(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listAccountFilterByAccountName = []
  @observable organizationInfo = null
  @action setListAccountFilterByAccountName = (data) => {
    this.listAccountFilterByAccountName = data
  }
  @action setOrganizationInfo = (data) => {
    this.organizationInfo = data
  }
  @action getAccountsByAccountName = (payload) => {
    return new Promise((resolve, reject) => {
      departmentRequest.getAccountsByAccountName(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let data = JSON.parse(response?.data?.param)
            this.listAccountFilterByAccountName = data?.param
            this.organizationInfo = JSON.parse(data.Attributes)
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listMembersByOrganizationID = []
  @action setListMembersByOrganizationID = (data) => {
    this.listMembersByOrganizationID = data
  }
  @observable orgInfoByOrganizationID = null
  @action setOrgInfoByOrganizationID = (data) => {
    this.orgInfoByOrganizationID = data
  }
  @observable orgPropsByOrganizationID = null
  @action setOrgPropsByOrganizationID = (data) => {
    this.orgPropsByOrganizationID = data
  }

  @action getMembersByOrganizationID = (payload) => {
    return new Promise((resolve, reject) => {
      departmentRequest.getMembersByOrganizationID(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let members = JSON.parse(response?.data?.extendData)
            let orgInfo = JSON.parse(response?.data?.param)
            let orgProps = JSON.parse(response?.data?.responseParam)
            this.listMembersByOrganizationID = members
            this.orgInfoByOrganizationID = orgInfo
            this.orgPropsByOrganizationID = orgProps
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }


}

export default new departmentStore()
