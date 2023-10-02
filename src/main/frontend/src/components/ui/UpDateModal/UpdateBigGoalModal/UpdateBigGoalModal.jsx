import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input } from '@/components/ui';
import DatePicker from '@/components/ui/DatePicker';
import styles from './UpdateBigGoalModal.module.css'


const modalStyle = {
  overlay: {
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '400px',
    height: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    padding: '10px',
    border: 'none',
  },
};

Modal.setAppElement('#root');

export default function BigGoalModal(props) {
  // 모달의 열고 닫는 상태를 관리
  const [isOpen, setIsOpen] = useState(props.isOpen || false);


  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    bigGoal_name: null,
    bigGoal_startDate: '',
    bigGoal_endDate: '',
    user_id: '신짱구',
    bigGoal_number: props.BigGoalId
  });

  // 값 입력될 때 폼 데이터로 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 시작 날짜 선택 이벤트 핸들러
  const handleDatePickerChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      bigGoal_startDate: newDate,
    }));
  };

  // 종료 날짜 선택 이벤트 핸들러
  const handleEndDatePickerChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      bigGoal_endDate: newDate,
    }));
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
    props.closeModal();
  };

  // 전송 버튼 클릭 시 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios를 사용하여 데이터를 전송
      await axios.post('/api/BigGoal/Update', formData);

      // 목표 저장 후 onSave 콜백 호출
      if (props.props.onSave) {
        props.props.onSave(formData);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
    props.closeModal(); // 부모 값 변경
    closeModal(); // 모달 닫기
  };

  return (
    <div className={styles.modalWrap}>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="모달 창"
        style={modalStyle}
      >

        <div className={styles.titleDiv}>
          <h2 className={styles.title}>수정 값을 입력하세요</h2>
        </div>
        <form className={styles.formDiv} onSubmit={handleSubmit}>

          <div className={styles.input}>
            <label htmlFor="bigGoal_name">대목표 이름:</label>
            <Input
              type="text"
              id="bigGoal_name"
              name="bigGoal_name"
              value={formData.bigGoal_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="bigGoal_startDate">시작 날짜:</label>
            <DatePicker
              id="bigGoal_startDate"
              name="bigGoal_startDate"
              value={formData.bigGoal_startDate}
              onChange={handleDatePickerChange}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="bigGoal_endDate">종료 날짜:</label>
            <DatePicker
              id="bigGoal_endDate"
              name="bigGoal_endDate"
              value={formData.bigGoal_endDate}
              onChange={handleEndDatePickerChange}
            />
          </div>
          <div className={styles.buttonBox}>
            <Button type="submit" variant="solid">
              전송
            </Button>

            <Button variant="solid" onClick={closeModal}>
              닫기
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
