package net.softsociety.running_mate.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
	private int task_number;
    private String task_title;
    private Date task_startDate;
    private Date task_endDate;
    private String user_id;
    private int bigGoal_number;
    private int smallGoal_number;
}
