import styled from 'styled-components'

export const SystemMenuWrapper = styled.ul`
  margin-left: 32px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
`
export const SystemMenuItem = styled.li`
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;

  &.active {
    background: #ffffff40;
  }
`