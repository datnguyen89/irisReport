import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { PAGES } from '../../utils/constant'
import TestPage from '../../pages/WebApp/TestPage'


const PublicModule = (props) => {
  return (
    <DefaultLayout>
      <Switch>
          <Route exact path={PAGES.TEST.PATH} component={TestPage} />
      </Switch>
    </DefaultLayout>
  )
}

PublicModule.propTypes = {}

export default inject('commonStore')(observer(PublicModule))