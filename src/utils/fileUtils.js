import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

const fileUtils = {
  getBase64: (file, callback) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      callback(reader.result)
    }
    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
  },

  getFileExt: (fileName) => {
    const lastDot = fileName?.lastIndexOf('.')
    return fileName?.substring(lastDot)
  },
  exportToXlsx: (heading, apiData, fileName, sheetName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'
    const ws = XLSX.utils.json_to_sheet(apiData)
    XLSX.utils.sheet_add_aoa(ws, heading)
    let sheet = {}
    sheet[sheetName] = ws
    const wb = { Sheets: { ...sheet }, SheetNames: [sheetName] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  },
  saveAsFile: (fileName, byteBase64) => {
    if (byteBase64 === 'error') return
    var link = document.createElement('a')
    link.download = fileName
    link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + byteBase64
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  saveAsFilePdf: (fileName, byteBase64) => {
    var link = document.createElement('a')
    link.download = fileName
    link.href = 'data:application/pdf;base64,' + byteBase64
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}

export default fileUtils
