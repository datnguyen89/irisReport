import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { SystemMenuItem, SystemMenuWrapper } from './SystemMenuStyled'
import { APP_CLIENT_ID, CMS_CLIENT, REPORT_CLIENT } from '../../utils/constant'

const SystemMenu = props => {
  // region props, hook, state =================
  const { authenticationStore } = props
  const {
    accessToken, refreshToken, tokenKey, extendData, jwtDecode,
  } = authenticationStore


  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleClickMenu = (clientId, url) => {
    // alert(`${url}/authentication?refreshToken=${encodeURIComponent(refreshToken)}&accessToken=${encodeURIComponent(accessToken)}&cmsToken=${encodeURIComponent(tokenKey)}&extendData=${encodeURIComponent(extendData)}`)
    if (clientId == APP_CLIENT_ID) {
      return
    } else {
      window.location.assign(`${url}/authentication?refreshToken=${encodeURIComponent(refreshToken)}&accessToken=${encodeURIComponent(accessToken)}&cmsToken=${encodeURIComponent(tokenKey)}&extendData=${encodeURIComponent(extendData)}`)
    }
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <SystemMenuWrapper>
      {
        jwtDecode?.ClientIdOwn && jwtDecode?.ClientIdOwn?.split(',').map((item) =>
          <Fragment key={item}>
            {
              item == CMS_CLIENT.ID &&
              <SystemMenuItem
                className={item == APP_CLIENT_ID ? 'active' : ''}
                onClick={() => handleClickMenu(item, CMS_CLIENT.URL)}
              >
                {CMS_CLIENT.LABEL}
              </SystemMenuItem>
            }
            {
              item == REPORT_CLIENT.ID &&
              <SystemMenuItem
                className={item == APP_CLIENT_ID ? 'active' : ''}
                onClick={() => handleClickMenu(item, REPORT_CLIENT.URL)}
              >
                {REPORT_CLIENT.LABEL}
              </SystemMenuItem>
            }
          </Fragment>,
        )
      }
    </SystemMenuWrapper>
  )
}

SystemMenu.propTypes = {}

export default inject('authenticationStore')(observer(SystemMenu))