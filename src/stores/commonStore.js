import { action, observable } from 'mobx'
import { commonRequest } from '../requests/commonRequest'
import { THEME_LIST } from '../utils/constant'

class commonStore {
  @observable appLoading = 0
  @action setAppLoading = status => {
    if (status) {
      this.appLoading = this.appLoading + 1
    } else if (this.appLoading > 0) {
      this.appLoading = this.appLoading - 1
    }
  }
  @observable pageName = null
  @action setPageName = name => {
    this.pageName = name
  }
  // ipAddress
  @observable ipAddress = localStorage.getItem('ipAddress') || ''
  @action resetIpAddress = () => {
    this.ipAddress = null
  }
  @action getMyIp = () => {
    return new Promise((resolve, reject) => {
      commonRequest.getMyIp()
        .then(response => {
          this.ipAddress = response?.data?.ip
          localStorage.setItem('ipAddress', response?.data?.ip)
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  // Device
  @observable device = null

  @action setDevice(device) {
    this.device = device
  }

  // App theme
  @observable appTheme = JSON.parse(localStorage.getItem('appTheme')) || THEME_LIST[0]
  @action setTheme = name => {
    let newTheme = THEME_LIST.find(item => item.name === name)
    if (newTheme) {
      localStorage.setItem('appTheme', JSON.stringify(newTheme))
      this.appTheme = newTheme
    } else {
      this.appTheme = THEME_LIST[0]
    }
  }

  // Mouse coordinate
  @observable mouseCoordinate = {
    x: 0,
    y: 0,
  }

  @action setMouseCoordinate(x, y) {
    this.mouseCoordinate = { x: x, y: y }
  }

  // App language
  @observable appLanguage = 'vi'

  @action setAppLanguage(lang) {
    this.appLanguage = lang
  }

  // Sidebar collapse
  @observable isCollapse = JSON.parse(localStorage.getItem('isCollapse')) || false

  @action setIsCollapse(status) {
    localStorage.setItem('isCollapse', status)
    this.isCollapse = status
  }

  @action deleteSizeCache = () => {
    return new Promise((resolve, reject) => {
      commonRequest.deleteSizeCache()
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  @observable firstLoadToken = true
  @action setFirstLoadToken = status => {
    this.firstLoadToken = status
  }
}

export default new commonStore()
