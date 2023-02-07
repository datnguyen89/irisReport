import React from 'react'
import { inject, observer } from 'mobx-react'
import { AuthFooterLeft, AuthFooterRight, AuthFooterRightBusiness, AuthFooterWrapper } from './AuthFooterStyled'
import Common from '../../common'

const AuthFooter = props => {
  // region props, hook, state
  const { commonStore } = props

  // endregion
  // region destructuring

  // endregion
  // region variable

  // endregion
  // region function handle logic

  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion
  return (
    <AuthFooterWrapper>
      <AuthFooterLeft color={commonStore.appTheme.solidColor}>
        <span>CMS MobiFone Money</span>
      </AuthFooterLeft>
      <AuthFooterRight color={commonStore.appTheme.solidColor}>
        <AuthFooterRightBusiness color={commonStore.appTheme.solidColor}>
          {Common.BUSINESS_NAME}
        </AuthFooterRightBusiness>
        <a href={'#'}>{Common.BUSINESS_ADDRESS}</a>
        <br />
        <a href={'tel:842437831800'}>{Common.PHONE1}</a>
        <br />
        <a href={'tel:842437831734'}>{Common.PHONE2}</a>
      </AuthFooterRight>
    </AuthFooterWrapper>
  )
}

AuthFooter.propTypes = {}

export default inject('commonStore')(observer(AuthFooter))