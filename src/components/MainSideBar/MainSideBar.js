import React from 'react'
import { inject, observer } from 'mobx-react'
import { DEVICE, SIDEBAR_WIDTH_COLLAPSE, SIDEBAR_WIDTH_EXPAND } from '../../utils/constant'
import { MainSideBarWrapper } from './MainSideBarStyled'
import MenuSideBarArea from '../MenuSideBarArea'

const MainSideBar = props => {
  // region props, hook, state
  const { commonStore } = props

  // endregion
  // region destructuring
  const { isCollapse, device } = commonStore

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
    <MainSideBarWrapper
      display={device === DEVICE.MOBILE ? 'none' : 'flex'}
      width={isCollapse ? SIDEBAR_WIDTH_COLLAPSE : SIDEBAR_WIDTH_EXPAND}>
      <MenuSideBarArea />
    </MainSideBarWrapper>
  )
}

MainSideBar.propTypes = {}

export default inject('commonStore')(observer(MainSideBar))