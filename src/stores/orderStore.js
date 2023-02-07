import { action, autorun, observable } from 'mobx'
import { orderRequest } from '../requests/orderRequest'
import moment from 'moment'
import dateUtils from '../utils/dateUtils'
import { EXECUTION_ORDER_STATUS, RESPONSE_CODE } from '../utils/constant'

class orderStore {
  // region User
  @action createUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.createUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action confirmApprovalUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.confirmApprovalUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listAllRegisterUserExecutions = []
  @observable totalAllRegisterUserExecutions = 0
  @observable objFilterAllRegisterUserExecutions = {
    PageIndex: 1,
    PageSize: 10,
    FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
    ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
    CreatedUser: null,
    UserName: null,
    ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
    SearchByCreatedDate: true,
    Passport: null,
  }
  @action resetObjFilterAllRegisterUserExecutions = () => {
    this.objFilterAllRegisterUserExecutions = {
      PageIndex: 1,
      PageSize: 10,
      FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
      ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
      CreatedUser: null,
      UserName: null,
      ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
      SearchByCreatedDate: true,
      Passport: null,
    }
  }
  @action getUserExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getUserExecutions(this.objFilterAllRegisterUserExecutions)
        .then(response => {
          this.listAllRegisterUserExecutions = response?.data?.param
          this.totalAllRegisterUserExecutions = response?.data?.totalCount
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getAllUserExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getAllUserExecutions(this.objFilterAllRegisterUserExecutions)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action deleteUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action deleteEditUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteEditUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action updateCreateUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.updateCreateUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getMembersDetailByAccountName = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.getMembersDetailByAccountName(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action createEditUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.createEditUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateEditUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.updateEditUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action confirmApprovalEditUserExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.confirmApprovalEditUserExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable userExecutionDetail = null
  @action getUserExecutionDetail = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.getUserExecutionDetail(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            this.userExecutionDetail = response?.data?.param
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  // endregion

  // region Business
  @action ValidateBusiness = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.ValidateBusiness(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action createBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.createBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action approveBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.approveBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action createEditBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.createEditBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action approveEditBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.approveEditBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action updateBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.updateBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action updateEditBusinessExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.updateEditBusinessExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listAllBusinessExecutions = []
  @observable totalAllBusinessExecutions = 0
  @observable objFilterAllBusinessExecutions = {
    PageIndex: 1,
    PageSize: 10,
    FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
    ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
    CreatedUser: null,
    FullName: null,
    ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
    SearchByCreatedDate: true,
    Passport: null,
  }
  @action resetObjFilterAllBusinessExecutions = () => {
    this.objFilterAllBusinessExecutions = {
      PageIndex: 1,
      PageSize: 10,
      FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
      ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
      CreatedUser: null,
      FullName: null,
      ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
      SearchByCreatedDate: true,
      Passport: null,
    }
  }
  @action getBusinessExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getBusinessExecutions(this.objFilterAllBusinessExecutions)
        .then(response => {
          this.listAllBusinessExecutions = response?.data?.param
          this.totalAllBusinessExecutions = response?.data?.totalCount
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getAllBusinessExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getAllBusinessExecutions(this.objFilterAllBusinessExecutions)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  // endregion

  // region BusinessManager
  @observable objFilterBusiness = {
    pageIndex: 1,
    pageSize: 10,
    passport: '',
  }
  @observable business = []
  // @observable totalCountBusiness = 0
  @action resetBusiness = () => {
    this.business = []
  }
  @action resetObjFilterBusiness = () => {
    this.objFilterBusiness = {
      pageIndex: 1,
      pageSize: 10,
      passport: '',
    }
  }

  @action getBusiness = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getBusiness(this.objFilterBusiness)
        .then(response => {
          this.business = response?.data?.param
          // this.totalCountBusiness = response?.data?.totalCount
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action getBusinessDetail = (organizationID) => {
    return new Promise((resolve, reject) => {
      orderRequest.getBusinessDetail({ organizationID })
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action deleteBusinessExecution = (executionID) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteBusinessExecution(executionID)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action deleteEditBusinessExecution = (executionID) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteEditBusinessExecution(executionID)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  // endregion

  // region Merchant
  @action createMerchantExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.createMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable listMerchantExecutions = []
  @observable totalMerchantExecutions = 0
  @observable objFilterMerchantExecutions = {
    PageIndex: 1,
    PageSize: 10,
    FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
    ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
    CreatedUser: null,
    FullName: null,
    ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
    SearchByCreatedDate: true,
    TaxCode: null,
  }
  @action resetObjFilterMerchantExecutions = () => {
    this.objFilterAllMerchantExecutions = {
      PageIndex: 1,
      PageSize: 10,
      FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
      ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
      CreatedUser: null,
      FullName: null,
      ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
      SearchByCreatedDate: true,
      TaxCode: null,
    }
  }

  @observable objFilterAllMerchantExecutions = {
    PageIndex: 1,
    PageSize: 10000000,
    FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
    ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
    CreatedUser: null,
    FullName: null,
    ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
    SearchByCreatedDate: true,
    TaxCode: null,
  }
  @action resetObjFilterAllMerchantExecutions = () => {
    this.objFilterAllMerchantExecutions = {
      PageIndex: 1,
      PageSize: 10000000,
      FromDate: dateUtils.convertToMillisecondsStartOfDay(moment().startOf('month')),
      ToDate: dateUtils.convertToMillisecondsEndOfDay(moment()),
      CreatedUser: null,
      FullName: null,
      ExecutionOrderStatus: EXECUTION_ORDER_STATUS.WAIT_APPROVAL,
      SearchByCreatedDate: true,
      TaxCode: null,
    }
  }
  @action getMerchantExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getMerchantExecutions(this.objFilterMerchantExecutions)
        .then(response => {
          this.listMerchantExecutions = response?.data?.param
          this.totalMerchantExecutions = response?.data?.totalCount
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getAllMerchantExecutions = () => {
    return new Promise((resolve, reject) => {
      orderRequest.getMerchantExecutions(this.objFilterAllMerchantExecutions)
        .then(response => {
          this.listAllMerchantExecutions = response?.data?.param
          this.totalAllMerchantExecutions = response?.data?.totalCount
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action approveMerchantExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.approveMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action approveEditMerchantExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.approveEditMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action getMerchant = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.getMerchant(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action deleteMerchantExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action deleteEditMerchantExecution = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.deleteEditMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action createEditMerchantExecution = (payload) => { // Tạo yêu cầu thay đổi thông tin merchant
    return new Promise((resolve, reject) => {
      orderRequest.createEditMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateMerchantExecution = (payload) => { // Sửa yêu cầu thêm mới hồ sơ merchant
    return new Promise((resolve, reject) => {
      orderRequest.updateMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateEditMerchantExecution = (payload) => { // Sửa yêu cầu thay đổi thông tin merchant
    return new Promise((resolve, reject) => {
      orderRequest.updateEditMerchantExecution(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  // Lấy thông tin ví doanh nghiệp đã có theo taxCode để fill form tạo merchant, kiểm tra thông tin mã số thuế đã có trong hệ thống hoặc được dùng để tạo lệnh chưa
  @action checkExistBusiness = (payload) => {
    return new Promise((resolve, reject) => {
      orderRequest.checkExistBusiness(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  // endregion
}

export default new orderStore()
