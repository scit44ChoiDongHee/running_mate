package net.softsociety.running_mate.vo;

import java.util.Date; 

import lombok.AllArgsConstructor; 
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goal 
{
	    private String bigGoal_name;
	    private Date bigGoal_startDate;
	    private Date bigGoal_endDate;
	    private String user_id;
	    private String bigGoal_state;
	    private int bigGoal_number;
}
