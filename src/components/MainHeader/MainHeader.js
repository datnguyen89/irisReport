import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HeaderLogoArea, MainHeaderRight, MainHeaderRightMobile, MainHeaderWrapper } from './MainHeaderStyled'
import IMAGES from '../../images'
import { Drawer } from 'antd'
import HeaderUserArea from '../HeaderUserArea'
import { Link, useHistory } from 'react-router-dom'
import { DEVICE, PAGES } from '../../utils/constant'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import MenuSideBarArea from '../MenuSideBarArea'
import SystemMenu from '../SystemMenu'

const MainHeader = props => {
  // region props, hook, state
  const { commonStore } = props
  const history = useHistory()
  const [visibleMobileDrawerRight, setVisibleMobileDrawerRight] = useState(false)

  // endregion
  // region destructuring
  const { appTheme } = commonStore
  const { device } = commonStore

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleToggleSideBar = () => {
    commonStore.setIsCollapse(!commonStore.isCollapse)
  }
  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion

  return (
    <MainHeaderWrapper gradientColor={appTheme.gradientColor}>
      <HeaderLogoArea width={device === DEVICE.DESKTOP ? commonStore.isCollapse ? 'auto' : '220px' : 'auto'}>
        <img src={IMAGES.AUTH_LOGO} alt={''} style={{ cursor: 'pointer' }} height={40}
             onClick={() => history.push(PAGES.HOME.PATH)} />
        {
          device === DEVICE.DESKTOP
            ?
            commonStore.isCollapse
              ?
              <MenuUnfoldOutlined onClick={handleToggleSideBar} />
              :
              <MenuFoldOutlined onClick={handleToggleSideBar} />
            : null
        }
      </HeaderLogoArea>
      <MainHeaderRight>
        <SystemMenu />
        <HeaderUserArea />
      </MainHeaderRight>

      <MainHeaderRightMobile>
        <FontAwesomeIcon
          onClick={() => setVisibleMobileDrawerRight(true)}
          icon={faBars}
          size={'2x'}
          color={'#fff'}
          style={{ cursor: 'pointer' }} />
        <Drawer
          title={<Link style={{ color: appTheme.solidColor }} to={'/'}>CMS Ví doanh nghiệp</Link>}
          placement='right'
          style={{ padding: 0 }}
          onClose={() => setVisibleMobileDrawerRight(false)}
          open={visibleMobileDrawerRight}>
          <MenuSideBarArea />
        </Drawer>
      </MainHeaderRightMobile>
    </MainHeaderWrapper>

  )
}

MainHeader.propTypes = {}

export default inject('commonStore')(observer(MainHeader))