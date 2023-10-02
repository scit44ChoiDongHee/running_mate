package net.softsociety.running_mate.vo;

import java.util.Date; 

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SmallGoal {

	private Long smallGoal_number;
	private String smallGoal_name;
	private Date smallGoal_startDate;
	private Date smallGoal_endDate;
	private Integer smallGoal_priority;
	private Date smallGoal_loop;
	private String smallGoal_check;
	private String smallGoal_checkFigure;
	private Integer smallGoal_progress;
	private String smallGoal_memo;
	private Integer smallGoal_totalTime;
	private Long bigGoal_number;
	
}
