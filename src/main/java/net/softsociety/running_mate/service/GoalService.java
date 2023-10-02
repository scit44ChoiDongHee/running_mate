package net.softsociety.running_mate.service;

import java.util.ArrayList;

import net.softsociety.running_mate.dto.BigGoalCount;
import net.softsociety.running_mate.dto.GoalDTO;
import net.softsociety.running_mate.dto.SmallGoalCount;
import net.softsociety.running_mate.dto.SmallGoalDTO;
import net.softsociety.running_mate.vo.Goal;
import net.softsociety.running_mate.vo.SmallGoal; 



public interface GoalService {
	//대목표 저장
	int bigGoalInsert(GoalDTO goalDTO);
	// 대목표 불러오기
	ArrayList<Goal> getBigGoalList(String userId);
	// 대목표 갯수 불러오기
	BigGoalCount getBigGoalCount(String userId);
	// 소목표 불러오기
	ArrayList<SmallGoal> getSmallGoalList(SmallGoalDTO SmallGoalDTO);
	// 소목표 저장
	int smallGoalInsert(SmallGoal smallGoal);
	// 소목표 갯수 불러오기
	SmallGoalCount getSmallGoalCount(int number);
	// 대목표 D day 불러오기
	int GetDday(int bigGoal_number);
	//소목표 D day 불러오기
	int GetSmallDday(int smallGoal_number);
	//소목표 삭제하기
	void deleteSmallGoal(Long smallGoalId);
	// 대목표 삭제하기
	void deleteBigGoal(Long bigGoalId);
	// 대목표 수정
	void UpDateBigGoal(GoalDTO goalDTO);
	// 소목표 수정
	void UpDateSmallGoal(SmallGoal smallGoal);

}
