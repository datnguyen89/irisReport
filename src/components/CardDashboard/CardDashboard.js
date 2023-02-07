import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'antd'
import {
  CardDashBoardContent,
  CardDashBoardHeader,
  CardDashBoardNumber, CardDashBoardNumberWrapper, CardDashBoardSubText,
  CardDashBoardTitle,
} from './CardDashboardStyled'

const CardDashboard = props => {
  // region props, hook, state
  const { title, avatar, content, icon, number, numberColor } = props

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
    <Card hoverable>
      <CardDashBoardHeader>
        <CardDashBoardTitle>{title}</CardDashBoardTitle>
        {avatar}
      </CardDashBoardHeader>
      <CardDashBoardContent>{content}</CardDashBoardContent>
      <CardDashBoardNumberWrapper>
        <CardDashBoardNumber color={numberColor}>{icon} {number}%</CardDashBoardNumber>
        <CardDashBoardSubText>So với tháng trước</CardDashBoardSubText>
      </CardDashBoardNumberWrapper>
    </Card>
  )
}

CardDashboard.propTypes = {
  title: PropTypes.node,
  avatar: PropTypes.node,
  content: PropTypes.node,
  icon: PropTypes.node,
  number: PropTypes.string,
  numberColor: PropTypes.string,
}

export default CardDashboard