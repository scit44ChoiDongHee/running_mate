package net.softsociety.running_mate.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import net.softsociety.running_mate.dto.UserDTO;

@Mapper
public interface UserDAO 
{
	void join(UserDTO userVo);
	Optional<UserDTO> findUser(String user_id);
	Optional<UserDTO> findUserId(String user_id);
}
