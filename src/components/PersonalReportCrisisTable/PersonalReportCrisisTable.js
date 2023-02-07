import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ReportCrisisTableWrapper } from './PersonalReportCrisisTableStyled'
import { Button, Checkbox, Col, Divider, Dropdown, Modal, notification, Row, Table } from 'antd'
import PaginationRow from '../PaginationRow'
import {
  ColorText,
  DropdownShowColumnWrapper,
  FlexBox,
  ReportCellChildItem,
  ReportCellItem,
  ReportHeaderChildItem,
  ReportHeaderChildLabel,
  ReportHeaderItem,
  ReportHeaderLabel,
} from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, RESPONSE_CODE, STRING_DATE, USER_TYPE } from '../../utils/constant'
import reportStore from '../../stores/reportStore'
import numberUtils from '../../utils/numberUtils'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import fileUtils from '../../utils/fileUtils'

const PersonalReportCrisisTable = props => {
  // region props, hook, state =================
  const {
    filterOption, reportStore,
    pageIndex, setPageIndex,
    pageSize, setPageSize,
  } = props
  const { reportCrisis } = reportStore


  const [showColumn, setShowColumn] = useState([1, 2, 3, 4, 5])

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================
  const columns = [
    {
      id: 1,
      fixed: 'left',
      title: filterOption?.TypeAccount === USER_TYPE.PERSONAL ? 'Số ví điện tử (1)' : 'Số TK tiền di động (1)',
      align: 'center',
      width: '4%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem span={24}>
            {record?.AccountName}
          </ReportCellItem>
        </Row>,
    },
    {
      id: 2,
      title:
        <>
          <ReportHeaderLabel span={24}>
            Nạp tiền (2)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Tổng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nạp từ ngân hàng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nạp từ TK tiền di động
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
          </Row>
        </>,
      align: 'center',
      width: '20%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNTBank)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNTBank)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNTMM)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNTMM)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
        </Row>,
    },
    {
      id: 3,
      title:
        <>
          <ReportHeaderLabel span={24}>
            Rút tiền (3)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Tổng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Rút ra ngân hàng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={8}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Rút về TK tiền di động
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
          </Row>
        </>,
      align: 'center',
      width: '20%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongRT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienRT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongRTBank)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienRTBank)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={8}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongRTMM)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienRTMM)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
        </Row>,
    },
    {
      id: 4,
      title:
        <>
          <ReportHeaderLabel span={24}>
            Chuyển tiền (4)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Tổng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Chuyển ví doanh nghiệp
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Chuyển ví cá nhân
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Chuyển TK tiền di động
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
          </Row>
        </>,
      align: 'center',
      width: '26%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongCT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienCT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongCTDN)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienCTDN)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongCTCN)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienCTCN)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongCTMM)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienCTMM)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
        </Row>,
    },
    {
      id: 5,
      title:
        <>
          <ReportHeaderLabel span={24}>
            Nhận tiền (5)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Tổng
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nhận từ ví doanh nghiệp
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nhận từ ví cá nhân
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nhận từ TK tiền di động
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
          </Row>
        </>,
      align: 'center',
      width: '27%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNNT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNNT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNTTDN)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNTTDN)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNTTCN)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNTTCN)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem span={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TongNTTMM)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.TongSotienNTTMM)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
        </Row>,
    },

  ].filter(item => showColumn.includes(item.id))
  // endregion
  // region function handle logic ==============
  const handleChangePagination = (index, size) => {
    let payloadAcc = {}
    if (pageSize !== size) {
      payloadAcc = {
        Fromdate: filterOption?.RangePicker[0].format(STRING_DATE),
        Todate: filterOption?.RangePicker[1].format(STRING_DATE),
        TypeAccountGroup: filterOption?.TypeAccountGroup,
        UserType: filterOption?.TypeAccount,
        PageIndex: 1,
        PageSize: size,
      }
      setPageIndex(1)
      setPageSize(size)
    } else {
      payloadAcc = {
        Fromdate: filterOption?.RangePicker[0].format(STRING_DATE),
        Todate: filterOption?.RangePicker[1].format(STRING_DATE),
        TypeAccountGroup: filterOption?.TypeAccountGroup,
        UserType: filterOption?.TypeAccount,
        PageIndex: index,
        PageSize: size,
      }
      setPageIndex(index)
    }
    reportStore.getCrisis(payloadAcc)
  }

  const handleExportExcel = () => {
    let payloadCrisis = {
      Fromdate: filterOption?.RangePicker[0].format(STRING_DATE),
      Todate: filterOption?.RangePicker[1].format(STRING_DATE),
      TypeAccountGroup: filterOption?.TypeAccountGroup,
      UserType: filterOption?.TypeAccount,
      PageIndex: pageIndex,
      PageSize: pageSize,
    }
    reportStore.getCrisisExcel(payloadCrisis)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          if (res?.report === 'error') {
            Modal.destroyAll()
            notification.error({
              message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
              description: 'Có lỗi xảy ra khi xuất báo cáo biến động tài khoản',
            })
            return
          }
          fileUtils.saveAsFile('BDTK Vi CN', res?.report)
          Modal.destroyAll()
        }
      })
  }
  // endregion
  // region function render ====================
  const onChangeShowColumn = (e) => {
    setShowColumn(e)
  }
  const dropdownShowColumn = [
    {
      id: 1,
      title: filterOption?.TypeAccount === USER_TYPE.PERSONAL ? 'Số ví điện tử (1)' : 'Số TK tiền di động (1)',
    },
    {
      id: 2,
      title: 'Nạp tiền (2)',
    },
    {
      id: 3,
      title: 'Rút tiền (3)',
    },
    {
      id: 4,
      title: 'Chuyển tiền (4)',
    },
    {
      id: 5,
      title: 'Nhận tiền (5)',
    },

  ]
  const overlayShowColumn = (
    <DropdownShowColumnWrapper>
      <Checkbox.Group
        value={showColumn}
        style={{ width: '100%' }}
        onChange={onChangeShowColumn}>
        <Row gutter={[8, 8]}>
          {
            dropdownShowColumn.map(item =>
              <Col key={item.id} span={24}>
                <Checkbox value={item.id}>{item.title}</Checkbox>
              </Col>,
            )
          }
        </Row>
      </Checkbox.Group>
    </DropdownShowColumnWrapper>
  )
  // endregion
  // region side effect ========================

  // endregion
  return (
    <ReportCrisisTableWrapper>
      <Divider
        orientation={'center'}
        style={{ margin: '8px 0 24px 0' }}>
        BÁO CÁO BIẾN ĐỘNG TÀI KHOẢN VÍ ĐIỆN TỬ CÁ NHÂN
      </Divider>
      <FlexBox margin={'16px 0'} justifyContent={'space-between'}>
        <Dropdown
          overlay={overlayShowColumn}
          trigger={['click']}>
          <Button>
            <EyeOutlined /> Ẩn hiện cột
          </Button>
        </Dropdown>
        <Button
          onClick={handleExportExcel}
          icon={<DownloadOutlined />}
          style={{ minWidth: 130 }}>
          Xuất dữ liệu
        </Button>
      </FlexBox>
      <Table
        size={'small'}
        style={{ margin: '16px 0' }}
        scroll={{ x: 4000, y: 600 }}
        bordered={true}
        dataSource={reportCrisis?.reports}
        columns={columns}
        rowKey={record => record?.AccountName}
        pagination={false} />
      <PaginationRow
        onChangePagination={handleChangePagination}
        currentListLength={reportCrisis?.reports?.length - 1}
        totalCount={reportCrisis?.infoResult?.TotalRecords}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageSizeOptions={[50, 100, 150, 200]}
      />
    </ReportCrisisTableWrapper>
  )
}

PersonalReportCrisisTable.propTypes = {
  filterOption: PropTypes.object,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  setPageSize: PropTypes.func,
}

export default inject('reportStore')(observer(PersonalReportCrisisTable))