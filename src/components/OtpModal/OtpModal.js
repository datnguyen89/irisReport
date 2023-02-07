import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import PropTypes from 'prop-types'
import { ExpiredLabel, OtpDescription, OtpModalWrapper, ResendOtp, TimeLeft, WaitingResendOtp } from './OtpModalStyled'
import { Button, Col, message, Modal, notification, Row } from 'antd'
import { ColorText } from '../CommonStyled/CommonStyled'
import { ERROR_COLOR, ERROR_TITLE } from '../../utils/constant'

const _ = require('lodash')

const OtpModal = props => {
  // region props, hook, state
  const { visible, onCancel, callbackOtp, phoneNumber, description, otpLength } = props
  const [timeLeft, setTimeLeft] = useState(180)
  const [timeResend, setTimeResend] = useState(0)
  const [otp, setOtp] = useState('')
  // endregion
  // region destructuring

  // endregion
  // region variable
  const containerStyle = {
    width: '100%',
    justifyContent: 'center',
    margin: '16px 0',
  }
  const inputStyle = {
    width: '45px',
    height: '45px',
    margin: '0 8px',
    outline: 'none',
    border: '1px solid #ccc',
    borderRadius: '8px',
  }
  const focusStyle = {
    border: '1px solid #0261AD',
  }
  // endregion
  // region function handle logic
  const handleOk = () => {
    let checkOtpLength = otpLength || 6
    if (!otp) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: 'Vui lòng nhập mã OTP',
      })
      return
    }
    if (otp.length < checkOtpLength) {
      notification.error({
        message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
        description: `Vui lòng nhập đủ ${checkOtpLength} ký tự OTP`,
      })
      return
    }
    callbackOtp(otp)
  }
  const handleInputOtp = (value) => {
    const reg = /^-?\d+\.?\d*$/
    if (reg.test(value)) {
      setOtp(value)
    } else {
      setOtp('')
    }
  }
  const handleCancel = () => {
    onCancel()
  }
  const handleClickResend = () => {
    setTimeResend(60)
    setTimeLeft(180)
  }
  // endregion
  // region function render

  // endregion
  // region side effect
  useEffect(() => {
    if (!timeLeft) return
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft])

  useEffect(() => {
    if (!timeResend) return
    const intervalId = setInterval(() => {
      setTimeResend(timeResend - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeResend])

  useEffect(() => {
    setTimeLeft(180)
    setTimeResend(0)
    setOtp('')
  }, [visible])
  // endregion

  return (
    <OtpModalWrapper
      title='Nhập mã xác thực'
      maskClosable={false}
      open={visible}
      footer={null}
      onCancel={handleCancel}>
      <Row justify={'center'}>
        <Col span={24}>
          <OtpDescription>
            {/*Mã xác thực đã được gửi qua SĐT {_.fill(phoneNumber?.split(''), '*', 3, phoneNumber?.length - 3)}.*/}
            {description || 'Vui lòng nhập mã xác thực OTP'}
            <br />
            Nếu không nhận được OTP vui lòng ấn {timeResend === 0 ?
            <ResendOtp onClick={handleClickResend}>Gửi lại</ResendOtp> :
            <WaitingResendOtp>(Gửi lại sau {timeResend} giây)</WaitingResendOtp>}
          </OtpDescription>
        </Col>
        <Col span={24}>
          <OtpInput
            shouldAutoFocus={true}
            isInputNum={true}
            value={otp}
            numInputs={otpLength || 6}
            onChange={handleInputOtp}
            containerStyle={containerStyle}
            inputStyle={inputStyle}
            focusStyle={focusStyle}
            separator={''} />
        </Col>
        <Col span={24}>
          <ExpiredLabel>
            Mã OTP sẽ hết hạn sau <TimeLeft>{timeLeft}</TimeLeft> giây
          </ExpiredLabel>
        </Col>
        <Col span={8}>
          <Button block type={'primary'} onClick={handleOk}>Xác nhận</Button>
        </Col>
      </Row>
    </OtpModalWrapper>
  )
}

OtpModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  callbackOtp: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  otpLength: PropTypes.number,
  description: PropTypes.string,
}

export default OtpModal