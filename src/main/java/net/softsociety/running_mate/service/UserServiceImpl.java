package net.softsociety.running_mate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import net.softsociety.running_mate.dao.UserDAO;
import net.softsociety.running_mate.dto.LoginDTO;
import net.softsociety.running_mate.dto.TokenDTO;
import net.softsociety.running_mate.dto.UserDTO;
import net.softsociety.running_mate.exception.DuplicatedUsernameException;
import net.softsociety.running_mate.exception.LoginFailedException;
import net.softsociety.running_mate.jwt.TokenProvider;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService 
{
	// 암호화 위한 인코더
	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final TokenProvider jwtTokenProvider;

	@Autowired
	UserDAO userDao;

	@Override
	public boolean join(UserDTO userDto) {
		// 가입된 유저인지 확인
		if (userDao.findUserId(userDto.getUser_id()).isPresent()) {
			
		}
		// 가입 안했으면 아래 진행
		UserDTO userVo = UserDTO.builder()
				.user_id(userDto.getUser_id())
				.user_pw(passwordEncoder.encode(userDto.getUser_pw()))
				.user_name(userDto.getUser_name())
				.user_email(userDto.getUser_email())
				.build();
		
		userDao.join(userVo);
		
		return userDao.findUserId(userDto.getUser_id()).isPresent();
	}

	/**
     * 토큰 발급받는 메소드
     * @param loginDTO 로그인 하는 유저의 정보
     * @return result[0]: accessToken, result[1]: refreshToken
     */
	@Override
	public String login(LoginDTO loginDto) {
		UserDTO userDto = userDao.findUser(loginDto.getUser_id())
				.orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다."));
		
		if(!passwordEncoder.matches(loginDto.getUser_pw(), userDto.getPassword())) {
			throw new LoginFailedException("잘못된 비밀번호입니다.");
		}
		
		return userDto.getUser_id();
	}

	/**
     * 유저가 db에 있는지 확인하는 함수
     * @param userid 유저의 아이디 입력
     * @return 유저가 있다면: true, 유저가 없다면: false
     */
	@Override
	public boolean haveUser(String user_id) {
		if(userDao.findUserId(user_id).isPresent()) {
			return true;
		} else {
			return false;
		}
	}

	/**
     * 유저의 아이디를 찾는 함수
     * @param userId 유저의 아이디 입력
     * @return 유저의 아이디가 없다면 에러를 뱉고, 있다면 userId리턴
     */
	@Override
	public UserDTO findUserId(String user_id) {
		return userDao.findUserId(user_id)
				.orElseThrow(() -> 
						new DuplicatedUsernameException("유저 중복"));
	}

	@Override
	public TokenDTO tokenGenerator(String user_id) {
		UserDTO userDto = userDao.findUser(user_id)
				.orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다"));
		
		return TokenDTO.builder()
				.accessToken("Bearer" + jwtTokenProvider.createAccessToken(userDto.getUser_id(), null))
				.refreshToken("Bearer" + jwtTokenProvider.createRefreshToken(userDto.getUser_id(), null))
				.build();
	}

	


	

	
	
}
