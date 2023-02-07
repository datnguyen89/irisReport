import React from 'react'
import { inject, observer } from 'mobx-react'
import { MenuSidebarAreaWrapper } from './MenuSideBarAreaStyled'
import { GroupMenuTitle, MenuSidebarItem, MenuSideBarTitle } from '../CommonStyled/CommonStyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { PAGES } from '../../utils/constant'
import { BankOutlined, GiftOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const MenuSideBarArea = props => {
  // region props, hook, state
  const { commonStore, authenticationStore } = props
  const history = useHistory()

  // endregion
  // region destructuring
  const { appTheme, pageName } = commonStore

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleClickMenu = (path) => {
    history.push(path)
  }
  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion


  return (
    <MenuSidebarAreaWrapper>
      <GroupMenuTitle textAlign={commonStore.isCollapse ? 'center' : 'left'}>
        {commonStore.isCollapse
          ? <FontAwesomeIcon size={'lg'} color={'#6634E0'} icon={faBuilding} />
          : 'Báo cáo công ty khu vực'}
      </GroupMenuTitle>
      <MenuSidebarItem
        onClick={() => handleClickMenu(PAGES.PERSONAL_REPORT.PATH)}
        className={pageName === PAGES.PERSONAL_REPORT.NAME ? 'active' : ''}
        isCollapsed={commonStore.isCollapse}
        color={appTheme.solidColor}>
        <UserOutlined />
        <MenuSideBarTitle isCollapse={commonStore.isCollapse}>KH cá nhân</MenuSideBarTitle>
      </MenuSidebarItem>
      <MenuSidebarItem
        onClick={() => handleClickMenu(PAGES.BUSINESS_REPORT.PATH)}
        className={pageName === PAGES.BUSINESS_REPORT.NAME ? 'active' : ''}
        isCollapsed={commonStore.isCollapse}
        color={appTheme.solidColor}>
        <BankOutlined />
        <MenuSideBarTitle isCollapse={commonStore.isCollapse}>KH doanh nghiệp</MenuSideBarTitle>
      </MenuSidebarItem>
      <GroupMenuTitle textAlign={commonStore.isCollapse ? 'center' : 'left'}>
        {commonStore.isCollapse
          ? <FontAwesomeIcon size={'lg'} color={'#6634E0'} icon={faCalendar} />
          : 'Báo cáo đối tác tích hợp'}
      </GroupMenuTitle>
      <MenuSidebarItem
        onClick={() => handleClickMenu(PAGES.GAMEDETAIL_REPORT.PATH)}
        className={pageName === PAGES.GAMEDETAIL_REPORT.NAME ? 'active' : ''}
        isCollapsed={commonStore.isCollapse}
        color={appTheme.solidColor}>
        <GiftOutlined />
        <MenuSideBarTitle isCollapse={commonStore.isCollapse}>BC phần thưởng sự kiện</MenuSideBarTitle>
      </MenuSidebarItem>
    </MenuSidebarAreaWrapper>

  )
}

MenuSideBarArea.propTypes = {}

export default inject('commonStore', 'authenticationStore')(observer(MenuSideBarArea))