import React from 'react'
import PropTypes from 'prop-types'
import { Pie } from '@ant-design/charts'

const DonutChart = props => {
  // region props, hook, state

  // endregion
  // region destructuring

  // endregion
  // region variable
  const data = [
    {
      type: 'Top Up',
      value: 27,
    },
    {
      type: 'SMS',
      value: 25,
    },
    {
      type: 'BrandName',
      value: 18,
    },
    {
      type: 'Data',
      value: 15,
    },
    {
      type: 'Call center',
      value: 10,
    },
    {
      type: 'Vas',
      value: 5,
    },
  ]
  const config = {
    data,
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Iris',
      },
    },
    legend: {
      // title: '',
      position: 'right',
    },
  }
  // endregion
  // region function handle logic

  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion

  return (
    <div>
      <Pie {...config} />
    </div>
  )
}

DonutChart.propTypes = {}

export default DonutChart