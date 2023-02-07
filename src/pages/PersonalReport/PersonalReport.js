import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { PersonalReportWrapper } from './PersonalReportStyled'
import ReportFilterForm from '../../components/ReportFilterForm'
import { FILE_TYPE, REPORT_TYPE, STRING_DATE, USER_TYPE } from '../../utils/constant'
import reportStore from '../../stores/reportStore'
import PersonalReportAccountDetailTable from '../../components/PersonalReportAccountDetailTable'
import PersonalReportCrisisTable from '../../components/PersonalReportCrisisTable'
import PersonalReportPaymentTable from '../../components/PersonalReportPaymentTable'
import MobileMoneyReportAccountDetailTable from '../../components/MobileMoneyReportAccountDetailTable'
import MobileMoneyReportCrisisTable from '../../components/MobileMoneyReportCrisisTable'
import MobileMoneyReportPaymentTable from '../../components/MobileMoneyReportPaymentTable'

const PersonalReport = props => {
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
    reportStore.getFileNameCache({ FileType: FILE_TYPE.PERSONAL })
  }, [])
  // endregion
  return (
    <PersonalReportWrapper>
      <ReportFilterForm
        fileType={FILE_TYPE.PERSONAL}
        onFilter={handleFilter} />

      {/*Báo cáo thông tin tài khoản cá nhân*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.ACCOUNT_DETAILS.VALUE && filterOption?.TypeAccount === USER_TYPE.PERSONAL &&
        <PersonalReportAccountDetailTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }

      {/*Báo cáo thông tin tài khoản MM*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.ACCOUNT_DETAILS.VALUE && filterOption?.TypeAccount === USER_TYPE.MOBILE_MONEY &&
        <MobileMoneyReportAccountDetailTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }

      {/*Báo cáo biến động tài khoản cá nhân*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.CRISIS.VALUE && filterOption?.TypeAccount === USER_TYPE.PERSONAL &&
        <PersonalReportCrisisTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }

      {/*Báo cáo biến động tài khoản MM*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.CRISIS.VALUE && filterOption?.TypeAccount === USER_TYPE.MOBILE_MONEY &&
        <MobileMoneyReportCrisisTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }

      {/*Báo cáo thanh toán cá nhân*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.PAYMENT_REPORT.VALUE && filterOption?.TypeAccount === USER_TYPE.PERSONAL &&
        <PersonalReportPaymentTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }

      {/*Báo cáo thanh toán MM*/}
      {
        filterOption?.TypeReport === REPORT_TYPE.PAYMENT_REPORT.VALUE && filterOption?.TypeAccount === USER_TYPE.MOBILE_MONEY &&
        <MobileMoneyReportPaymentTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={e => setPageIndex(e)}
          setPageSize={e => setPageSize(e)}
          filterOption={filterOption} />
      }
    </PersonalReportWrapper>
  )
}

PersonalReport.propTypes = {}

export default inject('reportStore')(observer(PersonalReport))