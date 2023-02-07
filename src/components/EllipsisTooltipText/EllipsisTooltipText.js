import React from 'react'
import PropTypes from 'prop-types'
import { EllipsisTooltipTextWrapper } from './EllipsisTooltipTextStyled'
import { Tooltip } from 'antd'

const EllipsisTooltipText = props => {
  // region props, hook, state
  const { children, width } = props

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

    <EllipsisTooltipTextWrapper width={isNaN(width) ? '220px' : `${width}px`}>
      <Tooltip mouseEnterDelay={0.3} title={children}>
        {children}
      </Tooltip>
    </EllipsisTooltipTextWrapper>

  )
}

EllipsisTooltipText.propTypes = {
  width: PropTypes.number,
}

export default EllipsisTooltipText