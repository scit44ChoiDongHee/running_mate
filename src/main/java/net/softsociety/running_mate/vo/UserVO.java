package net.softsociety.running_mate.vo;

import java.util.Collection;

import javax.persistence.Column;

import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVO implements UserDetails { //UserDetails는 시큐리티가 관리하는 객체이다.

	@Id
    @Column(name = "user_id", length = 20, nullable = false)
    private String userId;

    @Column(name = "user_pw", length = 20, nullable = false)
    private String userPw;

    @Column(name = "user_name", length = 20, nullable = false)
    private String userName;

    @Column(name = "user_email", length = 30, nullable = false)
    private String userEmail;

    @Column(name = "user_birthday", length = 20)
    private String userBirthday;

    @Column(name = "user_phone", length = 20, nullable = false)
    private String userPhone;

    @Column(name = "user_nickname", length = 20, nullable = false)
    private String userNickname;

    @Column(name = "user_photo", length = 200)
    private String userPhoto;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
