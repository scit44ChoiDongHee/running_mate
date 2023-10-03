import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input, } from '@/components/ui';
import styles from './InsertDailyGoalPlanModal.module.css'
import TimeInput from '@/components/ui/TimeInput'

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

Modal.setAppElement('#root'); // 모달을 루트 엘리먼트에 연결 스크린 리더가 읽기 편하게 뒷 화면을 잠그는 기능

export default function InsertDailyGoalPlanModal(props) {
    const todayDate = new Date();
    const dateString = todayDate.toJSON();
    const dateStringSub = dateString.substring(0, dateString.indexOf("T"));
   
    {/* 모달의 열고 닫는 걸 기억 */ }
    const [isOpen, setIsOpen] = useState(props.DailyisOpen);

    {/* 폼의 데이터를 저장 */ }
    const [formData, setFormData] = useState({
        task_title: '',
        task_startDate: `${dateStringSub}`,
        task_endDate: `${dateStringSub}`,
        user_id: 'user1',
        bigGoal_number: props.BigGoalId,
        smallGoal_number: props.SmallGoalId
    }
    );

    {/* 모달 닫힘 */ }
    const closeModal = () => {
        props.onClose();
        setIsOpen(false);
    };

    {/* 값 입력 될 때 폼 데이터로 저장 */ }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    {/* 값 입력 될 때 폼 데이터로 저장 */ }
    const handleDatePickerChange = (newDate) => {
        // 새 값을 설정한 뒤에 콜백 함수로 상태 업데이트를 진행합니다.
        setFormData((prevData) => ({
            ...prevData,
            task_startDate: newDate, // bigGoal_startDate로 업데이트
        }));
    };

    {/* 값 입력 될 때 폼 데이터로 저장 */ }
    const handleEndDatePickerChange = (newDate) => {
        setFormData((prevData) => ({
            ...prevData,
            task_endDate: newDate, // bigGoal_endDate로 업데이트
        }));
    }

    // 전송 버튼 누를 때 axios 실행
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Axios를 사용하여 데이터를 전송
            console.log("폼 데이터",formData);
            const response = await axios.post('/api/user/task/addTask', formData);
        } catch (error) {
            console.error('오류 발생:', error);
        }
        props.onClose();
        closeModal(); // 모달 닫기
    };

    return (
        <div className={styles.modalContainer}>

            <div className={styles.modalWrap}>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="모달 창"
                    style={modalStyle} // 정의한 스타일을 적용합니다.
                >
                    <div className={styles.titleDiv}>
                        <h2 className={styles.title}>일과 목표를 입력하세요</h2>
                    </div>

                    <form className={styles.formDiv} onSubmit={handleSubmit}>

                        <div className={styles.input}>
                            <label htmlFor="name">일과 목표 이름:</label>
                            <Input
                                type="text"
                                id="name"
                                name="task_title"
                                value={formData.task_title}
                                autoComplete="given-name"
                                onChange={handleChange}

                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="name">시작 시간:</label>
                            <TimeInput placeholder="시작 시간를 고르세요"
                                id="name"
                                name="bigGoal_startDate"
                                clearable='true'
                                value={formData.bigGoal_startDate}
                                onChange={handleDatePickerChange}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="name">종료 시간:</label>
                            <TimeInput
                                placeholder="종료 시간를 고르세요"
                                id="name"
                                name="task_endDate"
                                clearable={true}
                                value={formData.task_endDate}
                                onChange={handleEndDatePickerChange} // 종료 날짜 선택 이벤트 핸들러 추가
                            />
                        </div>

                        <div className={styles.buttonBox}>
                            <Button
                                variant="solid"
                                type="submit"
                                className={styles.button}
                            >
                                전송
                            </Button>

                            <Button
                                variant="solid"
                                onClick={closeModal}
                                className={styles.button}
                            >
                                닫기
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
