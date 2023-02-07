import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Col, Descriptions, Divider, Form, Input, message, Modal, notification, Row, Tabs, Tag } from 'antd'
import { ColorText, RowCenterDiv } from '../CommonStyled/CommonStyled'
import { CheckCircleOutlined, CheckSquareOutlined, StopOutlined } from '@ant-design/icons'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ApproveBusinessUserModalWrapper } from './ApproveBusinessUserModalStyled'
import stringUtils from '../../utils/stringUtils'
import dateUtils from '../../utils/dateUtils'
import { ERROR_COLOR, ERROR_TITLE, EXECUTION_TYPE_ID, RESPONSE_CODE, ROLES } from '../../utils/constant'

const { TabPane } = Tabs

const ApproveBusinessUserModal = props => {
  // region props, hook, state
  const { visible, onClose, onSuccess, execution, orderStore, authenticationStore, propertyStore } = props

  const [reason, setReason] = useState(undefined)

  // endregion
  // region destructuring
  const { commonProperty } = propertyStore
  const { userExecutionDetail } = orderStore
  const { extendData } = authenticationStore
  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleChangeReason = (v) => {
    setReason(v.currentTarget.value)
  }
  const handleConfirm = (confirmStatus) => {
    if (!confirmStatus && (!reason || reason.trim()?.length === 0)) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng nhập lý do từ chối',
      })
      return
    }
    Modal.confirm({
      title: 'Thông báo',
      icon: confirmStatus ? <CheckCircleOutlined /> : <StopOutlined />,
      content: `Bạn có chắc chắn ${confirmStatus ? 'phê duyệt' : 'từ chối phê duyệt'} ${execution?.executionType === EXECUTION_TYPE_ID.ADD_USER ? 'tạo' : 'sửa thông tin'} người dùng (user) doanh nghiệp?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        let payload = {
          ApprovalStatus: confirmStatus,
          Reason: reason || '',
          ExecutionID: Number(execution.executionID),
          UpdateTime: Number(execution.updateTime),
          ExtendData: extendData,
        }
        switch (execution?.executionType) {
          case EXECUTION_TYPE_ID.ADD_USER:
            orderStore.confirmApprovalUserExecution(payload)
              .then(res => {
                if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                  onSuccess()
                  setReason('')
                  message.success(res?.description)
                }
              })
            break
          case EXECUTION_TYPE_ID.UPDATE_USER:
            orderStore.confirmApprovalEditUserExecution(payload)
              .then(res => {
                if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
                  onSuccess()
                  setReason('')
                  message.success(res?.description)
                }
              })
            break
          default:
            break
        }
      },
      onCancel: () => {
      },
    })
  }
  const handleCancel = () => {
    setReason(undefined)
    onClose()
  }
  // endregion
  // region function render
  const renderRoleType = (v) => {
    return commonProperty?.roleType.find(item => item?.value === v)?.name || ''
  }
  const renderSecureType = (v) => {
    return commonProperty?.secureType.find(item => item?.value === v)?.name || ''
  }
  const renderGender = (v) => {
    return commonProperty?.gender.find(item => item?.value === v)?.name || ''
  }
  const renderRole = (v) => {
    return commonProperty?.role.find(item => item?.value === v)?.title || ''
  }
  const renderBusinessType = (v) => {
    return commonProperty?.businessType.find(item => item?.value === v)?.name || ''
  }
  const renderGroupCustomer = (v) => {
    return commonProperty?.groupCustomer.find(item => item?.value === v)?.name || ''
  }
  const renderExecutionTypeName = e => {
    return commonProperty?.executionType?.find(item => item.value === e)?.name || ''
  }
  // endregion
  // region side effect
  useEffect(() => {
    if (!execution) return
    let payload = {
      ExecutionID: Number(execution?.executionID),
    }
    orderStore.getUserExecutionDetail(payload)
  }, [execution])

  useEffect(() => {
    if (!stringUtils.parseDataJson(execution?.executionData)?.ApproveReason) return
    setReason(stringUtils.parseDataJson(execution?.executionData)?.ApproveReason)
  }, [execution])
  // endregion

  return (
    <ApproveBusinessUserModalWrapper>
      <Modal
        width={'90%'}
        style={{ top: '50px' }}
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        title={authenticationStore.checkRole(ROLES.APPROVEORG) ? 'Duyệt User doanh nghiệp' : 'Xem thông tin'}
        open={visible}>

        <Divider>Thông tin doanh nghiệp</Divider>
        <Descriptions
          column={8}
          className={'mt-16 mb-16'}
          layout={'vertical'}
          bordered
          size={'small'}>
          <Descriptions.Item label={'Tên khách hàng'}>
            {userExecutionDetail && userExecutionDetail?.bussinessInfo?.businessName}
          </Descriptions.Item>
          <Descriptions.Item label={'Loại khách hàng'}>
            {renderBusinessType(userExecutionDetail && userExecutionDetail?.bussinessInfo?.businessType)}
          </Descriptions.Item>
          <Descriptions.Item label={'Nhóm KH'}>
            {renderGroupCustomer(userExecutionDetail && userExecutionDetail?.bussinessInfo?.customerGroup)}
          </Descriptions.Item>
          <Descriptions.Item label={'Số ĐKKD'}>
            {userExecutionDetail && userExecutionDetail?.bussinessInfo?.businessCertification}
          </Descriptions.Item>
          <Descriptions.Item label={'Mã số thuế'}>
            {userExecutionDetail && userExecutionDetail?.bussinessInfo?.taxCode}
          </Descriptions.Item>
          <Descriptions.Item label={'Số điện thoại'}>
            {userExecutionDetail && userExecutionDetail?.bussinessInfo?.moblie}
          </Descriptions.Item>
          <Descriptions.Item label={'Thời gian đăng ký'}>
            {userExecutionDetail && dateUtils.convertToStrDate(userExecutionDetail?.createdTime, 'DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label={'Trạng thái'}>
            {userExecutionDetail && userExecutionDetail?.status === 0 ? 'Ngừng hoạt động' : 'Hoạt động'}
          </Descriptions.Item>
        </Descriptions>

        <Divider>Thông tin user</Divider>
        <Descriptions
          labelStyle={{ width: '15%' }}
          column={2}
          className={'mt-16 mb-16'}
          bordered
          size={'small'}>
          <Descriptions.Item label={'Họ tên User'}>
            {stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.FullName}
          </Descriptions.Item>
          <Descriptions.Item label={'Phòng ban'}>
            {userExecutionDetail && userExecutionDetail?.deparmentName}
          </Descriptions.Item>
          <Descriptions.Item label={'Tên đăng nhập'}>
            {stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.UserName}
          </Descriptions.Item>
          <Descriptions.Item label={'Vai trò'}>
            {renderRoleType(stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.RoleType)}
          </Descriptions.Item>
          <Descriptions.Item label={'Di động'}>
            {stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.Mobile}
          </Descriptions.Item>
          <Descriptions.Item label={'Email'}>
            {stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.Email}
          </Descriptions.Item>
          <Descriptions.Item label={'Hình thức bảo mật'}>
            {renderSecureType(stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.SecureType)}
          </Descriptions.Item>
          <Descriptions.Item label={'Chức vụ'}>
            {stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.Position}
          </Descriptions.Item>
          <Descriptions.Item label={'Ngày sinh'}>
            {dateUtils.convertToStrDate(stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.BirthDay, 'DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label={'Giới tính'}>
            {renderGender(stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.Gender)}
          </Descriptions.Item>
          <Descriptions.Item className={'hidden'} span={2} label={'Tài khoản sử dụng'}>
            {
              stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.ListAccountsUse &&
              stringUtils.parseDataJson(execution?.executionData)?.UserInfo?.ListAccountsUse?.map(item =>
                <Tag style={{ margin: 8 }} key={item}>{item}</Tag>,
              )
            }
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'Chức năng sử dụng'}>
            {
              userExecutionDetail?.roleID && userExecutionDetail?.roleID?.length > 0 && userExecutionDetail?.roleID?.map(item =>
                <Tag style={{ margin: 8 }} key={item}>
                  {renderRole(item)}
                </Tag>,
              )
            }
          </Descriptions.Item>
          <Descriptions.Item label={'Nội dung'}>
            {renderExecutionTypeName(execution?.executionType)}
          </Descriptions.Item>
          <Descriptions.Item label={'Người tạo'}>
            {userExecutionDetail && userExecutionDetail?.createdUser}
          </Descriptions.Item>
          <Descriptions.Item label={'Thời gian tạo'}>
            {dateUtils.convertToStrDate(execution?.createdTime, 'DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>

        <Divider>Thông tin phê duyệt</Divider>

        <Form
          colon={false}>
          <Row justify={'center'}>
            <Col span={18}>
              <Form.Item label={''}>
                <Input.TextArea
                  maxLength={200}
                  showCount
                  disabled={!authenticationStore.checkRole(ROLES.APPROVEORG) || execution?.orderStatus !== 0}
                  value={reason} placeholder={'Lý do'}
                  onChange={handleChangeReason} rows={4} />
              </Form.Item>
            </Col>
          </Row>
          {
            authenticationStore.checkRole(ROLES.APPROVEORG) && execution?.orderStatus === 0 &&
            <RowCenterDiv>
              <Button className={'mr-16'} onClick={() => handleConfirm(false)}>
                <StopOutlined /> Từ chối
              </Button>
              <Button type={'primary'} onClick={() => handleConfirm(true)}>
                <CheckSquareOutlined /> Phê duyệt
              </Button>
            </RowCenterDiv>
          }
        </Form>
      </Modal>
    </ApproveBusinessUserModalWrapper>
  )
}

ApproveBusinessUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  execution: PropTypes.any,
}

export default inject('orderStore', 'propertyStore', 'authenticationStore')(observer(ApproveBusinessUserModal))