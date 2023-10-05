package net.softsociety.running_mate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActualTaskDTO {
    private String actualTask_title;
    private String actualTask_startDate; // LocalDate 타입으로 수정
    private String actualTask_endDate;   // LocalDate 타입으로 수정
    private String user_id;
    private int bigGoal_number;
    private int smallGoal_number;
    private int TASK_NUMBER; // 이 필드를 추가


}
