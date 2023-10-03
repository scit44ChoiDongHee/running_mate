package net.softsociety.running_mate.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TaskDAO {
	List<Map<String, Object>> getTasksByStartDate();
}
