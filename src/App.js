import React from 'react'
import { apiUrl } from './config'
// Encrypt
import cypherUtil from './utils/cypherUtil'
import stringUtils from './utils/stringUtils'
// Axios
import axios from 'axios'
// Styling
import './App.less'
import ThemeProvider from './providers/ThemeProvider'
import 'antd/es/modal/style'
import 'antd/es/slider/style'
// React Router
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// MobX
import { Provider } from 'mobx-react'
import commonStore from './stores/commonStore.js'
import authenticationStore from './stores/authenticationStore.js'
import enterpriseStore from './stores/enterpriseStore.js'
import propertyStore from './stores/propertyStore.js'
import departmentStore from './stores/departmentStore.js'
import orderStore from './stores/orderStore.js'
import fileStore from './stores/fileStore.js'
import reportStore from './stores/reportStore.js'
import merchantStore from './stores/merchantStore.js'

//moment
import moment from 'moment'
import 'moment/locale/vi'
import {
  ERROR_COLOR,
  ERROR_TITLE,
  PAGES,
  RESPONSE_CODE,
  TEXT_403,
  WARNING_COLOR,
  WARNING_TITLE,
} from './utils/constant'
// Pages
import NotPermissionPage from './pages/WebApp/NotPermissionPage'
import NotFoundPage from './pages/WebApp/NotFoundPage'
import TestPage from './pages/WebApp/TestPage'
import ProtectedModule from './modules/ProtectedModule'
import AuthModule from './modules/AuthModule'
import LoadingOverLay from './components/LoadingOverLay/LoadingOverLay'
import DataProvider from './providers/DataProvider'
import PublicModule from './modules/PublicModule'
import { message, Modal, notification } from 'antd'
import { ColorText } from './components/CommonStyled/CommonStyled'
import AuthenticationPage from './pages/AuthenticationPage'
// ip
const publicIp = require('public-ip')


const history = createBrowserHistory()

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem('jwt') ? (
        <Redirect
          to={{
            pathname: PAGES.LOGIN.PATH,
            state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)

moment.updateLocale('vi', {
  week: {
    dow: 1,
  },
})

const rootStores = {
  commonStore,
  authenticationStore,
  enterpriseStore,
  propertyStore,
  departmentStore,
  orderStore,
  fileStore,
  reportStore,
  merchantStore,
}

message.config({
  duration: 5,
  top: 50,
  maxCount: 1,
})
notification.config({
  duration: 5,
  top: 60,
  maxCount: 1,
  placement: 'top',
})

axios.defaults.timeout = 1800000
let isAlreadyFetchingAccessToken = false
let subscribers = []
const addSubscriber = (callback) => {
  subscribers.push(callback)
}
const onAccessTokenFetched = (token) => {
  subscribers = subscribers.filter((callback) => callback(token))
}

const handleRefreshToken = (originalRequest) => {
  if (!isAlreadyFetchingAccessToken) {
    isAlreadyFetchingAccessToken = true
    new Promise((resolve, reject) => {
      return authenticationStore.handleRefreshToken({ RefreshToken: localStorage.getItem('refreshToken') })
        .then((res) => {
          if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
            isAlreadyFetchingAccessToken = false
            onAccessTokenFetched(res?.param)
          } else {
            authenticationStore.logout()
              .finally(() => {
                history.push({
                  pathname: PAGES.LOGIN.PATH,
                  state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
                })
                notification.destroy()
                Modal.destroyAll()
                notification.error({
                  message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
                  description: 'Phiên đăng nhập hết hạn',
                })
              })
            return reject(error?.message)
          }
        })
        .catch((error) => {
          isAlreadyFetchingAccessToken = false
          authenticationStore.logout()
            .finally(() => {
              history.push({
                pathname: PAGES.LOGIN.PATH,
                state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
              })
              notification.destroy()
              Modal.destroyAll()
              notification.error({
                message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
                description: 'Phiên đăng nhập hết hạn',
              })
            })
          return reject(error?.message)
        })
    })
  }
  const retryOriginalRequest = new Promise(
    (resolve) => {
      addSubscriber((token) => {
        originalRequest.headers.Authorization = 'Bearer ' + token
        return resolve(axios(originalRequest))
      })
    },
  )
  return retryOriginalRequest
}
// axios.defaults.headers.common['Ip-Address'] = commonStore.ipAddress
axios.interceptors.request.use(
  config => {
    if (config.disableSpinner) {
      commonStore.setAppLoading(false)
    } else {
      commonStore.setAppLoading(true)
    }
    if (config._retry) {
      // Nếu là retry sau khi refresh token thì cho đi luôn vì đã mã hóa rồi
      console.log('Nếu là retry sau khi refresh token thì cho đi luôn vì đã mã hóa rồi')
      return config
    }
    console.log('REQUEST', config.url.replace(apiUrl, ''), config.data)
    let k = stringUtils.randomId(16)
    let obj = { key: k, iv: k }
    let strDataKey = JSON.stringify(obj)
    let strData = JSON.stringify({ ...config.data })

    let encryptedDataKey = cypherUtil.rsaEncrypt(strDataKey)
    let encryptedData = cypherUtil.aesEncrypt(strData, k, k)

    if (!config.disabledEncrypted) {
      config.data = { data: encryptedData, objKey: encryptedDataKey }
    }

    return config
  },
  error => {
    commonStore.setAppLoading(false)
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  response => {
    commonStore.setAppLoading(false)
    console.log('RESPONSE', response.config.url.replace(apiUrl, ''), response)
    switch (response.data.responseCode) {
      case 401:
        authenticationStore.logout()
          .finally(() => {
            history.push({
              pathname: PAGES.LOGIN.PATH,
              state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
            })
            notification.destroy()
            Modal.destroyAll()
            notification.error({
              message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
              description: 'Phiên đăng nhập hết hạn',
            })
          })
        break
      case 0:
      case -10021:
      case null:
      case undefined:
        break
      default:
        console.log(response)
        if (!response?.config?.disableAutoError) {
          notification.error({
            message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
            description: response.data?.description,
          })
        }
        break
    }
    return response
  },
  error => {
    const originalConfig = error.config
    commonStore.setAppLoading(false)
    switch (error?.response?.status) {
      case 401:
        if (!originalConfig._retry) {
          originalConfig._retry = true
          return handleRefreshToken(originalConfig)
        } else {
          authenticationStore.logout()
            .finally(() => {
              history.push({
                pathname: PAGES.LOGIN.PATH,
                state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
              })
              notification.destroy()
              Modal.destroyAll()
              notification.error({
                message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
                description: 'Phiên đăng nhập hết hạn',
              })
            })
          return
        }
      case 403:
        history.push({
          pathname: PAGES.HOME.PATH,
        })
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Bạn không có quyền sử dụng chức năng này',
        })
        break
      case 404:
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: 'Chức năng không tồn tại',
        })
        break
      default:
        notification.error({
          message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
          description: error?.message,
        })
        break
    }
    return Promise.reject(error)
  },
)


const App = () => {

  // (async () => {
  //   console.log(await publicIp.v4())
  // })()
  // useEffect(() => {
  //   console.log(deviceDetect())
  // }, [])

  return (
    <Provider {...rootStores}>
      <ThemeProvider>
        <Router history={history}>
          <DataProvider>
            <Switch>
              <Route
                exact path={[
                PAGES.LOGIN.PATH,
                PAGES.FORGOT_PASSWORD.PATH,
              ]}
                component={AuthModule}
              />

              <Route
                exact path={[
                PAGES.TEST.PATH,
              ]}
                component={PublicModule}
              />

              <ProtectedRoute
                exact
                path={[
                  PAGES.HOME.PATH,
                  PAGES.PERSONAL_REPORT.PATH,
                  PAGES.BUSINESS_REPORT.PATH,
                  PAGES.GAMEDETAIL_REPORT.PATH,
                ]}
                component={ProtectedModule}
              />

              <Route exact path={PAGES.TEST.PATH} component={TestPage} />
              <Route exact path={'/authentication'} component={AuthenticationPage} />

              <Route exact path={PAGES.NOT_PERMISSION.PATH}
                     component={NotPermissionPage} /> {/*Không có quyền truy cập*/}
              <Route component={NotFoundPage} />
            </Switch>
          </DataProvider>
        </Router>

        <LoadingOverLay />
      </ThemeProvider>
    </Provider>
  )
}

export default App
