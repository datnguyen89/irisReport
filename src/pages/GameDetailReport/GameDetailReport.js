import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { GameDetailReportWrapper } from './GameDetailReportStyled'
import { Button, Checkbox, Col, Divider, Dropdown, Form, Row, Table } from 'antd'
import UploadGameDetailFile from '../../components/UploadGameDetailFile'
import { CloudDownloadOutlined, EyeOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { DropdownShowColumnWrapper, RowSpaceBetweenDiv } from '../../components/CommonStyled/CommonStyled'
import Divide from 'lodash-es/divide'
import PaginationRow from '../../components/PaginationRow'
import dateUtils from '../../utils/dateUtils'
import { FULL_DATE, RESPONSE_CODE } from '../../utils/constant'
import fileUtils from '../../utils/fileUtils'
import DetailUserReportGameModal from '../../components/DetailUserReportGameModal/DetailUserReportGameModal'

const GameDetailReport = props => {
  // region props, hook, state =================
  const {
    reportStore,
  } = props

  const {
    listReportGameDetails,
    totalCountReportGameDetails,
  } = reportStore

  const [form] = Form.useForm()

  const [fileUpload, setFileUpload] = useState(null)
  const [fileBase64, setFileBase64] = useState(null)

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(50)

  const [openUserDetailModal, setOpenUserDetailModal] = useState(false)
  const [userDetailData, setUserDetailData] = useState(null)

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================
  const [showColumn, setShowColumn] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const dropdownShowColumn = [
    {
      id: 1,
      title: 'STT',
    },
    {
      id: 2,
      title: 'Tiêu đề chiến dịch',
    },
    {
      id: 3,
      title: 'GameUserID',
    },
    {
      id: 4,
      title: 'UserID',
    },
    {
      id: 5,
      title: 'TK Ví điện tử',
    },
    {
      id: 6,
      title: 'TK Tiền di động',
    },
    {
      id: 7,
      title: 'Họ tên',
    },
    {
      id: 8,
      title: 'Phần thưởng',
    },
    // {
    //   id: 9,
    //   title: 'Mã chung phần thưởng',
    // },
    {
      id: 10,
      title: 'Mã số dự thưởng',
    },
    {
      id: 11,
      title: 'Thời gian trúng thưởng',
    },
  ]

  const columns = [
    {
      id: 1,
      title: 'STT',
      width: 60,
      align: 'center',
      render: (item, row, index) => (pageSize * (pageIndex - 1)) + index + 1,
    },
    {
      id: 2,
      title: 'Tiêu đề chiến dịch',
      render: item => item?.campaignName,
    },
    {
      id: 3,
      title: 'GameUserID',
      render: item => item?.gameUserID,
    },
    {
      id: 4,
      title: 'UserID',
      render: item => item?.userID
        ?
        <a onClick={() => handleViewDetailUser(item?.userID)}>{item?.userID}</a>
        : 'Không tồn tại',
    },
    {
      id: 5,
      title: 'TK Ví điện tử',
      render: item => item?.accountMobifonePay,
    },
    {
      id: 6,
      title: 'TK Tiền di động',
      render: item => item?.accountMobifoneMoney,
    },
    {
      id: 7,
      title: 'Họ tên',
      render: item => item?.userName,
    },
    {
      id: 8,
      title: 'Phần thưởng',
      render: item => item?.rewardName,
    },
    // {
    //   id: 9,
    //   title: 'Mã chung phần thưởng',
    //   render: item => item?.rewardCode,
    // },
    {
      id: 10,
      title: 'Mã số dự thưởng',
      render: item => item?.rewardCodeDetail,
    },
    {
      id: 11,
      title: 'Thời gian trúng thưởng',
      render: item => item?.timeLogin,
    },
  ].filter(item => showColumn.includes(item.id))
  // endregion
  // region function handle logic ==============
  const handleViewDetailUser = (userId) => {
    let payload = {
      UserId: userId,
    }
    reportStore.getUserDetailsByUserId(payload)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          setUserDetailData(res?.param)
          setOpenUserDetailModal(true)
        }
      })
  }
  const handleCloseUserDetailModal = () => {
    setOpenUserDetailModal(false)
    setUserDetailData(null)
  }
  const handleChangePagination = (index, size) => {
    if (pageSize !== size) {
      setPageIndex(1)
      setPageSize(size)
    } else {
      setPageIndex(index)
    }
    let payload = {
      FileData: fileBase64,
      PageIndex: index,
      PageSize: size,
    }
    reportStore.getGameDetails(payload)
  }
  const onChangeShowColumn = (e) => {
    console.log(e)
    setShowColumn(e)
  }
  const handleClickExport = () => {
    let payload = {
      FileData: fileBase64,
      PageIndex: 1,
      PageSize: 10000000,
    }
    reportStore.getGameDetailsExcel(payload)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          const fileDataBase64 = res?.report
          fileUtils.saveAsFile('BCPhanThuongSuKien', fileDataBase64)
        }
      })
  }
  const handleFinish = (e) => {
    let payload = {
      FileData: fileBase64,
      PageIndex: pageIndex,
      PageSize: pageSize,
    }
    reportStore.getGameDetails(payload)
  }
  // endregion
  // region function render ====================
  const menu = (
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
  useEffect(() => {
    return () => {
      reportStore.resetListReportGameDetails()
      setPageIndex(1)
      setPageSize(50)
    }
  }, [])
  // endregion
  return (
    <GameDetailReportWrapper>
      <Form
        layout={'inline'}
        form={form}
        colon={false}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item>
          <UploadGameDetailFile
            uploadButton={
              <Button className={'btn-120'} icon={<UploadOutlined />}>Chọn file</Button>
            }
            callbackFile={e => setFileUpload(e)}
            callbackFileBase64={f => setFileBase64(f)} />
        </Form.Item>

        <Form.Item>
          <span>{fileUpload?.name || 'Vui lòng chọn file'}</span>
        </Form.Item>

        <Form.Item>
          <Button className={'btn-120'} type={'primary'} htmlType={'submit'}>Tra cứu</Button>
        </Form.Item>
      </Form>
      <Divider />

      {
        listReportGameDetails !== null
          ?
          <>
            <RowSpaceBetweenDiv margin={'0 0 16px 0'}>
              <Dropdown
                overlay={menu}
                trigger={['click']}>
                <Button>
                  <EyeOutlined /> Ẩn hiện cột
                </Button>
              </Dropdown>
              <Button onClick={handleClickExport}><CloudDownloadOutlined /> Xuất dữ liệu</Button>
            </RowSpaceBetweenDiv>
            <Table
              scroll={{ x: 1200 }}
              bordered={true}
              dataSource={listReportGameDetails}
              columns={columns}
              rowKey={record => record.id}
              pagination={false} />
            <PaginationRow
              onChangePagination={handleChangePagination}
              currentListLength={listReportGameDetails?.length}
              totalCount={totalCountReportGameDetails}
              pageIndex={pageIndex}
              pageSize={pageSize}
            />
          </>
          : null
      }
      <DetailUserReportGameModal
        open={openUserDetailModal}
        onClose={handleCloseUserDetailModal}
        userDetailData={userDetailData} />

    </GameDetailReportWrapper>
  )
}

GameDetailReport.propTypes = {}

export default inject('reportStore')(observer(GameDetailReport))