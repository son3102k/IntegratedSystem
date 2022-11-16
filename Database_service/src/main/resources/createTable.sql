use quizztestdb;

create table user (
	user_id int not null auto_increment,
    name varchar(50) not null,
    gender varchar(2) not null,
    dateofbirth datetime not null,
    school_name varchar(50),
    phonenumber varchar(20) not null,
    email varchar(50) not null,
    address varchar(100),
    constraint pk_user primary key (user_id)
);

create table account (
	account_id int not null auto_increment,
    user_id int,
    username varchar(50) not null,
    password varchar(256) not null,
    constraint pk_account primary key (account_id),
    constraint fk_account_user foreign key (user_id) references user(user_id)
);

create table exam (
	exam_id int not null auto_increment,
    constraint pk_exam primary key (exam_id)
);

create table question (
	question_id int not null auto_increment,
    exam_id int,
    question_number int,
    content varchar(256),
    true_answer int,
    constraint pk_question primary key (question_id),
    constraint fk_exam_question foreign key (exam_id) references exam(exam_id)
);

create table answer (
	answer_id int not null auto_increment,
	question_id int,
    answernumber int,
    content varchar(256),
    constraint pk_answer primary key (answer_id),
    constraint fk_answer_question foreign key (question_id) references question(question_id)
);

show tables;