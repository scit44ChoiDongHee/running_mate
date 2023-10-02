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
    ('admin', 'admin', '홍길동', 'admin@gmail.com', '2000-01-01', '010-1111-1111', 'admin', 'profile_image');

 CREATE TABLE big_goal (
  bigGoal_number NUMBER NOT NULL PRIMARY KEY,
  bigGoal_name VARCHAR2(30 CHAR) NOT NULL,
  bigGoal_startDate DATE NOT NULL,
  bigGoal_endDate DATE NOT NULL,
  bigGoal_state VARCHAR2(20 CHAR) DEFAULT 'ongoing',
  user_id VARCHAR2(20 CHAR) NOT NULL,
  CONSTRAINT check_bigGoal_state CHECK (bigGoal_state IN ('ongoing', 'completed'))
);

CREATE TABLE small_goal (
    smallGoal_number NUMBER NOT NULL,
    smallGoal_name VARCHAR2(30) NOT NULL,
    smallGoal_startDate DATE NOT NULL,
    smallGoal_endDate DATE NOT NULL,
    smallGoal_priority NUMBER,
    smallGoal_loop DATE,
    smallGoal_check VARCHAR2(20) DEFAULT 'ongoing', -- 변경된 기본값
    smallGoal_checkFigure VARCHAR2(20),
    smallGoal_progress NUMBER,
    smallGoal_memo VARCHAR2(500),
    smallGoal_totalTime NUMBER,
    bigGoal_number NUMBER NOT NULL,
    CONSTRAINT small_goal_pk PRIMARY KEY (smallGoal_number),
    CONSTRAINT big_goal_fk FOREIGN KEY (bigGoal_number) REFERENCES big_goal (bigGoal_number),
    CONSTRAINT check_smallGoal_check CHECK (smallGoal_check IN ('complete', 'ongoing'))
);

select * from user_vo;
drop table user_vo;
commit;