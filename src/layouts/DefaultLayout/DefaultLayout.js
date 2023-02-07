import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { DefaultLayoutWrapper } from './DefaultLayoutStyled'
import { useLocation } from 'react-router-dom'
import { PAGES } from '../../utils/constant'
import MainHeader from '../../components/MainHeader'
import MainContent from '../../components/MainContent/MainContent'
import MainSideBar from '../../components/MainSideBar'
import MainBody from '../../components/MainBody'
import MainFooter from '../../components/MainFooter'

const DefaultLayout = props => {
  // region props, hook, state
  const { children, commonStore } = props
  const location = useLocation()

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
  useEffect(() => {
    console.log('location.pathname', location.pathname)
    console.log('window.location.pathname', window.location.pathname)
    const segment = location.pathname.split(PAGES.HOME.PATH).filter(item => item !== '')
    if (segment.length === 0) {
      commonStore.setPageName('home')
    } else {
      commonStore.setPageName(segment[0])
    }
  }, [location.pathname])
  // endregion

  return (
    <DefaultLayoutWrapper color={commonStore.appTheme.solidColor}>
      <MainHeader />
      <MainContent>
        <MainSideBar />
        <MainBody>
          {children}
          <MainFooter />
        </MainBody>
      </MainContent>
    </DefaultLayoutWrapper>
  )
}

DefaultLayout.propTypes = {}

export default inject('commonStore')(observer(DefaultLayout))