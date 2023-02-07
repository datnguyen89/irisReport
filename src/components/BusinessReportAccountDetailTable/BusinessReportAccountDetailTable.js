import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ReportAccountDetailTableWrapper } from './BusinessReportAccountDetailTableStyled'
import { Button, Checkbox, Col, Divider, Dropdown, Modal, notification, Row, Table } from 'antd'
import PaginationRow from '../PaginationRow'
import {
  ColorText,
  DropdownShowColumnWrapper,
  FlexBox,
  ReportCellItem,
  ReportHeaderItem,
  ReportHeaderLabel,
} from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, FULL_DATE, RESPONSE_CODE } from '../../utils/constant'
import reportStore from '../../stores/reportStore'
import dateUtils from '../../utils/dateUtils'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import fileUtils from '../../utils/fileUtils'

const BusinessReportAccountDetailTable = props => {
  // region props, hook, state =================
  const {
    filterOption, reportStore,
    pageIndex, setPageIndex,
    pageSize, setPageSize,
  } = props
  const { reportAccountDetail } = reportStore

  const [showColumn, setShowColumn] = useState([1, 2])


  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================
  const columns = [
    {
      id: 1,
      fixed: 'left',
      title: 'Số ví điện tử doanh nghiệp (1)',
      align: 'center',
      width: '10%',
      render: record =>
        <Row align={'top'}>
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
            Thông tin tài khoản (2)
          </ReportHeaderLabel>
          <Row align={'stretch'}>
            <ReportHeaderItem span={6}>
              Thời gian tạo tài khoản ví
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              Thời gian được duyệt
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              Thời gian linkbank
            </ReportHeaderItem>
            <ReportHeaderItem span={6}>
              Tên ngân hàng liên kết
            </ReportHeaderItem>
          </Row>
        </>,
      align: 'center',
      width: '62%',
      render: record =>
        <Row align={'stretch'}>
          <ReportCellItem span={6}>
            {dateUtils.convertToStrDate(record?.CreatedTime, FULL_DATE)}
          </ReportCellItem>
          <ReportCellItem span={6}>
            {dateUtils.convertToStrDate(record?.VerifiedTime, FULL_DATE)}
          </ReportCellItem>
          <ReportCellItem span={6}>
            {dateUtils.convertToStrDate(record?.LinkedBankTime, FULL_DATE)}
          </ReportCellItem>
          <ReportCellItem span={6}>
            {record?.BankName}
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
        TypeAccountGroup: filterOption?.TypeAccountGroup,
        UserType: filterOption?.TypeAccount,
        PageIndex: 1,
        PageSize: size,
      }
      setPageIndex(1)
      setPageSize(size)
    } else {
      payloadAcc = {
        TypeAccountGroup: filterOption?.TypeAccountGroup,
        UserType: filterOption?.TypeAccount,
        PageIndex: index,
        PageSize: pageSize,
      }
      setPageIndex(index)
    }
    reportStore.getAccountDetails(payloadAcc)
  }
  const handleExportExcel = () => {
    let payloadAcc = {
      TypeAccountGroup: filterOption?.TypeAccountGroup,
      UserType: filterOption?.TypeAccount,
      PageIndex: pageIndex,
      PageSize: pageSize,
    }
    reportStore.getAccountDetailsExcel(payloadAcc)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          if (res?.report === 'error') {
            Modal.destroyAll()
            notification.error({
              message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
              description: 'Có lỗi xảy ra khi xuất báo cáo thông tin tài khoản',
            })
            return
          }
          fileUtils.saveAsFile('TTTK DN', res?.report)
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
      title: 'Số ví điện tử doanh nghiệp (1)',
    },
    {
      id: 2,
      title: 'Thông tin tài khoản (2)',
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
    <ReportAccountDetailTableWrapper>
      <Divider
        orientation={'center'}
        style={{ margin: '8px 0 24px 0' }}>
        BÁO CÁO THÔNG TIN TÀI KHOẢN DOANH NGHIỆP
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
        scroll={{ x: 1440 }}
        bordered={true}
        dataSource={reportAccountDetail?.reports}
        columns={columns}
        rowKey={record => record?.AccountName}
        pagination={false} />
      <PaginationRow
        onChangePagination={handleChangePagination}
        currentListLength={reportAccountDetail?.reports?.length}
        totalCount={reportAccountDetail?.infoResult?.TotalRecords}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageSizeOptions={[50, 100, 150, 200]}
      />
    </ReportAccountDetailTableWrapper>
  )
}

BusinessReportAccountDetailTable.propTypes = {
  filterOption: PropTypes.object,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  setPageSize: PropTypes.func,
}

export default inject('reportStore')(observer(BusinessReportAccountDetailTable))