import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import AuthLayout from '../../../layouts/AuthLayout'
import { Button, Checkbox, Col, Divider, Form, Input, message, notification, Row } from 'antd'
import { FormLoginWrapper, LoginDescription, LoginDivider, LoginPageWrapper, LoginTitle } from './LoginPageStyled'
import { useHistory, useLocation } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ColorLink, ColorText, RowCenterDiv } from '../../../components/CommonStyled/CommonStyled'
import { APP_CLIENT_ID, ERROR_COLOR, ERROR_TITLE, PAGES, RESPONSE_CODE } from '../../../utils/constant'
import OtpModal from '../../../components/OtpModal'
import ReCAPTCHA from 'react-google-recaptcha'
import ConditionDisplay from '../../../components/ConditionDisplay'
import { recapchaSitekey } from '../../../config'

const LoginPage = props => {
  // region props, hook, state
  const { commonStore, authenticationStore } = props
  const history = useHistory()
  const location = useLocation()
  const [formLogin] = Form.useForm()
  const [visibleOtp, setVisibleOtp] = useState(false)
  const [currPayload, setCurrPayload] = useState({})
  const [extendData, setExtendData] = useState('')
  const [numberLoginFail, setNumberLoginFail] = useState(0)
  const [capChaValue, setCapChaValue] = useState(null)
  // endregion
  // region destructuring
  const { appLoading } = commonStore

  // endregion
  // region variable

  // endregion
  // region function handle logic
  const onFinish = (formCollection) => {
    console.log(formCollection)
    if (appLoading) return
    if (numberLoginFail >= 2 && !capChaValue) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Bạn chưa tích capcha',
      })
      return
    }

    let payload = {
      // ExtendData: '',
      // ActiveCode: '',
      UserName: formCollection.userName,
      Password: formCollection.password,
      ClientId: APP_CLIENT_ID,
    }

    authenticationStore.userLogin(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            history.push((location?.state?.from && location?.state?.from !== PAGES.LOGIN.PATH) ? location?.state?.from : PAGES.HOME.PATH)
            break
          case -10021:
            payload.Description = res?.description
            setCurrPayload(payload)
            setVisibleOtp(true)
            setExtendData(res?.extendData)
            break
          case -53:
            setNumberLoginFail(numberLoginFail + 1)
            break
          default:
            setNumberLoginFail(numberLoginFail + 1)
            break
        }
      })
  }
  const handleSubmitOtp = (otp) => {
    let payload = {
      ExtendData: extendData,
      OTP: otp,
      UserName: currPayload.UserName,
      Password: currPayload.Password,
      ClientId: APP_CLIENT_ID,
    }
    authenticationStore.activeDevice(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.SUCCESS:
            setCurrPayload({})
            setExtendData('')
            history.push((location?.state?.from && location?.state?.from !== PAGES.LOGIN.PATH) ? location?.state?.from : PAGES.HOME.PATH)
            break
          case -53:
            setNumberLoginFail(numberLoginFail + 1)
            setVisibleOtp(false)
            setCurrPayload({})
            setExtendData('')
            formLogin.resetFields()
            break
          case -10105:
          case -1:
          case -10015:
            setNumberLoginFail(numberLoginFail + 1)
            setVisibleOtp(false)
            setCurrPayload({})
            setExtendData('')
            formLogin.resetFields()
            break
          default:
            setNumberLoginFail(numberLoginFail + 1)
            break
        }
      })
  }
  const handleCancelOtp = () => {
    setVisibleOtp(false)
    setCurrPayload({})
    setExtendData('')
  }
  const onChange = (value) => {
    setCapChaValue(value)
  }
  // endregion
  // region function render

  // endregion
  // region side effect
  useEffect(() => {
    return () => {
      setNumberLoginFail(0)
      setCapChaValue(null)
      setVisibleOtp(false)
      setCurrPayload({})
      setExtendData('')
    }
  }, [])
  // endregion

  return (
    <>
      <LoginPageWrapper>
        <LoginTitle color={commonStore.appTheme.solidColor}>CMS MobiFone Money</LoginTitle>
        <LoginDescription>Đăng nhập hệ thống quản lý MobiFone Money</LoginDescription>
        <FormLoginWrapper>
          <Form form={formLogin}
                onFinish={onFinish}
                size={'large'}
                colon={false}
                labelAlign={'left'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
            <Form.Item
              label={'Tên đăng nhập'}
              name={'userName'}
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input maxLength={30} showCount prefix={<UserOutlined />} placeholder={'Tên đăng nhập'} />
            </Form.Item>
            <Form.Item
              label={'Mật khẩu'}
              name={'password'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={'Mật khẩu'} />
            </Form.Item>
            <ConditionDisplay visible={numberLoginFail >= 2}>
              <RowCenterDiv margin={'0 0 16px 0'}>
                <ReCAPTCHA
                  sitekey={recapchaSitekey}
                  onChange={onChange}
                />
              </RowCenterDiv>
            </ConditionDisplay>

            <Row gutter={[16, 16]} justify='center'>
              <Col span={12}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  <ColorLink
                    color={commonStore.appTheme.solidColor}
                    to={PAGES.FORGOT_PASSWORD.PATH}>
                    Quên mật khẩu ?
                  </ColorLink>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button block type={'primary'} htmlType={'submit'}>Đăng nhập</Button>
              </Col>
            </Row>
          </Form>
        </FormLoginWrapper>
        <OtpModal
          phoneNumber={''}
          description={currPayload.Description}
          visible={visibleOtp}
          onCancel={handleCancelOtp}
          callbackOtp={handleSubmitOtp} />
      </LoginPageWrapper>
    </>
  )
}

LoginPage.propTypes = {}

export default inject('commonStore', 'authenticationStore')(observer(LoginPage))