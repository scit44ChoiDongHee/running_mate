-- user_vo ���̺�
create table user_vo (
    user_id         varchar2(100)    primary key,
    user_pw         varchar2(100)    not null,
    user_name       varchar2(100)    not null,
    user_email      varchar2(100)    not null
);
-- user_vo fake ������
insert into 
    user_vo (user_id, user_pw, user_name, user_email, user_birthday, user_phone, user_nickname, user_photo)
values 
    ('admin', 'admin', 'ȫ�浿', 'admin@gmail.com', '2000-01-01', '010-1111-1111', 'admin', 'profile_image');
-- big_goal ���̺�
CREATE TABLE big_goal (
  bigGoal_number NUMBER NOT NULL PRIMARY KEY,
  bigGoal_name VARCHAR2(30 CHAR) NOT NULL,
  bigGoal_startDate DATE NOT NULL,
  bigGoal_endDate DATE NOT NULL,
  bigGoal_state VARCHAR2(20 CHAR) DEFAULT 'ongoing',
  user_id varchar2(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_vo (user_id) on delete cascade,
  CONSTRAINT check_bigGoal_state CHECK (bigGoal_state IN ('ongoing', 'completed'))
);
-- small_goal ���̺�
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
--small_goal ������
CREATE SEQUENCE small_goal_seq
    START WITH 2
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
--big_goal ������
CREATE SEQUENCE big_goal_seq
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
-- big_goal fake������
insert into big_goal
    (bigGoal_number, bigGoal_name, bigGoal_startDate, bigGoal_endDate, user_id)			
values
    (big_goal_seq.NEXTVAL, '�', TO_DATE('23/10/06', 'YY/MM/DD'), TO_DATE('23/10/07', 'YY/MM/DD'), '��¯��');
-- small_goal fake������
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
    small_goal_seq.NEXTVAL, -- smallGoal_number���� ������ ���� ��� (����)
    '���� ��ǥ',            -- smallGoal_name (����)
    TO_DATE('2023-09-28', 'YYYY-MM-DD'), -- smallGoal_startDate (����)
    TO_DATE('2023-10-05', 'YYYY-MM-DD'), -- smallGoal_endDate (����)
    1,                        -- smallGoal_priority (����)
    TO_DATE('2023-09-30', 'YYYY-MM-DD'), -- smallGoal_loop (����)
    'ongoing',                -- smallGoal_check (����)
    '����',                    -- smallGoal_checkFigure (����)
    0,                        -- smallGoal_progress (����)
    '�̰��� �����Դϴ�.',     -- smallGoal_memo (����)
    0,                        -- smallGoal_totalTime (����)
    39                         -- bigGoal_number (����)
);
-- task_vo ���̺�
CREATE TABLE task_vo (
  task_number NUMBER PRIMARY KEY,
  task_title VARCHAR2(255) NOT NULL,
  task_startDate DATE NOT NULL,
  task_endDate DATE NOT NULL,
  user_id varchar2(100) NOT NULL,
  bigGoal_number NUMBER NOT NULL,
  smallGoal_number NUMBER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_vo (user_id) on delete cascade,
  FOREIGN KEY (bigGoal_number) REFERENCES big_Goal (bigGoal_number) on delete cascade,
  FOREIGN KEY (smallGoal_number) REFERENCES small_Goal (smallGoal_number) on delete cascade
);
-- task_number ������
CREATE SEQUENCE task_seq
  START WITH 1
  INCREMENT BY 1
  NOMAXVALUE
  NOCYCLE;
-- actualTask_vo ���̺� (���� ���� �ϰ� ���̺�)
CREATE TABLE actualTask_vo (
  actualTask_number NUMBER PRIMARY KEY,
  actualTask_title VARCHAR2(255) NOT NULL,
  actualTask_startDate DATE NOT NULL,
  actualTask_endDate DATE NOT NULL,
  user_id VARCHAR2(100) NOT NULL,
  bigGoal_number NUMBER NOT NULL,
  smallGoal_number NUMBER NOT NULL,
  task_number NUMBER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_vo (user_id) ON DELETE CASCADE,
  FOREIGN KEY (bigGoal_number) REFERENCES big_Goal (bigGoal_number) ON DELETE CASCADE,
  FOREIGN KEY (smallGoal_number) REFERENCES small_Goal (smallGoal_number) ON DELETE CASCADE,
  FOREIGN KEY (task_number) REFERENCES task_vo (task_number) ON DELETE CASCADE
);
-- actualTask_number ������
CREATE SEQUENCE actualTask_seq
  START WITH 1
  INCREMENT BY 1
  NOMAXVALUE
  NOCYCLE;
-- ��ȸ�� sql��
drop table user_vo;
drop table task_vo;
drop table big_goal;
drop table small_goal;
select * from user_vo;
select * from big_goal;
select * from small_goal;
select * from task_vo;
select * from actualTask_vo;
commit;