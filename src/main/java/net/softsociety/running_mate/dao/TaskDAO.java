package net.softsociety.running_mate.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import net.softsociety.running_mate.dto.TaskDTO;

@Mapper
public interface TaskDAO {
	// 오늘 날짜로 일정 추가
	void addTask(TaskDTO taskData);
	// 오늘 날짜를 기준으로 일정 조회
	List<Map<String, Object>> getTasksByStartDate(String userID);
}
