import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { BusinessReportWrapper } from './BusinessReportStyled'
import { FILE_TYPE, REPORT_TYPE, STRING_DATE, USER_TYPE } from '../../utils/constant'
import ReportFilterForm from '../../components/ReportFilterForm'
import reportStore from '../../stores/reportStore'
import BusinessReportAccountDetailTable from '../../components/BusinessReportAccountDetailTable'
import BusinessReportCrisisTable from '../../components/BusinessReportCrisisTable'
import BusinessReportPaymentTable from '../../components/BusinessReportPaymentTable'

const BusinessReport = props => {
  // region props, hook, state =================
  const { reportStore } = props
  const {
    resetReportAccountDetail,
    resetReportCrisis,
    resetReportPayment,
  } = reportStore

  const [filterOption, setFilterOption] = useState(null)

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(50)

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleFilter = (e) => {
    resetReportAccountDetail()
    resetReportCrisis()
    resetReportPayment()
    setFilterOption(e)
    setPageIndex(1)
    switch (e?.TypeReport) {
      case REPORT_TYPE.ACCOUNT_DETAILS.VALUE:
        let payloadAcc = {
          TypeAccountGroup: e?.TypeAccountGroup,
          UserType: e?.TypeAccount,
          PageIndex: 1,
          PageSize: pageSize,
        }
        reportStore.getAccountDetails(payloadAcc)
        break
      case REPORT_TYPE.CRISIS.VALUE:
        let payloadCrisis = {
          Fromdate: e?.RangePicker[0].format(STRING_DATE),
          Todate: e?.RangePicker[1].format(STRING_DATE),
          TypeAccountGroup: e?.TypeAccountGroup,
          UserType: e?.TypeAccount,
          PageIndex: 1,
          PageSize: pageSize,
        }
        reportStore.getCrisis(payloadCrisis)
        break
      case REPORT_TYPE.PAYMENT_REPORT.VALUE:
        let payloadPayment = {
          Fromdate: e?.RangePicker[0].format(STRING_DATE),
          Todate: e?.RangePicker[1].format(STRING_DATE),
          TypeAccountGroup: e?.TypeAccountGroup,
          UserType: e?.TypeAccount,
          PageIndex: 1,
          PageSize: pageSize,
        }
        reportStore.getPaymentReport(payloadPayment)
        break
      default:
        break
    }
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    reportStore.getFileNameCache({ FileType: FILE_TYPE.BUSINESS })
  }, [])
  // endregion
  return (
    <BusinessReportWrapper>
      <ReportFilterForm
        fileType={FILE_TYPE.BUSINESS}
        onFilter={handleFilter} />
      {/*Báo cáo thông tin tài khoản doanh nghiệp*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.ACCOUNT_DETAILS.VALUE && filterOption?.TypeAccount === USER_TYPE.BUSINESS &&
        <BusinessReportAccountDetailTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }
      {/*Báo cáo biến động tài khoản doanh nghiệp*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.CRISIS.VALUE && filterOption?.TypeAccount === USER_TYPE.BUSINESS &&
        <BusinessReportCrisisTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }
      {/*Báo cáo thanh toán tài khoản doanh nghiệp*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.PAYMENT_REPORT.VALUE && filterOption?.TypeAccount === USER_TYPE.BUSINESS &&
        <BusinessReportPaymentTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }
    </BusinessReportWrapper>
  )
}

BusinessReport.propTypes = {}

export default inject('reportStore')(observer(BusinessReport))
