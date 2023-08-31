package net.softsociety.running_mate.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_email;
    private Date user_birthday;  // 타입 변경
    private String user_phone;
    private String user_nickname;
    private String user_photo;
}