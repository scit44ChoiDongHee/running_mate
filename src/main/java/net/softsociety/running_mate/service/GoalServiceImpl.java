package net.softsociety.running_mate.service;

import java.util.ArrayList;    

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.dao.GoalDAO;
import net.softsociety.running_mate.dto.BigGoalCount;
import net.softsociety.running_mate.dto.GoalDTO;
import net.softsociety.running_mate.dto.SmallGoalCount;
import net.softsociety.running_mate.dto.SmallGoalDTO;
import net.softsociety.running_mate.vo.Goal;
import net.softsociety.running_mate.vo.SmallGoal;

@Slf4j
@Service
public class GoalServiceImpl implements GoalService {

	@Autowired
	GoalDAO dao;

	
	// 대목표 저장
	@Override
	public int bigGoalInsert(GoalDTO goalDTO) 
	{
		log.debug("임플 쪽 값 확인 {}", goalDTO);
		int i = dao.bigGoalInsert(goalDTO);
		log.debug("임플 쪽 값 돌아가는 거  확인");
		return i;
	}
	
	//대목표 불러오기
	@Override
	public ArrayList<Goal> getBigGoalList(String userId) {
		ArrayList<Goal> list = new ArrayList<>();	
		
		list = dao.getBigGoalList(userId);
		
		return list;
	}

	// 대목표 갯수 불러오기
	@Override
	public BigGoalCount getBigGoalCount(String userId) {
		BigGoalCount BigGoalCount = new BigGoalCount();
		BigGoalCount = dao.getBigGoalCount(userId);
		return BigGoalCount;
	}
	// 소목표 불러오기

	@Override
	public ArrayList<SmallGoal> getSmallGoalList(SmallGoalDTO SmallGoalDTO) {
		ArrayList<SmallGoal> list = new ArrayList<>();
		list = dao.getSmallGoalList(SmallGoalDTO);
		
		return list;
	}
	
	//소목표 저장
	@Override
	public int smallGoalInsert(SmallGoal smallGoal) {
		
		int i = dao.smallGoalInsert(smallGoal);
		return i;
	}

	//소목표 갯수 불러오기
	@Override
	public SmallGoalCount getSmallGoalCount(int number) {
		SmallGoalCount count = new SmallGoalCount();
		
		count = dao.getSmallGoalCount(number);
		
		return count;
	}
	// 대목표 dday 불러오기
	@Override
	public int GetDday(int bigGoal_number) {
		
		int day = dao.GetDday(bigGoal_number);
		return day;
	}
	// 소목표 dday 불러오기
	@Override
	public int GetSmallDday(int smallGoal_number) {
		int day = dao.GetSmallDday(smallGoal_number);
		return day;
	}

	//소목표 삭제하기
	@Override
	public void deleteSmallGoal(Long smallGoalId) {
		dao.deleteSmallGoal(smallGoalId);
	}
	
	// 대목표 삭제하기
	@Override
	public void deleteBigGoal(Long bigGoalId) {
		dao.deleteBigGoal(bigGoalId);
	}
	// 대목표 수정
	@Override
	public void UpDateBigGoal(GoalDTO goalDTO) {
		dao.UpDateBigGoal(goalDTO);
	}

	//소목표 수정
	@Override
	public void UpDateSmallGoal(SmallGoal smallGoal) {
		log.debug("서비스 소목표 수정 확인");
		dao.UpDateSmallGoal(smallGoal);
	}

	
	
	
	
	
	
	
	
	
}
