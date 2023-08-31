package net.softsociety.running_mate.service;



import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.dao.UserDAO;
import net.softsociety.running_mate.domain.UserInfo;

@Slf4j
@Service
public class UserServiceImpl implements UserService 
{
	
	@Autowired
	UserDAO dao;

	@Override
	public int save(int testInput) 
	{
		
		int i = dao.save(testInput);
		return i;
	}

	@Override
	public int userSingUp(UserInfo userInfo) {
	    log.debug("서비스 임플 가입 확인 {}", userInfo);

//	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
//	    try {
//	        // Date 값을 String으로 변환하여 사용
//	        String inputDateStr = sdf.format(userInfo.getUser_birthday());
//	        Date inputDate = sdf.parse(inputDateStr);
//	        java.sql.Date oracleDate = new java.sql.Date(inputDate.getTime());
//
//	        userInfo.setUser_birthday(oracleDate);
//
//	    } catch (ParseException e) {
//	        e.printStackTrace();
//	    }
	    // ... 나머지 로직 ...

	    int i = dao.userSingUp(userInfo);
	    log.debug("서비스 임플 돌아오는 것 확인 {}", i);
	    return i;
	}



	

	
	
}
