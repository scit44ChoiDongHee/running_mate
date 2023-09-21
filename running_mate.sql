create table user_vo (
    user_id         varchar2(100)    primary key,
    user_pw         varchar2(100)    not null,
    user_name       varchar2(100)    not null,
    user_email      varchar2(100)    not null,
    user_birthday   varchar2(100)    not null,
    user_phone      varchar2(100)    not null,
    user_nickname   varchar2(100)    not null,
    user_photo      varchar2(200)
);

insert into 
    user_vo (user_id, user_pw, user_name, user_email, user_birthday, user_phone, user_nickname, user_photo)
values 
    ('admin', 'admin', 'ȫ�浿', 'admin@gmail.com', '2000-01-01', '010-1111-1111', 'admin', 'profile_image');
    
select * from user_vo;
drop table user_vo;
commit;