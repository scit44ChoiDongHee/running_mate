package net.softsociety.running_mate.service;

import net.softsociety.running_mate.domain.UserInfo;

public interface UserService 
{

	int save(int testInput);

	int userSingUp(UserInfo userInfo);

}
