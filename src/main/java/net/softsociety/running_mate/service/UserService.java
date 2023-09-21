package net.softsociety.running_mate.service;

import net.softsociety.running_mate.dto.LoginDTO;
import net.softsociety.running_mate.dto.TokenDTO;
import net.softsociety.running_mate.dto.UserDTO;

public interface UserService 
{
	boolean join(UserDTO userDto);
	
	String login(LoginDTO loginDto);
	
	boolean haveUser(String user_id);
	
	UserDTO findUserId(String user_id);
	
	TokenDTO tokenGenerator(String user_id);
}
