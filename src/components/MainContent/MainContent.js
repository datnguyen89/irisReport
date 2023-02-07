import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { MainContentWrapper } from './MainContentStyled'

const MainContent = props => {
  // region props, hook, state
  const { children, commonStore } = props

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
    <MainContentWrapper>
      {children}
    </MainContentWrapper>
  )
}

MainContent.propTypes = {}
export default inject('commonStore')(observer(MainContent))