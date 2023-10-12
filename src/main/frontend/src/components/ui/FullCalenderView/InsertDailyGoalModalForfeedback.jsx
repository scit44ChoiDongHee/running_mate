import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input } from '@/components/ui';
import TimeInput from '@/components/ui/TimeInput'
import Select from '@/components/ui/Select'
import styles from './feedback.module.css';
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'

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

export default function InsertDailyGoalModalForfeedback(props) {
    const todayDate = new Date();
    const dateString = todayDate.toJSON();
    const dateStringSub = dateString.substring(0, dateString.indexOf("T"));
    console.log("InsertDailyGoalModalForfeedback의 프롭스 값",props);
    const userID = "user1";

    const [taskVO, setTaskVO] = useState([]);
    const [colourOptions, setColourOptions] = useState([]);

    //존재하는 일과 과업을 불러옴
    useEffect(() => {
        const source = axios.CancelToken.source();
        async function fetchTasks() {
            try {
                const response = await axios.get(`/api/user/task/getTasks?userID=${userID}`, {
                    cancelToken: source.token
                });
                setTaskVO(response.data);
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

    //선택창의 선택지를 저장
    useEffect(() => {
        const options = taskVO.map((task) => ({
            value: task.TASK_TITLE,
            label: task.TASK_TITLE,
            BIGGOAL_NUMBER: task.BIGGOAL_NUMBER,
            SMALLGOAL_NUMBER: task.SMALLGOAL_NUMBER,
            TASK_NUMBER: task.TASK_NUMBER 

        }));

        setColourOptions(options);
        console.log("taskVO 값 확인",taskVO)
    }, [taskVO]);
    

    // 모달의 열고 닫는 걸 기억
    const [isOpen, setIsOpen] = useState(props.isOpen || false);

    // 모달 닫힘
    const closeModal = () => {
        props.onDailyClose();
        setIsOpen(false);
    }

    // 폼의 데이터를 저장
    const [formData, setFormData] = useState({
        actualTask_title: "",
        actualTask_startDate: `${dateStringSub}`,
        actualTask_endDate: `${dateStringSub}`,
        user_id: 'user1',
        bigGoal_number: "",
        smallGoal_number: "",
        task_number: 1
    });
    

    // 폼데이터 값 확인
    useEffect(() => {
        console.log("formData 값 확인", formData);
    }, [formData]);


    const handleDatePickerChange = (newDate) => {
        // 새 값을 설정한 뒤에 콜백 함수로 상태 업데이트를 진행합니다.
        setFormData((prevData) => ({
            ...prevData,
            actualTask_startDate: newDate, // bigGoal_startDate로 업데이트
        }));
    };

    const handleDatePickerChangeend = (newDate) => {
        // 새 값을 설정한 뒤에 콜백 함수로 상태 업데이트를 진행합니다.
        setFormData((prevData) => ({
            ...prevData,
            actualTask_endDate: newDate, // bigGoal_startDate로 업데이트
        }));
    };

    // 값 입력 저장
    const handleChange = (selectedOption) => {
        setFormData((prevData) => ({ 
            ...prevData,
    actualTask_title: selectedOption.value, bigGoal_number: selectedOption.BIGGOAL_NUMBER, smallGoal_number: selectedOption.SMALLGOAL_NUMBER, task_number: selectedOption.TASK_NUMBER}));
      };

    // 전송 버튼 누를 때 axios 실행
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            // Axios를 사용하여 데이터를 전송
            const response = await axios.post('/api/user/task/addActualTask', {...formData});
            console.log(response);
            // props.onSave(formData);
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
                        <div className={styles.select}>
                            <label htmlFor="task">일과 선택 :</label>
                            <Select
                                
                                options={colourOptions}
                                id='task'
                                name='actualTask_title'
                                value={colourOptions.find(option => option.value === formData.actualTask_title)}
                                onChange={(selectedOption) => {
                                    console.log("selectedOption  fasdfasdfasdfasfsadfsaf: ",selectedOption);
                                    handleChange(selectedOption)
                                }}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="startDate">시작 시간:</label>
                            <TimeInput placeholder="시작 시간를 고르세요"
                                id='startDate'
                                name='actualTask_startDate'
                                clearable={'true'}
                                value={formData.actualTask_startDate}
                                onChange={handleDatePickerChange}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor='endDate'>종료 시간:</label>
                            <TimeInput placeholder="종료 시간를 고르세요"
                                id='endDate'
                                name='actualTask_endDate'
                                clearable={'true'}
                                value={formData.actualTask_endDate}
                                onChange={handleDatePickerChangeend}
                            />
                        </div>

                        <div className={styles.Checkboxcontainer}>
                            <Radio name="simpleRadioExample" className={styles.Checkbox1}>완수</Radio>
                            <Radio name="simpleRadioExample" className={styles.Checkbox2}>미완수</Radio>
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


