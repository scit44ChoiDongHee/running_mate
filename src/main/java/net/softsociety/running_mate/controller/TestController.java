package net.softsociety.running_mate.controller;


import java.util.ArrayList;    

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.softsociety.running_mate.dto.BigGoalCount;


import net.softsociety.running_mate.dto.GoalDTO;

import net.softsociety.running_mate.dto.SmallGoalCount;
import net.softsociety.running_mate.dto.SmallGoalDTO;
import net.softsociety.running_mate.service.GoalService;
import net.softsociety.running_mate.vo.Goal;
import net.softsociety.running_mate.vo.SmallGoal;
import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
public class TestController {
	
	@Autowired
	GoalService service;
	
	
	    @GetMapping("/")
	    public String index() {
	        return "/build/index.html";
	    }
	
	
	
	@GetMapping("/api")
	public String test() {
		log.debug("서버 진입 확인");
		return "목표 확인";
	}
	
	
	// 대목표 저장하기
	@PostMapping("/api/goal")
    public ResponseEntity<String> goal(@RequestBody GoalDTO goalDTO ) 
	{
    	 try 
    	 {
    		 //등록 성공 시
    		 log.debug("들어온 값 확인 {}", goalDTO);
    		 int i = service.bigGoalInsert(goalDTO);
    		 log.debug("컨트롤러 저장 확인");
    		 return ResponseEntity.ok("User registered successfully");       
    	} 
    	catch (Exception e) 
    	{
    		// 등록 실패 시
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
    	}
    }
	
	//소목표 저장하기
	@PostMapping("api/smallGoal")
	 public ResponseEntity<String> smallgoal(@RequestBody SmallGoal smallGoal  ) 
		{
	    	 try 
	    	 {
	    		 //등록 성공 시
	    		 log.debug("소목표 저장 들어온 값 확인 {}", smallGoal);
	    		 int i = service.smallGoalInsert(smallGoal);
	    		 
	    		 log.debug("소목표 저장하고 돌아온 거 확인 {}", i);
	    		 return ResponseEntity.ok("User registered successfully");       
	    	} 
	    	catch (Exception e) 
	    	{
	    		// 등록 실패 시
	    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
	    	}
	    }
	
	
	//대목표 전체 불러오기
	@GetMapping("/api/BigGoals")
	public ArrayList<Goal> GetBigGoalList(@RequestParam String userId) {
		log.debug("들어온 값 확인 {}", userId);
		
		ArrayList<Goal> list = new ArrayList<>();	
		list = service.getBigGoalList(userId);
		
		log.debug("DB에서 불러온 대목표 배열 확인 {}", list);
		return list;
	}
	
	// 대목표 갯수 불러오기
	@GetMapping("/api/BigGoalCount")
	public BigGoalCount getBigGoalCount(@RequestParam String userId) {
	    // 서비스로부터 대목표 갯수를 가져옵니다.
		log.debug("대목표 갯수 함수/ 넘어온 아이디 {}", userId);
	    BigGoalCount bigGoalCount = service.getBigGoalCount(userId);
	    
	    // 가져온 결과를 반환합니다.
	    return bigGoalCount;
	}
	
	// 소목표 불러오기
	@GetMapping("/api/user/smallGoals")
	public ArrayList<SmallGoal> GetSmallGoalList(@RequestParam int bigGoal_number) 
	{
		ArrayList<SmallGoal> List = new ArrayList<>();
		SmallGoalDTO smallGoalDTO = new SmallGoalDTO();
		log.debug("소목표에서 값 넘어오는 지 확인 {}", bigGoal_number);
		
		smallGoalDTO.setBigGoal_number(bigGoal_number);
		log.debug("소목표 확인 {}", smallGoalDTO);
		List = service.getSmallGoalList(smallGoalDTO);
		log.debug("소목표 불러오기 값 확인 {}", List);
		return List;
	}
	
	//소목표 갯수 불러오기
	@GetMapping("/api/SmallGoalCount")
	public SmallGoalCount getSmallGoalCount(@RequestParam int number) {
		SmallGoalCount count = new SmallGoalCount();
		
		count = service.getSmallGoalCount(number);
		return count;
	}
	
	// 대목표 Dday 불러오기
	@GetMapping("/api/Dday")
	public int GetDday(@RequestParam int bigGoal_number) {
		int day;
		day = service.GetDday(bigGoal_number);
		return day;
	}
	
	//소목표 디데이 불러오기
	@GetMapping("/api/SmallDday")
	public int GetSmallDday(@RequestParam int smallGoal_number) {
	    log.debug("디데이 소목표 값 {}", smallGoal_number);
	   

	    int day;
	    day = service.GetSmallDday(smallGoal_number);
	    return day;
	}
	
	//소목표 삭제하기
	// 경로 변수를 매개변수로 사용
    @DeleteMapping("/api/user/smallGoals/delete/{smallGoalId}")
    public void deleteSmallGoal(@PathVariable Long smallGoalId) {
        // smallGoalId를 사용하여 소목표를 삭제
        service.deleteSmallGoal(smallGoalId);

    }
	
    //대목표 삭제하기 
    @DeleteMapping("/api/user/BigGoals/delete/{BigGoalId}")
    public void deleteBigGoal(@PathVariable Long BigGoalId) {
    	service.deleteBigGoal(BigGoalId);
    }
    
    //대목표 수정하기
    @PostMapping("api/BigGoal/Update")
    public void UpDateBigGoal(@RequestBody GoalDTO goalDTO) {
    	if(goalDTO.getBigGoal_name() != null || goalDTO.getBigGoal_startDate() != null  || goalDTO.getBigGoal_endDate() != null ) {
    		
    		log.debug("대목표 수정하기 확인 {}", goalDTO);
    		service.UpDateBigGoal(goalDTO);
    	}
    }
    
    //소목표 수정하기
    @PostMapping("/api/SmallGoal/Update")
    public void UpDateSmallGoal(@RequestBody SmallGoal smallGoal) {
    	if(smallGoal.getSmallGoal_name() != null || smallGoal.getSmallGoal_startDate() != null || smallGoal.getSmallGoal_endDate() != null) {
    		log.debug("소목표 수정하기 확인 {}", smallGoal);
    		service.UpDateSmallGoal(smallGoal);
    		log.debug("소목표 수정하기 돌아옴");
    		
    	}
    }
    
    
	
	
	
}
