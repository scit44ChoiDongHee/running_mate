create table user_vo (
    user_id         varchar2(20)    primary key,
    user_pw         varchar2(20)    not null,
    user_name       varchar2(20)    not null,
    user_email      varchar2(30)    not null,
    user_birthday   varchar2(20),
    user_phone      varchar2(20)    not null,
    user_nickname   varchar2(20)    not null,
    user_photo      varchar2(200)
);

insert into 
    user_vo (user_id, user_pw, user_name, user_email, user_phone, user_nickname)
values 
    ('admin', 'admin', 'ȫ�浿', 'admin@gmail.com', '010-1111-1111', 'admin');
    
select * from user_vo;

drop table user_vo;

create table user_vo (
    user_id         varchar2(100)    primary key,
    user_pw         varchar2(100)    not null
);

commit;

delete from user_vo where user_id = "CHA";