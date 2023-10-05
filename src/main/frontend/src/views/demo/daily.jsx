import React, { useState, useEffect } from 'react'
import TimeGridView from '../../components/ui/FullCalenderView/TimeGridView'
import styles from './daily.module.css'
import axios from 'axios';
import TimeGridViewEnd from '../../components/ui/FullCalenderView/TimeGridViewEnd';

export default function daily() {

  const [BigGoals, setBigGoals] = useState([]);
  const [smallGoals, setSmallGoals] = useState([]);
  const userId = 'user1'

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`/api/BigGoals?userId=${userId}`);
        setBigGoals(response.data);

        //소목표 불러오기
        const smallGoalsPromises = response.data.map((goal) =>
          axios.get(`/api/user/smallGoals?bigGoal_number=${goal.bigGoal_number}`)
        );

        const smallGoalsResponses = await Promise.all(smallGoalsPromises);

        // 각 응답에서 data만 추출하여 하나의 배열로 합칩니다.
        const allSmallGoals = smallGoalsResponses.flatMap(response => response.data);

        setSmallGoals(allSmallGoals);

      } catch (error) {
        console.error('일과 쪽 대목표 오류 발생:', error);
      }
    }

    fetchGoals();
  }, []);



  return (

    <div className={styles.container}>
      <div className={styles.containerWrap}>
        <TimeGridView BigGoals={BigGoals} smallGoals={smallGoals} />
      </div>
      <div className={styles.containerWrap}>
        <TimeGridViewEnd BigGoals={BigGoals} smallGoals={smallGoals}/>
      </div>
    </div>

  )
}
