import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { EditExecutionUserModalWrapper } from './EditExecutionUserModalStyled'
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, TreeSelect } from 'antd'
import { toJS } from 'mobx'
import { RowCenterDiv } from '../CommonStyled/CommonStyled'
import { EXECUTION_ORDER_STATUS, EXECUTION_TYPE_ID, RESPONSE_CODE, ROLES, SHORT_DATE } from '../../utils/constant'
import { EditOutlined } from '@ant-design/icons'
import dateUtils from '../../utils/dateUtils'
import moment from 'moment'
import validator from '../../validator'

const { SHOW_CHILD } = TreeSelect

const EditExecutionUserModal = props => {
  // region props, hook, state =================
  const {
    visible,
    editingExecution,
    onClose,
    onSuccess,
    orderStore,
    propertyStore,
    departmentStore,
  } = props

  const [formInsertUser] = Form.useForm()

  const [disabledChooseAccount, setDisabledChooseAccount] = useState(true)
  // endregion
  // region destructuring ======================
  const {
    listTreeRoleByRoleType,
    listRoleDefault,
    commonProperty,
    listCity,
    listDistrict,
    listWards,
  } = propertyStore
  const {
    listMembersByOrganizationID,
    orgInfoByOrganizationID,
    orgPropsByOrganizationID,
  } = departmentStore
  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleFinish = (e) => {
    let departmentName = orgPropsByOrganizationID?.departments.find(item => item.departmentID === e.DepartmentID)?.departmentName
    let payload = {
      ExecutionID: Number(editingExecution?.executionID),
      DepartmentID: e.DepartmentID,
      OrganizationID: editingExecution?.createdOrg,
      UserInfo: {
        FullName: e.FullName,
        UserName: e.UserName,
        Mobile: e.Mobile,
        DepartmentName: departmentName,
        OrganizationName: JSON.parse(orgInfoByOrganizationID?.Attributes)?.BusinessName,
        SecureType: e.SecureType,
        BirthDay: dateUtils.convertToMilliseconds(e.BirthDay),
        RoleType: e.RoleType,
        RoleID: toJS(e.RoleID),
        ListAccountsUse: e.ListAccountsUse,
        Email: e.Email,
        Position: e.Position,
        Gender: e.Gender,
        Status: e.Status,
      },
    }
    switch (editingExecution?.executionType) {
      case EXECUTION_TYPE_ID.ADD_USER:
        orderStore.updateCreateUserExecution(payload)
          .then(res => {
            if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
              message.success(res?.description)
              onSuccess()
            }
          })
        break
      case EXECUTION_TYPE_ID.UPDATE_USER:
        orderStore.updateEditUserExecution(payload)
          .then(res => {
            if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
              message.success(res?.description)
              onSuccess()
            }
          })
        break
      default:
        break
    }

  }
  const handleClose = () => {
    formInsertUser.resetFields()
    propertyStore.resetTreeRole()
    departmentStore.setOrgInfoByOrganizationID(null)
    onClose()
  }
  const handleChangeRoleType = (role) => {
    // Nếu role là tạo lập thì bỏ disable chọn tài khoản
    propertyStore.resetTreeRole()
    let payload = {
      RoleType: role,
      ClientID: 6,
    }
    propertyStore.getTreeRoleByRoleType(payload)
      .then(() => {
        if (role === 'INIT') {
          setDisabledChooseAccount(false)
          console.log(toJS(orgInfoByOrganizationID?.param))
          if (orgInfoByOrganizationID?.param?.length > 0) {
            formInsertUser.setFieldsValue({
              ListAccountsUse: [orgInfoByOrganizationID?.param[0]?.accountName],
            })
          }
        } else {
          setDisabledChooseAccount(true)
          formInsertUser.setFieldsValue({
            ListAccountsUse: undefined,
          })
        }
      })
  }
  const validateListAccountsUse = (rule, value, callback) => {
    let roleType = formInsertUser.getFieldValue('RoleType')
    console.log(roleType, value)
    if (roleType === 'INIT' && (!value || value?.length === 0)) {
      callback(`Vui lòng chọn tài khoản sử dụng`)
    } else {
      callback()
    }
  }
  const disabledDate = (current) => {
    // Không được chọn ngày sinh ở tương lai
    return current && current > moment().startOf('day').add(1, 'days')
  }
  const checkUserName = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9_.-]*$/
    if (value && !regex.test(value)) {
      callback('Tên đăng nhập chỉ bao gồm các ký tự chữ, số và ". _ -"')
    } else {
      callback()
    }
  }
  const checkPhoneNumber = (rule, value, callback) => {
    const regex = /(0[0-9])+([0-9]{8})\b/g
    if (value && (!regex.test(value) || value.length > 12)) {
      callback('Số điện thoại không đúng định dạng')
    } else {
      callback()
    }
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (!editingExecution) return
    let payload = {
      ExecutionID: Number(editingExecution?.executionID),
    }
    departmentStore.getMembersByOrganizationID({ AccountName: editingExecution?.createdOrg })
      .then(() => {
        orderStore.getUserExecutionDetail(payload)
          .then((res) => {
            if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
              const executionData = JSON.parse(editingExecution?.executionData)
              const orderStatusData = JSON.parse(editingExecution?.orderStatusData)
              const lastReject = orderStatusData.map(item => {
                if (item?.OrderStatus === EXECUTION_ORDER_STATUS.REJECT) {
                  return item?.Reason
                }
              })?.slice(-1)
              console.log('executionData?.UserInfo?.RoleID', executionData?.UserInfo?.RoleID)
              handleChangeRoleType(executionData?.UserInfo?.RoleType)
              formInsertUser.setFieldsValue({
                FullName: executionData?.UserInfo?.FullName,
                DepartmentID: editingExecution?.createdDept,
                UserName: executionData?.UserInfo?.UserName,
                RoleType: executionData?.UserInfo?.RoleType,
                Mobile: executionData?.UserInfo?.Mobile,
                Email: executionData?.UserInfo?.Email,
                SecureType: executionData?.UserInfo?.SecureType,
                Position: executionData?.UserInfo?.Position,
                BirthDay: dateUtils.convertToDatetime(executionData?.UserInfo?.BirthDay, SHORT_DATE),
                Gender: executionData?.UserInfo?.Gender > 0 ? executionData?.UserInfo?.Gender : undefined,
                ListAccountsUse: executionData?.UserInfo?.ListAccountsUse,
                RoleID: executionData?.UserInfo?.RoleID,
                Reason: lastReject,
                Status: res?.param?.status,
              })
            }
          })
      })
  }, [editingExecution])
  useEffect(() => {
    if (!visible) return
    if (!editingExecution) return
    const roleType = formInsertUser.getFieldValue('RoleType')
    const executionData = JSON.parse(editingExecution?.executionData)
    if (!listTreeRoleByRoleType || listTreeRoleByRoleType?.length === 0 || !listRoleDefault || listRoleDefault?.length === 0) {
      formInsertUser.setFieldsValue({
        RoleID: undefined,
      })
    } else {
      formInsertUser.setFieldsValue({
        RoleID: executionData?.UserInfo?.RoleType === roleType ? executionData?.UserInfo?.RoleID : listRoleDefault,
      })
    }
  }, [listTreeRoleByRoleType, listRoleDefault, editingExecution])
  // endregion
  return (
    <EditExecutionUserModalWrapper>
      <Modal
        style={{ top: 50 }}
        forceRender
        open={visible}
        width={'80%'}
        title={'Thay đổi thông tin User'}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          onFinish={handleFinish}
          form={formInsertUser}
          colon={false}
          labelAlign={'left'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={[64, 16]}>
            <Col span={12}>
              <Form.Item
                name={'FullName'}
                rules={[
                  { required: true, message: 'Vui lòng nhập họ tên' },
                  { validator: validator.validateTrimNoSpecial },
                ]}
                label={'Họ tên User'}>
                <Input maxLength={100} showCount placeholder={'Họ tên User'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'DepartmentID'}
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
                label={'Phòng ban'}
              >
                <Select placeholder='Chọn phòng ban'>
                  {
                    orgPropsByOrganizationID?.departments && orgPropsByOrganizationID?.departments.map(item =>
                      <Select.Option key={item?.departmentID}
                                     value={item?.departmentID}>{item?.departmentName}</Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'UserName'}
                rules={[
                  { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                  { validator: checkUserName },
                ]}
                label={'Tên đăng nhập'}>
                <Input maxLength={30} showCount placeholder={'Tên đăng nhập'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'RoleType'}
                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                label={'Vai trò'}
              >
                <Select placeholder={'Chọn vai trò'} onChange={handleChangeRoleType}>
                  {
                    commonProperty?.roleType && commonProperty?.roleType.map(item =>
                      item?.value !== 'ADMIN' &&
                      <Select.Option
                        key={item?.value}
                        value={item?.value}>{item?.name}
                      </Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'Mobile'}
                rules={[
                  { required: true, message: 'Vui lòng nhập số di động' },
                  { validator: checkPhoneNumber },
                ]}
                label={'Di động'}>
                <Input showCount={true} maxLength={10} placeholder={'Di động'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'Email'}
                rules={[
                  { required: true, message: 'Vui lòng nhập Email' },
                ]}
                label={'Email'}>
                <Input maxLength={100} showCount placeholder={'Email'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'SecureType'}
                rules={[{ required: true, message: 'Vui chọn hình thức bảo mật' }]}
                label={'Hình thức bảo mật'}
              >
                <Select placeholder='Vui lòng chọn'>
                  {
                    commonProperty?.secureType && commonProperty?.secureType.map(item =>
                      <Select.Option key={item?.value}
                                     value={item?.value}>{item?.name}</Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'Position'}
                label={'Chức vụ'}>
                <Input maxLength={20} showCount placeholder={'Chức vụ'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'BirthDay'}
                label={'Ngày sinh'}>
                <DatePicker disabledDate={disabledDate} style={{ width: '100%' }} format={SHORT_DATE} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'Gender'}
                label={'Giới tính'}
              >
                <Select placeholder={'Vui lòng chọn'}>
                  {
                    commonProperty?.gender && commonProperty?.gender.map(item =>
                      <Select.Option key={item?.value}
                                     value={item?.value}>{item?.name}</Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col
              span={12}
              className={'hidden'}
            >
              <Form.Item
                name={'ListAccountsUse'}
                rules={[{ validator: validateListAccountsUse }]}
                label={
                  <span className={'custom-required'}>Tài khoản sử dụng</span>
                }
              >
                <Select
                  placeholder={disabledChooseAccount ? '' : 'Tất cả'}
                  disabled={disabledChooseAccount}
                  mode='multiple' optionLabelProp='label'>
                  {
                    orgInfoByOrganizationID?.param && orgInfoByOrganizationID?.param.map(item =>
                      <Select.Option
                        key={item?.accountName}
                        value={item?.accountName}
                      >
                        {item?.accountName}
                      </Select.Option>,
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'RoleID'}
                rules={[{ required: true, message: 'Vui lòng chọn chức năng sử dụng' }]}
                label={'Chức năng sử dụng'}
              >
                {
                  listTreeRoleByRoleType && listTreeRoleByRoleType?.length > 0 ?
                    <TreeSelect
                      showArrow
                      suffixIcon={<EditOutlined />}
                      showSearch
                      treeNodeFilterProp={'title'}
                      treeData={listTreeRoleByRoleType}
                      treeDefaultExpandAll
                      treeCheckable
                      showCheckedStrategy={SHOW_CHILD}
                      placeholder={'Chức năng sử dụng'}
                      style={{ width: '100%' }} />
                    : <Select placeholder={'Chức năng sử dụng'} />
                }
              </Form.Item>
            </Col>
            {
              editingExecution?.executionType === EXECUTION_TYPE_ID.UPDATE_USER &&
              <Col xxl={12} xl={12} lg={18} md={24} sm={24} xs={24}>
                <Form.Item
                  name={'Status'}
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                  label={'Trạng thái'}
                >
                  <Select>
                    <Select.Option value={1}>Hoạt động</Select.Option>
                    <Select.Option value={0}>Tạm dừng</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            }
            {
              editingExecution?.orderStatus === EXECUTION_ORDER_STATUS.REJECT &&
              <Col span={24}>
                <Form.Item
                  name={'Reason'}
                  label={'Lý do từ chối'}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input.TextArea
                    maxLength={200}
                    showCount
                    disabled={true}
                    placeholder={'Lý do'} rows={3} />
                </Form.Item>
              </Col>
            }
          </Row>
          <RowCenterDiv>
            <Button
              onClick={handleClose}
              style={{ minWidth: 120, marginRight: 16 }}
            >
              Hủy
            </Button>
            <Button type={'primary'} htmlType={'submit'}>Lưu thông tin</Button>
          </RowCenterDiv>
        </Form>
      </Modal>
    </EditExecutionUserModalWrapper>
  )
}

EditExecutionUserModal.propTypes = {
  visible: PropTypes.bool,
  editingExecution: PropTypes.object,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
}

export default inject('orderStore', 'propertyStore', 'departmentStore')(observer(EditExecutionUserModal))