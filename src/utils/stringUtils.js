import _ from 'lodash'

const stringUtils = {
  isJson: (str) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  },
  /** Capitalize name */
  getNameInCapitalize: string => string.replace(/(^|\s)\S/g, l => l.toUpperCase()),
  randomId: (length) => {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  },
  /** Bỏ dấu tiếng Việt */
  removeVietnameseCharMark: str => {
    if (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    }
    return str
  },

  /** Decode JWT token */
  jwtDecode: token => {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  },
  renderCapacity: byte => {
    if (byte === null) return ''
    let result
    if (byte < 1000000) {
      result = Math.round((byte / 1024) * 100) / 100
      return `${result} KB`
    } else if (byte < 1000000000) {
      result = Math.round((byte / 1024 / 1024) * 100) / 100
      return `${result} MB`
    } else {
      result = Math.round((byte / 1024 / 1024 / 1024) * 100) / 100
      return `${result} GB`
    }
  },
  parseDataJson: str => {
    let data = null
    try {
      data = JSON.parse(str)
    } catch (e) {
      data = {}
    }
    return data
  },
  objectKeysToCamelCase: (snake_case_object) => {
    var camelCaseObject = {}
    _.forEach(
      snake_case_object,
      function(value, key) {
        if (_.isPlainObject(value) || _.isArray(value)) {                                             // checks that a value is a plain object, not an array or string etc
          value = stringUtils.objectKeysToCamelCase(value)                                   // recursively update keys of any values that are also objects
        }
        camelCaseObject[_.lowerFirst(key)] = value
      },
    )
    return camelCaseObject
  },
}

export default stringUtils
