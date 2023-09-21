package net.softsociety.running_mate.vo;

import java.sql.Date;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserVo {
	public UserVo(String subject, String string, Collection<? extends GrantedAuthority> authorities) {}
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_email;
    private Date user_birthday;  // 타입 변경
    private String user_phone;
    private String user_nickname;
    private String user_photo;
}