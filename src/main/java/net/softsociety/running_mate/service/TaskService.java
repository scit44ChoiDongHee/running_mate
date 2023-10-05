package net.softsociety.running_mate.service;

import java.util.List;
import java.util.Map;

import net.softsociety.running_mate.dto.ActualTaskDTO;
import net.softsociety.running_mate.dto.TaskDTO;

public interface TaskService {
	// 오늘 날짜로 일정 추가
	void addTask(TaskDTO taskData);
	// 오늘 날짜로 일정 조회
	List<Map<String, Object>> getTasksByStartDate(String userID);
	//실제 과업 저장
	void addActualTask(ActualTaskDTO actualTaskDTO);
}
