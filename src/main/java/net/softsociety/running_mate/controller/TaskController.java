package net.softsociety.running_mate.controller;

import java.util.List;
import java.util.Map;
import java.time.LocalDate; // LocalDate를 import 추가
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

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
 // 오늘 날짜로 일정 추가
    @PostMapping("/addTask")
    public void addTask(@RequestBody TaskDTO taskData) {
        log.debug("컨트롤러  {}", taskData);
        // 넘어온 날짜 문자열
        String taskStartDateStr = taskData.getTask_startDate();
        String taskEndDateStr = taskData.getTask_endDate();
        
        // ISO 8601 형식의 문자열을 LocalDateTime으로 변환
        ZonedDateTime taskStartDate = ZonedDateTime.parse(taskStartDateStr, DateTimeFormatter.ISO_DATE_TIME);
        ZonedDateTime taskEndDate = ZonedDateTime.parse(taskEndDateStr, DateTimeFormatter.ISO_DATE_TIME);

        // 한국 표준시로 변환
        ZoneId koreaZoneId = ZoneId.of("Asia/Seoul");
        ZonedDateTime taskStartDateKST = taskStartDate.withZoneSameInstant(koreaZoneId);
        ZonedDateTime taskEndDateKST = taskEndDate.withZoneSameInstant(koreaZoneId);

        // LocalDateTime을 필요한 형식의 문자열로 변환
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTaskStartDate = taskStartDateKST.format(outputFormatter);
        String formattedTaskEndDate = taskEndDateKST.format(outputFormatter);

        log.debug("시작 날짜 시간: {}", formattedTaskStartDate);
        log.debug("끝 날짜 시간: {}", formattedTaskEndDate);

        taskData.setTask_startDate(formattedTaskStartDate);
        taskData.setTask_endDate(formattedTaskEndDate);

        taskService.addTask(taskData);
        log.debug("날짜 형식 변경함 {}", taskData);
    }

    // 오늘 날짜로 일정 조회
    @GetMapping("/getTasks")
    public List<Map<String, Object>> getTasksByStartDate() {
        return taskService.getTasksByStartDate();
    }
}
