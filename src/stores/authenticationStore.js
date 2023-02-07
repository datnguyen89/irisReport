import { action, autorun, observable } from 'mobx'
import { authenticationRequest } from '../requests/authenticationRequest'
import { propertyRequest } from '../requests/propertyRequest'
import { APP_CLIENT_ID, RESPONSE_CODE } from '../utils/constant'
import stringUtils from '../utils/stringUtils'
import commonStore from './commonStore'

class authenticationStore {
  constructor() {
    autorun(() => {
      this.jwtDecode = this.accessToken ? stringUtils.jwtDecode(this.accessToken) : undefined
    })
    autorun(() => {
      this.roles = this.jwtDecode ? this.jwtDecode?.role : undefined
    })
    autorun(() => {
      this.currUserName = this.jwtDecode ? this.jwtDecode?.UniqueUserName : ''
    })

  }

  @observable connection = null

  @action setConnection = (e) => {
    this.connection = e
  }

  @observable roles = undefined
  @action checkRole = e => {
    if (!this.roles || this.roles?.length === 0) return false
    if (typeof this.roles === 'string') {
      return e === this.roles
    } else {
      return this.roles.includes(e)
    }

  }
  @action checkMultipleRole = e => {
    // Check nếu có ít nhất 1 quyền trong e thì hiển thị
    if (!this.roles || this.roles?.length === 0) return false
    if (typeof this.roles === 'string') {
      return e.includes(this.roles)
    } else {
      return this.roles.some(r => e.includes(r))
    }
  }

  @observable currUserName
  @observable jwtDecode = undefined
  @observable accessToken = localStorage.getItem('jwt') || undefined
  @observable refreshToken = localStorage.getItem('refreshToken') || undefined
  @observable tokenKey = localStorage.getItem('tokenKey') || undefined
  @observable extendData = localStorage.getItem('extendData') || undefined

  @action userLogin = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.userLogin(payload)
        .then(response => {
          switch (response.data?.responseCode) {
            case RESPONSE_CODE.SUCCESS:
              let param = response.data?.param
              const tokenData = param?.token
              const tokenKeyData = param?.tokenKey
              const refreshTokenData = param?.refreshToken
              const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
              const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined
              let extendData = response.data?.extendData

              localStorage.setItem('jwt', tokenData)
              localStorage.setItem('tokenKey', tokenKeyData)
              localStorage.setItem('extendData', extendData)
              localStorage.setItem('refreshToken', refreshTokenData)

              this.jwtDecode = jwtDecodeData
              this.roles = rolesData

              this.accessToken = tokenData
              this.refreshToken = refreshTokenData
              this.tokenKey = tokenKeyData
              this.currUserName = param?.username
              this.extendData = extendData
              break
            default:
              break
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action activeDevice = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.activeDevice(payload)
        .then(response => {
          switch (response.data?.responseCode) {
            case RESPONSE_CODE.SUCCESS:
              let param = response.data?.param
              const tokenData = param?.token
              const tokenKeyData = param?.tokenKey
              const refreshTokenData = param?.refreshToken

              const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
              const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined
              let extendData = response.data?.extendData

              localStorage.setItem('jwt', tokenData)
              localStorage.setItem('tokenKey', tokenKeyData)
              localStorage.setItem('extendData', extendData)
              localStorage.setItem('refreshToken', refreshTokenData)

              this.jwtDecode = jwtDecodeData
              this.roles = rolesData

              this.accessToken = tokenData
              this.refreshToken = refreshTokenData
              this.tokenKey = tokenKeyData
              this.currUserName = param?.username
              this.extendData = extendData
              break
            default:
              break
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action authentication = (payload) => {
    return new Promise((resolve, reject) => {
      // if (localStorage.getItem('jwt')) {
      //   const tokenData = localStorage.getItem('jwt')
      //   const tokenKeyData = payload?.cmsToken
      //   const extendData = payload?.extendData
      //
      //   const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
      //   const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined
      //
      //   localStorage.setItem('jwt', tokenData)
      //   localStorage.setItem('tokenKey', tokenKeyData)
      //   localStorage.setItem('extendData', extendData)
      //   localStorage.setItem('refreshToken', payload?.refreshToken)
      //
      //   this.jwtDecode = jwtDecodeData
      //   this.roles = rolesData
      //
      //   this.accessToken = tokenData
      //   this.refreshToken = payload?.refreshToken
      //   this.tokenKey = tokenKeyData
      //   this.currUserName = jwtDecodeData?.UniqueUserName
      //   this.extendData = extendData
      //   resolve()
      // } else {
      //   authenticationRequest.reInvokeToken({
      //     CurrentToken: payload?.accessToken,
      //     ClientID: APP_CLIENT_ID,
      //   })
      //     .then(response => {
      //       switch (response.data?.responseCode) {
      //         case RESPONSE_CODE.SUCCESS:
      //           const tokenData = response.data?.param
      //           const tokenKeyData = payload?.cmsToken
      //           const extendData = payload?.extendData
      //
      //           const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
      //           const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined
      //
      //           localStorage.setItem('jwt', tokenData)
      //           localStorage.setItem('tokenKey', tokenKeyData)
      //           localStorage.setItem('extendData', extendData)
      //           localStorage.setItem('refreshToken', payload?.refreshToken)
      //
      //           this.jwtDecode = jwtDecodeData
      //           this.roles = rolesData
      //
      //           this.accessToken = tokenData
      //           this.refreshToken = payload?.refreshToken
      //           this.tokenKey = tokenKeyData
      //           this.currUserName = jwtDecodeData?.UniqueUserName
      //           this.extendData = extendData
      //           break
      //         default:
      //           break
      //       }
      //       resolve(response.data)
      //     })
      //     .catch(error => reject(error))
      // }
      authenticationRequest.reInvokeToken({
        CurrentToken: payload?.accessToken,
        ClientID: APP_CLIENT_ID,
      })
        .then(response => {
          switch (response.data?.responseCode) {
            case RESPONSE_CODE.SUCCESS:
              const tokenData = response.data?.param
              const tokenKeyData = payload?.cmsToken
              const extendData = payload?.extendData

              const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
              const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined

              localStorage.setItem('jwt', tokenData)
              localStorage.setItem('tokenKey', tokenKeyData)
              localStorage.setItem('extendData', extendData)
              localStorage.setItem('refreshToken', payload?.refreshToken)

              this.jwtDecode = jwtDecodeData
              this.roles = rolesData

              this.accessToken = tokenData
              this.refreshToken = payload?.refreshToken
              this.tokenKey = tokenKeyData
              this.currUserName = jwtDecodeData?.UniqueUserName
              this.extendData = extendData
              break
            default:
              break
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @observable userProfile = null
  @action getUserProfile = () => {
    return new Promise((resolve, reject) => {
      authenticationRequest.getUserProfile()
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS && response?.data?.param?.length > 0) {
            this.userProfile = JSON.parse(response?.data?.param)
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action logout = () => {
    return new Promise((resolve, reject) => {
      authenticationRequest.logout()
      this.accessToken = undefined
      this.refreshToken = undefined
      this.tokenKey = undefined

      this.roles = undefined
      this.jwtDecode = undefined
      this.extendData = undefined

      commonStore.resetIpAddress()

      localStorage.removeItem('jwt')
      localStorage.removeItem('tokenKey')
      localStorage.removeItem('currUserName')
      localStorage.removeItem('extendData')
      localStorage.removeItem('ipAddress')
      localStorage.removeItem('refreshToken')

      resolve()
    })
  }

  @observable editingUserId = null
  @observable editingRoles = null
  @action resetEditingUser = () => {
    this.editingUserId = null
    this.editingRoles = null
  }
  @action getUserInfoWithRolesByUserName = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.getUserInfoWithRolesByUserName(payload)
        .then(response => {
          if (response.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let param = JSON.parse(response.data?.param)
            this.editingUserId = param.userId
            this.editingRoles = param.roleIds
          }

          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @observable listTreeRoleByRoleType = null
  @action resetTreeRole = () => {
    this.listTreeRoleByRoleType = null
  }
  @action getTreeRoleByRoleType = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.getTreeRoleByRoleType(payload)
        .then(response => {
          if (response?.data?.responseCode === RESPONSE_CODE.SUCCESS) {
            let param = JSON.parse(response?.data?.param)
            this.listTreeRoleByRoleType = param?.treeRolesModel?.children
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateRoleUser = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.updateRoleUser(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  @action changePassword = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.changePassword(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action forgotPasswordCMSCustomer = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.forgotPasswordCMSCustomer(payload)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action handleRefreshToken = (payload) => {
    return new Promise((resolve, reject) => {
      authenticationRequest.refreshToken(payload)
        .then(response => {
          switch (response.data?.responseCode) {
            case RESPONSE_CODE.SUCCESS:
              const tokenData = response.data?.param
              console.log(tokenData)
              const jwtDecodeData = tokenData ? stringUtils.jwtDecode(tokenData) : undefined
              const rolesData = jwtDecodeData ? jwtDecodeData?.role : undefined

              localStorage.setItem('jwt', tokenData)

              this.accessToken = tokenData
              this.jwtDecode = jwtDecodeData
              this.roles = rolesData
              break
            default:
              break
          }
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

}

export default new authenticationStore()
