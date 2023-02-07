import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ForgotPasswordDescription,
  ForgotPasswordPageWrapper,
  FormForgotPasswordWrapper,
} from './ForgotPasswordPageStyled'
import { LoginTitle } from '../LoginPage/LoginPageStyled'
import { Button, Col, Form, Input, notification, Row } from 'antd'
import OtpModal from '../../../components/OtpModal'
import validator from '../../../validator'
import { useHistory } from 'react-router-dom'
import { PAGES, RESPONSE_CODE, SUCCESS_COLOR, SUCCESS_TITLE } from '../../../utils/constant'
import { ColorText } from '../../../components/CommonStyled/CommonStyled'

const ForgotPasswordPage = props => {
  // region props, hook, state =================
  const {
    commonStore,
    authenticationStore,
  } = props
  const [formStep1] = Form.useForm()
  const [formStep2] = Form.useForm()
  const history = useHistory()

  const [visibleOtp, setVisibleOtp] = useState(false)
  const [processStep, setProcessStep] = useState(1)
  const [extendData, setExtendData] = useState(null)
  const [handlingUser, setHandlingUser] = useState(null)

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const onFinishStep1 = (formCollection) => {
    let payload = {
      Step: 1,
      AccountName: formCollection.userName,
      Mobile: formCollection.mobile,
      Email: formCollection.email,
    }
    setHandlingUser({
      AccountName: formCollection.userName,
    })
    authenticationStore.forgotPasswordCMSCustomer(payload)
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
          setExtendData(res?.extendData)
          setProcessStep(2)
        }
      })
  }
  const onFinishStep2 = (formCollection) => {
    let payload = {
      Step: 2,
      ExtendData: extendData,
      Password: formCollection.password,
    }
    setHandlingUser(
      { ...handlingUser, Password: formCollection.password },
    )
    authenticationStore.forgotPasswordCMSCustomer(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.MAX_OTP_FAILED:
            setExtendData(null)
            setVisibleOtp(false)
            setProcessStep(1)
            break
          case RESPONSE_CODE.REQUIRE_OTP:
            setExtendData(res?.extendData)
            setVisibleOtp(true)
            break
          default:
            break
        }
      })
  }

  const handleCancelOtp = () => {
    setVisibleOtp(false)
  }

  const resetForm = () => {
    formStep1.resetFields()
    formStep2.resetFields()
    setExtendData(null)
    setVisibleOtp(false)
    setProcessStep(1)
    setHandlingUser(null)
  }
  const handleSubmitOtp = (otp) => {
    let payload = {
      Step: 3,
      ExtendData: extendData,
      SecureCode: otp,
      AccountName: handlingUser.AccountName,
      Password: handlingUser.Password,
    }
    authenticationStore.forgotPasswordCMSCustomer(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.MAX_OTP_FAILED:
            resetForm()
            break
          case RESPONSE_CODE.SUCCESS:
            setVisibleOtp(false)
            notification.success({
              message: <ColorText fontSize={'20px'} color={SUCCESS_COLOR}>{SUCCESS_TITLE}</ColorText>,
              description: res?.description,
            })

            resetForm()

            history.push(PAGES.LOGIN.PATH)
            break
          default:
            break
        }
      })
  }
  const handleClickBack = () => {
    setProcessStep(1)
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================


  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [])

  // endregion
  return (
    <ForgotPasswordPageWrapper>
      <LoginTitle color={commonStore.appTheme.solidColor}>CMS MobiFone Money</LoginTitle>
      <ForgotPasswordDescription>Quên mật khẩu</ForgotPasswordDescription>
      <FormForgotPasswordWrapper>
        {
          processStep === 1 &&
          <Form form={formStep1}
                onFinish={onFinishStep1}
                colon={false}
                labelAlign={'left'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
            <Form.Item
              label={'Tên đăng nhập'}
              name={'userName'}
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input maxLength={30} showCount placeholder={'Tên đăng nhập'} />
            </Form.Item>
            <Form.Item
              label={'Số điện thoại'}
              name={'mobile'}
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { validator: validator.validatePhoneNumber },
              ]}
            >
              <Input maxLength={10} showCount placeholder={'Số điện thoại'} />
            </Form.Item>
            <Form.Item
              rules={[
                { validator: validator.validateEmail },
                { required: true, message: 'Vui lòng nhập email' },
              ]}
              label={'Email'}
              name={'email'}
            >
              <Input maxLength={100} placeholder={'Nhập nội dung'} showCount={true} />
            </Form.Item>
            <Row gutter={[16, 16]} justify={'end'}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button block type={'default'} onClick={() => history.push(PAGES.LOGIN.PATH)}>
                  Về đăng nhập
                </Button>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button block type={'primary'} htmlType={'submit'}>
                  Tiếp theo
                </Button>
              </Col>
            </Row>
          </Form>
        }
        {
          processStep === 2 &&
          <Form form={formStep2}
                onFinish={onFinishStep2}
                colon={false}
                labelAlign={'left'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
            <Form.Item
              label={<span className={'custom-required'}>Mật khẩu mới</span>}
              name='password'
              rules={[
                { validator: validator.validateChangePassword },
              ]}
            >
              <Input.Password
                maxLength={30}
                showCount
                placeholder={'Mật khẩu mới'} />
            </Form.Item>
            <Form.Item
              label='Xác nhận mật khẩu mới'
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
              <Input.Password
                maxLength={30}
                showCount
                placeholder={'Xác nhận mật khẩu mới'} />
            </Form.Item>
            <Row gutter={[16, 16]} justify={'end'}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button block type={'default'} onClick={handleClickBack}>Quay lại</Button>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button block type={'primary'} htmlType={'submit'}>
                  Xác nhận
                </Button>
              </Col>
            </Row>
          </Form>
        }
      </FormForgotPasswordWrapper>

      <OtpModal
        phoneNumber={''}
        description={''}
        visible={visibleOtp}
        onCancel={handleCancelOtp}
        callbackOtp={handleSubmitOtp} />
    </ForgotPasswordPageWrapper>
  )
}

ForgotPasswordPage.propTypes = {}

export default inject('commonStore', 'authenticationStore')(observer(ForgotPasswordPage))
