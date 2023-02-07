import React from 'react'
import PropTypes from 'prop-types'
import ICONS from '../../icons'
import { Badge, Dropdown, Menu } from 'antd'
import { NotifyBellDropdown, NotifyBellWrapper } from './NotifyBellStyled'

const NotifyBell = props => {
  // region props, hook, state

  // endregion
  // region destructuring

  // endregion
  // region variable

  // endregion
  // region function handle logic

  // endregion
  // region function render
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <a href='https://www.antgroup.com'>1st menu item</a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a href='https://www.aliyun.com'>2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>3rd menu item</Menu.Item>
    </Menu>
  )
  // endregion
  // region side effect

  // endregion

  return (
    <NotifyBellWrapper id={'notify-bell-wrapper'}>
      <Dropdown
        overlay={menu}
        placement={'bottomCenter'}
        trigger={['click']}
        getPopupContainer={() => document.getElementById('notify-bell-wrapper')}>
        <NotifyBellDropdown>
          <Badge count={3} size={'small'}>
            <img src={ICONS.NOTIFY_BELL} alt={''} />
          </Badge>
        </NotifyBellDropdown>
      </Dropdown>
    </NotifyBellWrapper>
  )
}

NotifyBell.propTypes = {}

export default NotifyBell