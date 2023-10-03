-- user_vo 테이블
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
-- user_vo fake 데이터
insert into 
    user_vo (user_id, user_pw, user_name, user_email, user_birthday, user_phone, user_nickname, user_photo)
values 
    ('admin', 'admin', '홍길동', 'admin@gmail.com', '2000-01-01', '010-1111-1111', 'admin', 'profile_image');
-- big_goal 테이블
 CREATE TABLE big_goal (
  bigGoal_number NUMBER NOT NULL PRIMARY KEY,
  bigGoal_name VARCHAR2(30 CHAR) NOT NULL,
  bigGoal_startDate DATE NOT NULL,
  bigGoal_endDate DATE NOT NULL,
  bigGoal_state VARCHAR2(20 CHAR) DEFAULT 'ongoing',
  user_id VARCHAR2(20 CHAR) NOT NULL,
  CONSTRAINT check_bigGoal_state CHECK (bigGoal_state IN ('ongoing', 'completed'))
);
-- small_goal 테이블
CREATE TABLE small_goal (
    SMALLGOAL_NUMBER NUMBER NOT NULL,
    SMALLGOAL_NAME VARCHAR2(30 BYTE) NOT NULL,
    SMALLGOAL_STARTDATE DATE NOT NULL,
    SMALLGOAL_ENDDATE DATE NOT NULL,
    SMALLGOAL_PRIORITY NUMBER,
    SMALLGOAL_LOOP DATE,
    SMALLGOAL_CHECK VARCHAR2(20 BYTE) DEFAULT 'ongoing',
    SMALLGOAL_CHECKFIGURE VARCHAR2(20 BYTE),
    SMALLGOAL_PROGRESS NUMBER,
    SMALLGOAL_MEMO VARCHAR2(500 BYTE),
    SMALLGOAL_TOTALTIME NUMBER,
    BIGGOAL_NUMBER NUMBER NOT NULL,
    CONSTRAINT SMALL_GOAL_PK PRIMARY KEY (SMALLGOAL_NUMBER),
    CONSTRAINT BIG_GOAL_FK FOREIGN KEY (BIGGOAL_NUMBER) REFERENCES BIG_GOAL (BIGGOAL_NUMBER) ON DELETE CASCADE,
    CONSTRAINT CHECK_SMALLGOAL_CHECK CHECK (SMALLGOAL_CHECK IN ('complete', 'ongoing'))
);
--small_goal 시퀀스
CREATE SEQUENCE small_goal_seq
    START WITH 2
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
--big_goal 시퀀스
CREATE SEQUENCE big_goal_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
-- big_goal fake데이터
insert into big_goal
    (bigGoal_number, bigGoal_name, bigGoal_startDate, bigGoal_endDate, user_id)			
values
    (big_goal_seq.NEXTVAL, '운동', TO_DATE('23/10/06', 'YY/MM/DD'), TO_DATE('23/10/07', 'YY/MM/DD'), '신짱구');
-- small_goal fake데이터
INSERT INTO small_goal (
    smallGoal_number,
    smallGoal_name,
    smallGoal_startDate,
    smallGoal_endDate,
    smallGoal_priority,
    smallGoal_loop,
    smallGoal_check,
    smallGoal_checkFigure,
    smallGoal_progress,
    smallGoal_memo,
    smallGoal_totalTime,
    bigGoal_number
)
VALUES (
    small_goal_seq.NEXTVAL, -- smallGoal_number에는 시퀀스 값을 사용 (예시)
    '샘플 목표',            -- smallGoal_name (예시)
    TO_DATE('2023-09-28', 'YYYY-MM-DD'), -- smallGoal_startDate (예시)
    TO_DATE('2023-10-05', 'YYYY-MM-DD'), -- smallGoal_endDate (예시)
    1,                        -- smallGoal_priority (예시)
    TO_DATE('2023-09-30', 'YYYY-MM-DD'), -- smallGoal_loop (예시)
    'ongoing',                -- smallGoal_check (예시)
    '예시',                    -- smallGoal_checkFigure (예시)
    0,                        -- smallGoal_progress (예시)
    '이것은 예시입니다.',     -- smallGoal_memo (예시)
    0,                        -- smallGoal_totalTime (예시)
    39                         -- bigGoal_number (예시)
);
-- task_vo 테이블
CREATE TABLE TASK_TABLE (
  task_number NUMBER PRIMARY KEY,
  task_title VARCHAR2(255),
  task_startDate DATE,
  task_endDate DATE,
  bigGoal_number NUMBER,
  smallGoal_number NUMBER,
  FOREIGN KEY (bigGoal_number) REFERENCES big_Goal (bigGoal_number),
  FOREIGN KEY (smallGoal_number) REFERENCES small_Goal (smallGoal_number)
);
-- task_number 시퀀스
CREATE SEQUENCE task_seq
  START WITH 1
  INCREMENT BY 1
  NOMAXVALUE
  NOCYCLE;
-- 조회용 sql문
select * from user_vo;
drop table user_vo;
drop table small_goal;
commit;