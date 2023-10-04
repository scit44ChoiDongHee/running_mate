import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input } from '@/components/ui';
import TimeInput from '@/components/ui/TimeInput'
import styles from './InsertDailyGoalModalForCalendar.module.css'
import Select from '@/components/ui/Select'

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

export default function InsertDailyGoalModalForCalendar(props) {
    const todayDate = new Date();
    const dateString = todayDate.toJSON();
    const dateStringSub = dateString.substring(0, dateString.indexOf("T"));

    const userID = "user1";

    const [taskVO, setTaskVO] = useState([]);
    const [colourOptions, setColourOptions] = useState([]);

    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchTasks() {

            try {
                const response = await axios.get(`/api/user/task/getTasks?userID=${userID}`, {
                    cancelToken: source.token
                });

                setTaskVO(response.data);
                console.log("일과 과업 넘어온 데이터", response.data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('일과 오류 발생:', error);
                }
            }
        }

        fetchTasks();

        return () => {
            source.cancel('Request canceled');
        };

    }, []);

    useEffect(() => {
        const options = taskVO.map((task) => ({
            value: task.TASK_TITLE,
            label: task.TASK_TITLE
        }));

        setColourOptions(options);
        console.log(options);
    }, [taskVO]);
    console.log(colourOptions);

    // 모달의 열고 닫는 걸 기억
    const [isOpen, setIsOpen] = useState(props.isOpen || false);

    // 폼의 데이터를 저장
    const [formData, setFormData] = useState({
        task_title: "",
        task_startDate: `${dateStringSub}`,
        task_endDate: `${dateStringSub}`,
        user_id: 'user1',
        bigGoal_number: "",
        smallGoal_number: ""
    });

    // 모달 닫힘
    const closeModal = () => {
        props.onDailyClose();
        setIsOpen(false);
    }

    // 값 입력 될 때 폼 데이터로 저장
    const handleChangetime = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleChange = (selectedOption) => {
        setFormData({ ...formData, task_title: selectedOption.value });
      };

    // 전송 버튼 누를 때 axios 실행
    async function handleSubmit(e) {
        try {
            console.log("폼 데이터", formData);
            await axios.post('/api/user/task/addTask', formData);

            props.onClose();
            closeModal();

        } catch (error) {
            console.error('오류 발생:', error);
        }
    }

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
                            <label htmlFor="task">일과 선택 :</label>
                            <Select
                                
                                options={colourOptions}
                                id='task'
                                name='task_title'
                                value={colourOptions.find(option => option.value === formData.task_title)}
                                onChange={(selectedOption) => handleChange(selectedOption)}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="startDate">시작 시간:</label>
                            <TimeInput placeholder="시작 시간를 고르세요"
                                id='startDate'
                                name='task_startDate'
                                clearable={'true'}
                                value={formData.task_startDate}
                                onChange={handleChangetime}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor='endDate'>종료 시간:</label>
                            <TimeInput placeholder="종료 시간를 고르세요"
                                id='endDate'
                                name='task_endDate'
                                clearable={'true'}
                                value={formData.task_endDate}
                                onChange={handleChangetime}
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
        </div>);
}


