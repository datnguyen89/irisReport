import React from 'react'
import PropTypes from 'prop-types'
import { Card, Descriptions, Modal } from 'antd'
import IMAGES from '../../images'
import { CalendarOutlined, IdcardOutlined, MobileOutlined } from '@ant-design/icons'
import { UserDetailInfoItem, UserDetailInfoWrapper } from './DetailUserReportGameModalStyled'
import { SUCCESS_COLOR } from '../../utils/constant'

const DetailUserReportGameModal = props => {
  // region props, hook, state =================
  const {
    open,
    onClose,
    userDetailData,
  } = props
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleCancel = () => {
    onClose()
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <Modal
      closable={false}
      open={open}
      title={'Thông tin người trúng thưởng'}
      footer={null}
      wrapClassName={'userDetailModalWrap'}
      onCancel={handleCancel}
    >
      <Descriptions
        bordered
        column={1}
        labelStyle={{ width: '35%' }}
        contentStyle={{ width: '65%' }}
        size={'small'}>
        <Descriptions.Item label={'Họ tên'}>
          <strong>
            {userDetailData?.fullname}
          </strong>
        </Descriptions.Item>
        <Descriptions.Item label={'Giấy tờ tùy thân'}>
          {userDetailData?.passport}
        </Descriptions.Item>
        <Descriptions.Item label={'Số điện thoại'}>
          {userDetailData?.mobile || userDetailData?.phone}
        </Descriptions.Item>
        <Descriptions.Item label={'Ngày sinh'}>
          {userDetailData?.birthDay}
        </Descriptions.Item>
      </Descriptions>

    </Modal>
  )
}

DetailUserReportGameModal.propTypes = {
  userDetailData: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default DetailUserReportGameModal