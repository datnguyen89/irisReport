import React from 'react'
import PropTypes from 'prop-types'
import { ConditionDisplayWrapper } from './ConditionDisplayStyled'

const ConditionDisplay = props => {
  // region props, hook, state
  const { visible, children } = props

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
    <ConditionDisplayWrapper display={visible ? 'block' : 'none'}>
      {children}
    </ConditionDisplayWrapper>
  )
}

ConditionDisplay.propTypes = {
  visible: PropTypes.bool,
}

export default ConditionDisplay