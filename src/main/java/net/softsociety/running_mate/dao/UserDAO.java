package net.softsociety.running_mate.dao;

import org.apache.ibatis.annotations.Mapper; 

import net.softsociety.running_mate.domain.UserInfo;

@Mapper
public interface UserDAO 
{
	int save(int testInput);

	int userSingUp(UserInfo userInfo);


}
