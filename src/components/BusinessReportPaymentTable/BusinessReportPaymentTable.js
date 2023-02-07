import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ReportPaymentTableWrapper } from './BusinessReportPaymentTableStyled'
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
import { RESPONSE_CODE, STRING_DATE, USER_TYPE } from '../../utils/constant'
import reportStore from '../../stores/reportStore'
import numberUtils from '../../utils/numberUtils'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import fileUtils from '../../utils/fileUtils'

const BusinessReportPaymentTable = props => {
  // region props, hook, state =================
  const {
    filterOption, reportStore,
    pageIndex, setPageIndex,
    pageSize, setPageSize,
  } = props
  const { reportPayment } = reportStore

  const [showColumn, setShowColumn] = useState([1, 2, 3, 4])

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
      width: '2%',
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
            Viễn thông (2)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem totalCol={6}>
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
            <ReportHeaderItem totalCol={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Mã thẻ di động
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nạp tiền điện thoại
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Mã thẻ/Nạp data
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Gói data
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={6}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Cước trả sau
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
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.VT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountVT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.PhoneCard)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountPhoneCard)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.PhonePrepaid)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountPhonePrepaid)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.PhoneDataPrepaid)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountPhoneDataPrepaid)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.MobiDataREG)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountMobiDataREG)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={6}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.PhonePostPaid)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountPhonePostPaid)}
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
            Hóa đơn (3)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem totalCol={9}>
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
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Điện
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nước
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Internet
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Truyền hình
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Tài chính, bảo hiểm
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Học phí
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Chung cư
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={9}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Khác
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
      width: '40%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.HD)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountHD)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceElectric)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceElectric)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceWater)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceWater)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceInternet)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceInternet)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceTelevision)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceTelevision)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceCredit)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceCredit)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceFeeTuition)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceFeeTuition)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.InvoiceFeeBuilding)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountInvoiceFeeBuilding)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={9}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.Orther)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountOrther)}
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
            Mua sắm online (4)
          </ReportHeaderLabel>
          <Row align={'middle'}>
            <ReportHeaderItem totalCol={7}>
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
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Nạp tiền TK giao thông
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Di chuyển
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Khách sạn
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Vé số
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Thương mại điện tử
                </ReportHeaderChildLabel>
                <ReportHeaderChildItem span={8}>
                  Số GD
                </ReportHeaderChildItem>
                <ReportHeaderChildItem span={16}>
                  Số tiền
                </ReportHeaderChildItem>
              </Row>
            </ReportHeaderItem>
            <ReportHeaderItem totalCol={7}>
              <Row style={{ width: '100%' }} align={'middle'}>
                <ReportHeaderChildLabel span={24}>
                  Khác
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
      width: '31%',
      render: record =>
        <Row align={'middle'}>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.MSOnline)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountMSOnline)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.VETC)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountVETC)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.DC)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountDC)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.KS)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountKS)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.VS)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountVS)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.TMDT)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountTMDT)}
              </ReportCellChildItem>
            </Row>
          </ReportCellItem>
          <ReportCellItem totalCol={7}>
            <Row style={{ width: '100%' }} align={'middle'}>
              <ReportCellChildItem span={8}>
                {numberUtils.thousandSeparator(record?.MSOrther)}
              </ReportCellChildItem>
              <ReportCellChildItem span={16}>
                {numberUtils.thousandSeparator(record?.AmountMSOrther)}
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
        PageSize: pageSize,
      }
      setPageIndex(index)
    }
    reportStore.getPaymentReport(payloadAcc)
  }

  const handleExportExcel = () => {
    let payloadPayment = {
      Fromdate: filterOption?.RangePicker[0].format(STRING_DATE),
      Todate: filterOption?.RangePicker[1].format(STRING_DATE),
      TypeAccountGroup: filterOption?.TypeAccountGroup,
      UserType: filterOption?.TypeAccount,
      PageIndex: pageIndex,
      PageSize: pageSize,
    }
    reportStore.getPaymentReportExcel(payloadPayment)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          if (res?.report === 'error') {
            Modal.destroyAll()
            notification.error({
              message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{'Thông báo'}</ColorText>,
              description: 'Có lỗi xảy ra khi xuất báo cáo thanh toán mua sắm',
            })
            return
          }
          fileUtils.saveAsFile('TTMS TK DN', res?.report)
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
      title: 'Viễn thông (2)',
    },
    {
      id: 3,
      title: 'Hóa đơn (3)',
    },
    {
      id: 4,
      title: 'Mua sắm online (4)',
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
    <ReportPaymentTableWrapper>
      <Divider
        orientation={'center'}
        style={{ margin: '8px 0 24px 0' }}>
        BÁO CÁO THANH TOÁN MUA SẮM TÀI KHOẢN DOANH NGHIỆP
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
        scroll={{ x: 7200, y: 600 }}
        bordered={true}
        dataSource={reportPayment?.reports}
        columns={columns}
        rowKey={record => record?.AccountName}
        pagination={false} />
      <PaginationRow
        onChangePagination={handleChangePagination}
        currentListLength={reportPayment?.reports?.length - 1}
        totalCount={reportPayment?.infoResult?.TotalRecords}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageSizeOptions={[50, 100, 150, 200]}
      />
    </ReportPaymentTableWrapper>
  )
}

BusinessReportPaymentTable.propTypes = {
  filterOption: PropTypes.object,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  setPageSize: PropTypes.func,
}

export default inject('reportStore')(observer(BusinessReportPaymentTable))