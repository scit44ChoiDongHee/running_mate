import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input } from '@/components/ui';
import TimeInput from '@/components/ui/TimeInput';
import styles from './InsertDailyGoalModalForCalendar.module.css';
import Select from '@/components/ui/Select';

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

export default function InsertDailyGoalModal(props) {
    const todayDate = new Date();
    const dateString = todayDate.toJSON();
    const dateStringSub = dateString.substring(0, dateString.indexOf("T"));

    // state 및 변수 초기화
    const [smallGoals, setSmallGoals] = useState(props.smallGoals || []);
    const [smallGoalsOptions, setSmallGoalsOptions] = useState([]);

    // 선택창의 선택지를 저장
    useEffect(() => {
        const options = smallGoals.map((goal) => ({
            value: goal.smallGoal_number,
            label: goal.smallGoal_name,
            key: goal.bigGoal_number,
        }));

        setSmallGoalsOptions(options);
    }, [smallGoals]);

    // 모달의 열고 닫는 걸 기억
    const [isOpen, setIsOpen] = useState(props.isOpen || false);

    // 모달 닫힘
    const closeModal = () => {
        props.onDailyClose();
        setIsOpen(false);
    };

    // 폼의 데이터를 저장
    const [formData, setFormData] = useState({
        task_title: "",
        task_startDate: `${dateStringSub}`,
        task_endDate: `${dateStringSub}`,
        user_id: 'user1',
        bigGoal_number: "",
        smallGoal_number: "",
    });

    // 폼데이터 값 확인
    useEffect(() => {
        console.log("formData 값 확인", formData);
    }, [formData]);

    // 값 입력 될 때 폼 데이터로 저장
    const handleChangetime = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDatePickerChange = (newDate) => {
        // 새 값을 설정한 뒤에 콜백 함수로 상태 업데이트를 진행합니다.
        setFormData((prevData) => ({
            ...prevData,
            task_startDate: newDate, // bigGoal_startDate로 업데이트
        }));
    };

    const handleDatePickerChangeend = (newDate) => {
        // 새 값을 설정한 뒤에 콜백 함수로 상태 업데이트를 진행합니다.
        setFormData((prevData) => ({
            ...prevData,
            task_endDate: newDate, // bigGoal_startDate로 업데이트
        }));
    };

    // 값 입력 저장
    const handleChange = (selectedOption) => {
        setFormData({ ...formData, smallGoal_number: selectedOption.value, bigGoal_number: selectedOption.key });
    };

    // 전송 버튼 누를 때 axios 실행
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Axios를 사용하여 데이터를 전송
            const response = await axios.post('/api/user/task/addTask', formData);
            props.onSave(formData);
        } catch (error) {
            console.error('오류 발생:', error);
        }
        props.onDailyClose();
        closeModal(); // 모달 닫기
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalWrap}>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="모달 창"
                    style={modalStyle}
                >
                    <div className={styles.titleDiv}>
                        <h2 className={styles.title}>일과 피드백을 입력하세요</h2>
                    </div>

                    {/* 모달 내용 */}
                    <form className={styles.formDiv} onSubmit={handleSubmit}>

                        {/* "일과 목표 이름" 입력 필드 */}
                        <div>
                            <label htmlFor="task">소목표 선택 :</label>
                            <Select
                                placeholder="소목표를 선택하세요"
                                options={smallGoalsOptions}
                                id='task'
                                name='smallGoal_number'
                                value={
                                    smallGoalsOptions.find(option => option.value === formData.smallGoal_number)
                                }
                                onChange={(selectedOption) => handleChange(selectedOption)}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="name">일과 목표 이름:</label>
                            <Input
                                type="text"
                                id="name"
                                name="task_title"
                                value={formData.task_title}
                                onChange={handleChangetime}

                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="startDate">시작 시간:</label>
                            <TimeInput placeholder="시작 시간를 고르세요"
                                id='startDate'
                                name='task_startDate'
                                clearable={'true'}
                                value={formData.task_startDate}
                                onChange={handleDatePickerChange}

                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor='endDate'>종료 시간:</label>
                            <TimeInput placeholder="종료 시간를 고르세요"
                                id='endDate'
                                name='task_endDate'
                                clearable={'true'}
                                value={formData.task_endDate}
                                onChange={handleDatePickerChangeend}

                            />
                        </div>

                        <div className={styles.buttonBox}>
                            <Button variant='solid' type='submit' className={styles.button}>
                                전송 </Button>

                            <Button variant='solid' onClick={closeModal} className={styles.button}>
                                닫기 </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
