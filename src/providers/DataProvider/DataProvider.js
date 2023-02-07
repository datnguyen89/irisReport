import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { wsUrl } from '../../config'
import PropTypes from 'prop-types'
import cypherUtil from '../../utils/cypherUtil'
import moment from 'moment'
import { minuteScaleOnClick } from '../../config'
import { ERROR_COLOR, ERROR_TITLE, FULL_DATE, PAGES } from '../../utils/constant'
import { ColorText } from '../../components/CommonStyled/CommonStyled'
import { Button, Modal, notification } from 'antd'
import { useHistory } from 'react-router-dom'

const signalR = require('@microsoft/signalr')

const DataProvider = props => {
  // region props, hook, state
  const { children, propertyStore, authenticationStore, commonStore } = props

  const history = useHistory()
  // endregion
  // region destructuring
  const { accessToken, tokenKey } = authenticationStore
  const { firstLoadToken } = commonStore
  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleScaleExpiredTime = () => {
    localStorage.setItem('expired', cypherUtil.base64Encrypt(moment().add(minuteScaleOnClick, 'minutes').format(FULL_DATE)))
  }
  // endregion
  // region function render

  // endregion
  // region side effect
  useEffect(() => {
    if (!accessToken) {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl(wsUrl, {
          skipNegotiation: true,
          accessTokenFactory: () => authenticationStore.accessToken,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Debug)
        .withAutomaticReconnect()
        .build()
      authenticationStore.setConnection(connect)
    } else {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl(wsUrl, {
          skipNegotiation: true,
          accessTokenFactory: () => authenticationStore.accessToken,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Debug)
        .withAutomaticReconnect()
        .build()
      authenticationStore.setConnection(connect)
    }
  }, [accessToken])
  useEffect(() => {
    console.log(authenticationStore.connection)
    if (authenticationStore.connection && authenticationStore.connection._connectionState === 'Disconnected') {
      authenticationStore.connection
        .start()
        .then(() => {
          console.log('Connected!')
          authenticationStore.connection.on('UpdateRole', (message) => {
            console.log(message)
            // TODO: update  role
          })

        })
        .catch((error) => console.log(error))
    }
  }, [authenticationStore.currUserName])


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!localStorage.getItem('expired')) {
        localStorage.setItem('expired', cypherUtil.base64Encrypt(moment().add(minuteScaleOnClick, 'minutes').format(FULL_DATE)))
      }
      let exp = moment(cypherUtil.base64Decrypt(localStorage.getItem('expired')), FULL_DATE)
      let now = moment()
      // console.log(exp.format(FULL_DATE), '--', now.format(FULL_DATE))
      if (exp.isBefore(now)) {
        if (authenticationStore.accessToken) {
          authenticationStore.logout()
            .finally(() => {
              history.push({
                pathname: PAGES.LOGIN.PATH,
                state: { from: window.location.pathname?.replace(process.env.PUBLIC_URL, '') },
              })
            })
          notification.destroy()
          Modal.destroyAll()
          notification.error({
            message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
            description: 'Phiên đăng nhập hết hạn',
          })
        }
      } else {
        // Xử lý khi còn hạn
      }
    }, [1000])
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  // endregion


  return (
    <div onClick={handleScaleExpiredTime}>
      {children}
    </div>
  )
}

DataProvider.propTypes = {}

export default inject('propertyStore', 'authenticationStore', 'commonStore')(observer(DataProvider))