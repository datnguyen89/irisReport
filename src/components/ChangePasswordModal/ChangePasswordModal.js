import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ChangePasswordModalWrapper, ErrorLabel } from './ChangePasswordModalStyled'
import { Button, Col, Form, Input, message, notification, Row } from 'antd'
import { ERROR_COLOR, ERROR_TITLE, RESPONSE_CODE } from '../../utils/constant'
import validator from '../../validator'
import { ColorText } from '../CommonStyled/CommonStyled'


const ChangePasswordModal = props => {
  // region props, hook, state
  const { onClose, visible, authenticationStore } = props
  const [formChangePassword] = Form.useForm()

  // endregion
  // region destructuring
  const { extendData } = authenticationStore
  const { jwtDecode } = authenticationStore

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const handleCancel = () => {
    onClose()
    formChangePassword.resetFields()
  }
  const onFinishChangePassword = (formCollection) => {
    if (formCollection.oldPassword === formCollection.password) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Mật khẩu mới không được trùng với mật khẩu cũ',
      })
      return
    }
    let payload = {
      UserName: jwtDecode.UniqueUserName,
      ExtendData: extendData,
      OldPassword: formCollection.oldPassword,
      NewPassword: formCollection.password,
    }
    authenticationStore.changePassword(payload)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          formChangePassword.resetFields()
          onClose()
          message.success('Đổi mật khẩu thành công')
        }
      })
  }
  // endregion
  // region function render

  // endregion
  // region side effect

  // endregion

  return (
    <ChangePasswordModalWrapper
      width={550}
      title='Đổi mật khẩu'
      forceRender={true}
      maskClosable={false}
      open={visible}
      footer={null}
      onCancel={handleCancel}>
      <Form
        form={formChangePassword}
        name='basic'
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinishChangePassword}
        autoComplete='off'
        colon={false}
      >
        <Form.Item
          label=''
          name='oldPassword'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
        >
          <Input.Password showCount maxLength={20} className={'auth-input'} placeholder={'Mật khẩu hiện tại'} />
        </Form.Item>
        <Form.Item
          label=''
          name='password'
          rules={[
            { validator: validator.validateChangePassword },
          ]}
        >
          <Input.Password showCount maxLength={20} className={'auth-input'} placeholder={'Mật khẩu mới'} />
        </Form.Item>
        <Form.Item
          label=''
          dependencies={['password']}
          name='confirmPassword'
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp'))
              },
            }),
          ]}
        >
          <Input.Password showCount maxLength={20} className={'auth-input'} placeholder={'Xác nhận mật khẩu mới'} />
        </Form.Item>
        <Form.Item>
          <ErrorLabel>
            * Vui lòng đặt mật khẩu gồm cả số và chữ, tối thiểu 8 ký tự và chứa ký tự đặc biệt
          </ErrorLabel>
        </Form.Item>
        <Row align={'middle'} justify={'center'}>
          <Col span={11}>
            <Button type='primary' htmlType='submit' block>
              Tiếp theo
            </Button>
          </Col>
        </Row>
      </Form>
    </ChangePasswordModalWrapper>
  )
}

ChangePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default inject('authenticationStore')(observer(ChangePasswordModal))