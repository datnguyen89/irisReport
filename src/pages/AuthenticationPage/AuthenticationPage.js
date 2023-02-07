import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useQuery } from '../../hooks/useQuery'
import { useHistory } from 'react-router-dom'
import { FULL_DATE, PAGES } from '../../utils/constant'
import cypherUtil from '../../utils/cypherUtil'
import moment from 'moment'
import { minuteScaleOnClick } from '../../config'

const AuthenticationPage = props => {
  // region props, hook, state =================
  const { authenticationStore } = props

  const query = useQuery()
  const history = useHistory()
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (!query) return
    const accessToken = decodeURIComponent(query.get('accessToken'))
    const refreshToken = decodeURIComponent(query.get('refreshToken'))
    const cmsToken = decodeURIComponent(query.get('cmsToken'))
    const extendData = decodeURIComponent(query.get('extendData'))
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('cmsToken', cmsToken)
    console.log('extendData', extendData)
    let payload = {
      accessToken,
      refreshToken,
      cmsToken,
      extendData,
    }
    authenticationStore.authentication(payload)
      .then(() => {
        localStorage.setItem('expired', cypherUtil.base64Encrypt(moment().add(minuteScaleOnClick, 'minutes').format(FULL_DATE)))
        history.push(PAGES.HOME.PATH)
      })
      .catch(() => {
        history.push(PAGES.LOGIN.PATH)
      })
  }, [query])
  // endregion
  return (
    <div>

    </div>
  )
}

AuthenticationPage.propTypes = {}

export default inject('authenticationStore')(observer(AuthenticationPage))