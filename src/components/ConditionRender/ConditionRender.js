import React from 'react'
import PropTypes from 'prop-types'

const ConditionRender = props => {
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
    visible &&
    <>
      {children}
    </>
  )
}

ConditionRender.propTypes = {
  visible: PropTypes.bool,
}

export default ConditionRender