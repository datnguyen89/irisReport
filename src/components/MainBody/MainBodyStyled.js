import styled from 'styled-components'

export const MainBodyWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  margin-left: ${props => props.marginLeft}px;
  padding-bottom: 64px;
  padding-top: 56px;

  transition: all 0.3s;
`