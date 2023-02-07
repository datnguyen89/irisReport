import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Modal, Table } from 'antd'
import { CommonH1, CommonH3, CommonSpan, FlexBox } from '../CommonStyled/CommonStyled'
import { BugTwoTone, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { ERROR_COLOR, STATUS_ACC, SUCCESS_COLOR } from '../../utils/constant'
import reportStore from '../../stores/reportStore'
import PaginationRow from '../PaginationRow'


const CheckAccountsModal = props => {
  // region props, hook, state =================
  const {
    open,
    onClose,
    onFilter,
    reportStore,
  } = props
  const {
    checkAccountList,
    payloadCheckAccounts,
    setPayloadCheckAccounts,
    resetPayloadCheckAccounts,
    resetCheckAccountList,
    fileNameCached,
  } = reportStore

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================
  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: 64,
      render: record => record?.ImportIndex,
    },
    {
      title: 'Số tài khoản',
      render: record => record?.UserCode,
    },
    {
      title: 'Nhóm KH',
      align: 'center',
      width: 100,
      render: record => record?.CustomerType,
    },
    {
      title: 'Loại tài khoản',
      render: record => record?.UserType,
    },
    {
      title: 'Kết quả',
      render: record => (
        <CommonSpan
          color={record?.StatusAcc === STATUS_ACC.VALID ? SUCCESS_COLOR : ERROR_COLOR}>{record?.StatusDesc}
        </CommonSpan>
      ),
    },
  ]
  // endregion
  // region function handle logic ==============
  const handleCancel = () => {
    resetPayloadCheckAccounts()
    resetCheckAccountList()
    onClose()
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
    let payload = {
      ...payloadCheckAccounts,
      PageIndex: 1,
      StatusAcc: e.target.checked ? STATUS_ACC.INVALID : STATUS_ACC.ALL,
    }
    setPayloadCheckAccounts(payload)
    reportStore.getCheckListAccountReport()
  }
  const handleChangePagination = (pageIndex, pageSize) => {
    if (payloadCheckAccounts.PageSize !== pageSize) {
      let payload = {
        ...payloadCheckAccounts,
        PageIndex: 1,
        PageSize: pageSize,
      }
      setPayloadCheckAccounts(payload)
    } else {
      let payload = {
        ...payloadCheckAccounts,
        PageIndex: pageIndex,
      }
      setPayloadCheckAccounts(payload)
    }
    reportStore.getCheckListAccountReport()
  }
  const handleFilter = () => {
    onClose()
    onFilter()
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <Modal
      width={1000}
      open={open}
      title={'Kiểm tra tệp tài khoản'}
      footer={null}
      onCancel={handleCancel}
    >
      <CommonH1>Tên file: {fileNameCached}</CommonH1>
      <FlexBox gap={'8px'} alignItems={'center'}>
        <CommonH3>
          Đã kiểm tra {checkAccountList?.infoResult?.TotalRecords}/{checkAccountList?.infoResult?.TotalRecords} bản ghi,
          phát hiện:
        </CommonH3>
        {
          Number(checkAccountList?.active) > 0
            ?
            <Checkbox onChange={onChange}>
              <CommonSpan color={'red'}>
                {checkAccountList?.notActive} không hợp lệ
              </CommonSpan>
            </Checkbox>
            :
            <span style={{ color: ERROR_COLOR }}>
              Không có tài khoản hợp lệ để tra cứu báo cáo
            </span>
        }

      </FlexBox>
      <CommonH3>* Lưu ý: Chỉ tra cứu báo cáo với <strong>tài khoản hợp lệ</strong></CommonH3>
      <Table
        style={{ margin: '16px 0' }}
        scroll={{ x: 768, y: 440 }}
        bordered={true}
        dataSource={checkAccountList?.result}
        columns={columns}
        rowKey={record => record.ImportIndex}
        pagination={false} />
      <PaginationRow
        onChangePagination={handleChangePagination}
        currentListLength={checkAccountList?.result?.length}
        totalCount={checkAccountList?.infoResult?.TotalRecords}
        pageIndex={payloadCheckAccounts.PageIndex}
        pageSize={payloadCheckAccounts.PageSize}
        pageSizeOptions={[50, 100, 150, 200]}
      />
      <FlexBox margin={'16px 0 0 0'} justifyContent={'center'} gap={'16px'}>
        <Button onClick={handleCancel} icon={<CloseOutlined />}>Đóng</Button>
        {
          Number(checkAccountList?.active) > 0 &&
          <Button onClick={handleFilter} type={'primary'} icon={<SearchOutlined />}>Tra cứu</Button>
        }

      </FlexBox>
    </Modal>
  )
}

CheckAccountsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
}

export default inject('reportStore')(observer(CheckAccountsModal))