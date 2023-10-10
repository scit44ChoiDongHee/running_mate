package net.softsociety.running_mate.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.dao.TaskDAO;
import net.softsociety.running_mate.dto.ActualTaskDTO;
import net.softsociety.running_mate.dto.TaskDTO;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {
	@Autowired
    private TaskDAO taskDAO;

	// 오늘 날짜로 일정 추가
	@Override
    public void addTask(TaskDTO taskData) {
		log.debug("서비스 taskData {}",taskData);
        taskDAO.addTask(taskData);
    }
	// 오늘 날짜로 일정 조회
	@Override
    public List<Map<String, Object>> getTasksByStartDate(String userID) {
        return taskDAO.getTasksByStartDate(userID);
    }
	
	//실제 과업 저장
	@Override
	public void addActualTask(ActualTaskDTO actualTaskDTO) {
		taskDAO.addActualTask(actualTaskDTO);
		
	}
	// 일정 달력 불러오기
	@Override
	public List<Map<String, Object>> getTasksByStartDateFormonth(String userID) {
		return taskDAO.getTasksByStartDateFormonth(userID);
	}
	
	
	
}
