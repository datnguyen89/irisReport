/** Use only with Antd Form */
/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */
import React from 'react'
import dateUtils from './utils/dateUtils'

const validator = {
  validateRangePickerExport: (rule, value, callback) => {
    const monthFrom = dateUtils.getAbsoluteMonths(value[0])
    const monthTo = dateUtils.getAbsoluteMonths(value[1])
    const dayFrom = Number(value[0].format('DD'))
    const dayTo = Number(value[1].format('DD'))

    if ((monthTo - monthFrom > 3) || ((monthTo - monthFrom === 3) && dayTo > dayFrom)) {
      callback('Thời gian tra cứu không được vượt quá 3 tháng!')
    } else {
      callback()
    }
  },
  validateCurrencyFormat: (rule, value, callback) => {
    const regex = /^[a-zA-Z]{3}/g
    if (value === '') {
      callback(`Should entered a value`)
    } else if (!regex.test(value)) {
      callback(`Incorrect currency format. E.g: 'USD', 'EUR'`)
    }
  },
  validateOnlyStringAndNumber: (rule, value, callback) => {
    const regex = /^[A-Za-z0-9]*$/
    if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số hoặc chữ không dấu không có khoảng trắng!')
    } else {
      callback()
    }
  },
  validateTrim: (rule, value, callback) => {
    const regex = /^\S$|^\S[\s\S]*\S$/
    if (value && !regex.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else {
      callback()
    }
  },
  validateTrimNoSpecial: (rule, value, callback) => {
    const regex = /^\S$|^\S[\s\S]*\S$/
    const regex1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (value && !regex.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (value && regex1.test(value)) {
      callback('Vui lòng loại bỏ ký tự đặc biệt!')
    } else {
      callback()
    }
  },

  validateOnlyStringAndNumberWhiteSpace: (rule, value, callback) => {
    const regex = /^[A-Za-z0-9\s+]*$/
    const regex1 = /^\S$|^\S[\s\S]*\S$/
    if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số hoặc chữ không dấu!')
    } else if (value && !regex1.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else {
      callback()
    }
  },
  validateOnlyNumber: (rule, value, callback) => {
    const regex = /^[0-9]*$/
    if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số!')
    } else {
      callback()
    }
  },
  validateInputString: (rule, value, callback) => {
    const regex = /[!@#$%^*?"{}|<>]/g
    if (value && value.trim() === '') {
      callback(`Please do not leave this field blank.`)
    } else if (regex.test(value)) {
      callback(`Please do not enter special characters: ! @ # $ % ^ * ? " { } | < >`)
    } else {
      callback()
    }
  },

  validateInputStringFolderName: (rule, value, callback) => {
    const regex = /[!@#$%^&*`~]/g
    if (value && value.trim() === '') {
      callback(`Vui lòng nhập tên thư mục`)
    } else if (regex.test(value)) {
      callback(`Tên thư mục chứa ký tự !@#$%^^&*\`~ không hợp lệ`)
    } else {
      callback()
    }
  },

  validateWebsite: (rule, value, callback) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
    if (value && !regex.test(value)) {
      callback('Incorrect website format!')
    } else {
      callback()
    }
  },

  validateEmail: (rule, value, callback) => {
    // const regex = /^[A-Za-z][A-Za-z0-9-_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9_-]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !regex.test(value)) {
      callback('Email không đúng định dạng')
    } else {
      callback()
    }
  },

  validateAmountMoney: (rule, value, callback) => {
    if (value === undefined || value === null || value.length === 0) {
      callback('Vui lòng nhập số tiền cần chuyển')
    } else if (value <= 0) {
      callback('Số tiền chuyển phải lớn hơn 0')
    } else {
      callback()
    }
  },

  validateIntegerNumber: (rule, value, callback) => {
    if (value && !Number.isInteger(value)) {
      callback('Not an integer number')
    } else if (value && value < 0) {
      callback('Negative number not allowed')
    } else {
      callback()
    }
  },

  validateNumberFormat: (rule, value, callback) => {
    const regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/g
    if (value && value.trim() === '') {
      callback('Do not leave this field blank')
    } else if (isNaN(value) && value !== '' && value !== undefined) {
      callback(`Not a number`)
    } else if (value !== '' && value !== undefined && regex.test(value) === false) {
      callback(`Incorrect number format. Remove 0 from start, space or special characters`)
    } else if (value < 0) {
      callback(`Should be greater than 0`)
    } else {
      callback()
    }
  },


  validateVietnameseIdNumber: (rule, value, callback) => {
    const regex = /[0-9]{9,}/g
    if (value && !regex.test(value)) {
      callback('Số CMND không hợp lệ')
    } else {
      callback()
    }
  },
  validateNoteShare: (rule, value, callback) => {
    if (value && value.length > 200) {
      callback(profileStore?.appLanguage === 'en' ? 'Message length exceeds 200 characters' : 'Độ dài lời nhắn vượt quá 200 ký tự')
    } else {
      callback()
    }
  },
  validateLoginPassword: (rule, value, callback) => {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-=]).{8,}$/
    let inputValue = value?.trim()
    if (!inputValue) {
      callback('Vui lòng nhập mật khẩu')
    } else if (!regex.test(inputValue)) {
      callback('Mật khẩu tối thiểu 8 ký tự gồm số, chữ không dấu, ít nhất 1 ký tự đặc biệt')
    } else {
      callback()
    }
  },
  validateChangePassword: (rule, value, callback) => {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-=]).{8,}$/
    let inputValue = value?.trim()
    if (!inputValue) {
      callback('Vui lòng nhập mật khẩu mới')
    } else if (!regex.test(inputValue)) {
      callback('Mật khẩu tối thiểu 8 ký tự gồm số, chữ không dấu, ít nhất 1 ký tự đặc biệt')
    } else {
      callback()
    }
  },
  validatePhoneNumber: (rule, value, callback) => {
    const regexVinaphone = /^\+?(84|0)((88|9[14]|8[12345])\d{7})$/g
    const regexViettel = /^\+?(84|0)((86|9[678]|3[23456789])\d{7})$/g
    const regexMobifone = /^\+?(84|0)((89|121|9[03]|7[06789])\d{7})$/g
    const regexVietnamobile = /^\+?(84|0)((92|5[268])\d{7})$/g
    const regexGTel = /^\+?(84|0)((99|59)\d{7})$/g
    const regexITelecom = /^\+?(84|0)((87)\d{7})$/g
    const regexREDDI = /^\+?(84|0)((55)\d{7})$/g
    if (
      value &&
      (
        !regexVinaphone.test(value)
        && !regexViettel.test(value)
        && !regexMobifone.test(value)
        && !regexVietnamobile.test(value)
        && !regexGTel.test(value)
        && !regexITelecom.test(value)
        && !regexREDDI.test(value)
      )
    ) {
      callback('Số điện thoại không đúng định dạng')
    } else {
      callback()
    }
  },

  validatePassword: (rule, value, callback) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (value && (!regex.test(value.trim()) || value.trim().length > 40)) {
      callback('Mật khẩu phải bao gồm chữ thường, viết hoa, chữ số, ký tự đặc biệt, tối thiểu 8 ký tự, tối đa 40 ký tự')
    } else {
      callback()
    }
  },
  validatePasswordShare: (rule, value, callback) => {
    if (value && (value.trim().length > 40)) {
      callback(profileStore?.appLanguage === 'en' ? 'Password can be up to 40 characters' : 'Mật khẩu có độ dài tối đa 40 ký tự')
    } else {
      callback()
    }
  },
  validatePasswordNew: (rule, value, callback) => {
    if (value && value.trim().length === 0) {
      callback(profileStore?.appLanguage === 'en' ? 'Please enter a password' : 'Vui lòng nhập mật khẩu')
    } else if (value && (value.trim().length > 18 || value.trim().length < 6)) {
      callback(profileStore?.appLanguage === 'en' ? 'Password can be up from 6 to 18 characters' : 'Mật khẩu có độ dài từ 6 đến 18 ký tự')
    } else {
      callback()
    }
  },
  validateSameOrBeforeDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrBefore(currentDate)
    if (!check) {
      callback('Should select the moment equal or before current moment!')
    } else {
      callback()
    }
  },

  validateSameOrAfterDate: (rule, value, callback) => {
    if (utils.isNullish(value)) {
      callback()
      return
    }
    const currentDate = moment().format('YYYY-MM-DD')
    const compareDate = moment(value).format('YYYY-MM-DD')
    const check = moment(compareDate).isSameOrAfter(currentDate)
    if (!check) {
      callback('Should select the moment equal or after current moment!')
    } else {
      callback()
    }
  },


}

export default validator
