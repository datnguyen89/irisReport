import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Col } from 'antd'

export const PaginationLabel = styled.span`
  color: #767676;
  @media only screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`
export const RowCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`
export const RowFlexEndDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`


export const ColorTitleNoBg = styled.h1`
  color: ${props => props.color || '#979797'};
  margin-top: ${props => props.marginTop || 0} !important;
  margin-bottom: ${props => props.marginBottom || 0} !important;
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || '500'};
  font-size: ${props => props.fontSize || 'inherit'};
`
export const CommonTitle = styled.h1`
  color: ${props => props.color || '#333'};
  margin: ${props => props.margin || 0} !important;
  padding: ${props => props.padding || 0} !important;
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || '500'};
  font-size: ${props => props.fontSize || 'inherit'};
`

export const HeaderDropdownWrapper = styled.div`
  background: #fff;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  border-radius: 2px;
  padding: 8px;
`
export const HeaderDropdownIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ColorLink = styled(Link)`
  color: ${props => props.color};
`
export const HeaderBackground = styled.h1`
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding || '16px'};

  svg, img {
    margin-right: 8px;
  }
`

export const DropdownShowColumnWrapper = styled.div`
  background-color: #fff;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`
export const TextEllipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${props => props.width ? props.width : '320px'};
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'start'};
  align-items: ${props => props.alignItems ? props.alignItems : 'start'};
  gap: ${props => props.gap ? props.gap : '0'};
  margin: ${props => props.margin ? props.margin : '0'};
  padding: ${props => props.padding ? props.padding : '0'};
`

export const CommonSpan = styled.span`
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '300'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonP = styled.p`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '300'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH1 = styled.h1`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '500'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH2 = styled.h2`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH3 = styled.h3`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH4 = styled.h4`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH5 = styled.h5`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH6 = styled.h6`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '14px'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const ColorText = styled.span`
  color: ${props => props.color || '#333'};
  background: ${props => props.background || 'transparent'};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '1.4rem'};
  font-weight: ${props => props.fontWeight || 400};
`

export const HeaderDropdownItemText = styled.div`
  color: #333;
  margin-left: 8px;
  @media only screen and (max-width: 992px) {
    font-size: 12px;
  }
`
export const HeaderDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &:hover {
    ${HeaderDropdownItemText} {
      color: ${props => props.color};
    }
  }
`
export const GroupMenuTitle = styled.h1`
  text-align: ${props => props.textAlign};
  margin: 8px 12px 0 12px;
`
export const MenuSideBarTitle = styled.span`
  margin-left: 12px;
  padding-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  display: ${props => props.isCollapse ? 'none' : 'block'};
`
export const MenuSidebarItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 8px 12px 0 12px;

  &:hover, &.active {
    background: #ffffff;
    color: ${props => props.color};

    svg path {
      fill: ${props => props.color} !important;
    }

    ${MenuSideBarTitle} {
      color: ${props => props.color};
    }
  }

`
export const RowSpaceBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => props.flexWrap || 'wrap'};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  @media only screen and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`

export const ReportHeaderLabel = styled.div`
  border-bottom: 1px dashed #d8d8d8;
  padding: 0 0 4px 0;
`
export const ReportHeaderItem = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px dashed #d8d8d8;
  width: calc(100% / ${props => props.totalCol});
  padding: 0px;
  margin-top: 8px;
  min-height: 52px;

  //@media screen and (max-width: 2560px) {
  //  min-height: 120px;
  //}
  //@media screen and (max-width: 1920px) {
  //  min-height: 100px;
  //}
  //@media screen and (max-width: 1600px) {
  //  min-height: 180px;
  //}

  &:last-child {
    border-right: none;
  }
`

export const ReportCellItem = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 22px;
  border-right: 1px dashed #d8d8d8;
  width: calc(100% / ${props => props.totalCol});

  &:last-child {
    border-right: none;
  }
`
export const ReportHeaderChildLabel = styled(Col)`
  border-bottom: ${props => props.borderless ? '' : `1px dashed #d8d8d8`};
  padding: 0 0 4px 0;
`
export const ReportHeaderChildItem = styled(Col)`
  border-right: 1px dashed #d8d8d8;
  margin-top: 8px;

  &:last-child {
    border-right: none;
  }
`
export const ReportCellChildItem = styled(Col)`
  border-right: 1px dashed #d8d8d8;

  &:last-child {
    border-right: none;
  }
`

export const ColorTitle = styled.h1`
  padding: ${props => props.padding || '8px'};
  margin: ${props => props.margin || 0};
  color: ${props => props.color || '#848788'};
  background: ${props => props.background || '#F6F6F6'};
  text-align: ${props => props.textAlign || 'left'};
  font-size: ${props => props.fontSize || '14px'};
`