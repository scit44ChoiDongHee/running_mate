package net.softsociety.running_mate.service;

import java.util.List;
import java.util.Map;

public interface TaskService {
	// 오늘 날짜로 일정 추가
	void addTask(Map<String, Object> taskData);
	// 오늘 날짜로 일정 조회
	List<Map<String, Object>> getTasksByStartDate();
}
