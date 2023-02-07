import styled from 'styled-components'

export const EllipsisTooltipTextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${props => props.width};
`