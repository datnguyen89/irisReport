import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { PAGES } from '../../utils/constant'
import HomePage from '../../pages/WebApp/HomePage/HomePage'
import PersonalReport from '../../pages/PersonalReport'
import BusinessReport from '../../pages/BusinessReport'
import GameDetailReport from '../../pages/GameDetailReport/GameDetailReport'

// Pages

const ProtectedModule = (props) => {
  return (
    <DefaultLayout>
      <Switch>
        <Route exact path={PAGES.HOME.PATH} component={HomePage} />
        <Route exact path={PAGES.PERSONAL_REPORT.PATH} component={PersonalReport} />
        <Route exact path={PAGES.BUSINESS_REPORT.PATH} component={BusinessReport} />
        <Route exact path={PAGES.GAMEDETAIL_REPORT.PATH} component={GameDetailReport} />
      </Switch>
    </DefaultLayout>
  )

}

ProtectedModule.propTypes = {}

export default ProtectedModule