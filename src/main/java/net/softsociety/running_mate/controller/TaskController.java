package net.softsociety.running_mate.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.dto.TaskDTO;
import net.softsociety.running_mate.service.TaskService;

@Slf4j
@RestController
@RequestMapping("/api/user/task")
public class TaskController {
	@Autowired
    private TaskService taskService;

	// 오늘 날짜로 일정 추가
    @PostMapping("/addTask")
    public void addTask(@RequestBody TaskDTO taskData) {
    	log.debug("에드 테스크 {}", taskData);
        taskService.addTask(taskData);
    }
    // 오늘 날짜로 일정 조회
    @GetMapping("/getTasks")
    public List<Map<String, Object>> getTasksByStartDate() {
        return taskService.getTasksByStartDate();
    }
}
