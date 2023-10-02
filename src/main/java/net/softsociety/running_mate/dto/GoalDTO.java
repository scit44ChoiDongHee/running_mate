package net.softsociety.running_mate.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalDTO {
	
	private String bigGoal_name;
    private Date bigGoal_startDate;
    private Date bigGoal_endDate;
    private String user_id;
    int bigGoal_number;
    

}
