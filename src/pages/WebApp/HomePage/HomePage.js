import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
// import DefaultLayout from '../../../layouts/DefaultLayout'
import { Helmet } from 'react-helmet/es/Helmet'
import { HomePageWrapper, HomeWhiteBox } from './HomePageStyled'
// import { Col, Row, Timeline } from 'antd'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChartLine, faDollarSign, faFileContract, faUserTie } from '@fortawesome/free-solid-svg-icons'
// import { ArrowUpOutlined } from '@ant-design/icons'
// import CardDashboard from '../../../components/CardDashboard/CardDashboard'
// import ColumnChart from '../../../components/Charts/ColumnChart'
// import { ColorText, ColorTitle } from '../../../components/CommonStyled/CommonStyled'
// import LineChart from '../../../components/Charts/LineChart'
// import BarChart from '../../../components/Charts/BarChart'
// import DonutChart from '../../../components/Charts/DonutChart'
// import TopSellingTable from '../../../components/TopSellingTable/TopSellingTable'


const HomePage = props => {
  // region props, hook, state
  const { commonStore } = props

  // endregion
  // region destructuring
  const { appTheme } = commonStore

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
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <HomePageWrapper>
        {/*<ColorTitle fontSize={'16px'} background={'transparent'}>Dashboard</ColorTitle>*/}
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col xxl={10} xl={24} lg={24} md={24} sm={24} xs={24}>*/}
        {/*    <Row gutter={[16, 16]}>*/}
        {/*      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>*/}
        {/*        <CardDashboard*/}
        {/*          title={'Khách hàng'}*/}
        {/*          avatar={<FontAwesomeIcon size={'2x'} icon={faUserTie} />}*/}
        {/*          content={*/}
        {/*            <ColorText fontSize={16} fontWeight={700} color={appTheme.solidColor}>6.789</ColorText>*/}
        {/*          }*/}
        {/*          icon={<ArrowUpOutlined />}*/}
        {/*          numberColor={'rgb(10, 207, 151)'}*/}
        {/*          number={'5.27'} />*/}
        {/*      </Col>*/}
        {/*      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>*/}
        {/*        <CardDashboard*/}
        {/*          title={'Đơn hàng'}*/}
        {/*          avatar={<FontAwesomeIcon size={'2x'} icon={faFileContract} />}*/}
        {/*          content={*/}
        {/*            <ColorText fontSize={16} fontWeight={700} color={appTheme.solidColor}>6.789</ColorText>*/}
        {/*          }*/}
        {/*          icon={<ArrowUpOutlined />}*/}
        {/*          numberColor={'rgb(10, 207, 151)'}*/}
        {/*          number={'5.27'} />*/}
        {/*      </Col>*/}
        {/*      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>*/}
        {/*        <CardDashboard*/}
        {/*          title={'Doanh thu'}*/}
        {/*          avatar={<FontAwesomeIcon size={'2x'} icon={faDollarSign} />}*/}
        {/*          content={*/}
        {/*            <ColorText fontSize={16} fontWeight={700} color={appTheme.solidColor}>6.789.000</ColorText>*/}
        {/*          }*/}
        {/*          icon={<ArrowUpOutlined />}*/}
        {/*          numberColor={'rgb(10, 207, 151)'}*/}
        {/*          number={'5.27'} />*/}
        {/*      </Col>*/}
        {/*      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>*/}
        {/*        <CardDashboard*/}
        {/*          title={'Tăng trưởng'}*/}
        {/*          avatar={<FontAwesomeIcon size={'2x'} icon={faChartLine} />}*/}
        {/*          content={*/}
        {/*            <ColorText fontSize={16} fontWeight={700} color={appTheme.solidColor}>6.789 %</ColorText>*/}
        {/*          }*/}
        {/*          icon={<ArrowUpOutlined />}*/}
        {/*          numberColor={'rgb(10, 207, 151)'}*/}
        {/*          number={'5.27'} />*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={14} xl={24} lg={24} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>COLUMN CHART</ColorTitle>*/}
        {/*      <ColumnChart />*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={14} xl={12} lg={24} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>LINE CHART</ColorTitle>*/}
        {/*      <LineChart />*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={10} xl={12} lg={24} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>BAR CHART</ColorTitle>*/}
        {/*      <BarChart />*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={10} xl={24} lg={24} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>TOP SELLING PRODUCT</ColorTitle>*/}
        {/*      <TopSellingTable />*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={7} xl={12} lg={12} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>DONUT CHART</ColorTitle>*/}
        {/*      <DonutChart />*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*  <Col xxl={7} xl={12} lg={12} md={24} sm={24} xs={24}>*/}
        {/*    <HomeWhiteBox>*/}
        {/*      <ColorTitle margin={'0 0 24px 0'}>RECENT ACTIVITY</ColorTitle>*/}
        {/*      <Timeline>*/}
        {/*        <Timeline.Item color='green'>Create a services site 2015-09-01</Timeline.Item>*/}
        {/*        <Timeline.Item color='red'>*/}
        {/*          <p>Solve initial network problems 1</p>*/}
        {/*        </Timeline.Item>*/}
        {/*        <Timeline.Item>*/}
        {/*          <p>Technical testing 1</p>*/}
        {/*          <p>Technical testing 2</p>*/}
        {/*          <p>Technical testing 3 2015-09-01</p>*/}
        {/*        </Timeline.Item>*/}
        {/*        <Timeline.Item color='gray'>*/}
        {/*          <p>Technical testing 1</p>*/}
        {/*          <p>Technical testing 2</p>*/}
        {/*          <p>Technical testing 3 2015-09-01</p>*/}
        {/*        </Timeline.Item>*/}
        {/*        <Timeline.Item color='gray'>*/}
        {/*          <p>Technical testing 1</p>*/}
        {/*        </Timeline.Item>*/}
        {/*      </Timeline>*/}
        {/*    </HomeWhiteBox>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </HomePageWrapper>
    </>
  )
}

HomePage.propTypes = {}

export default inject('commonStore')(observer(HomePage))