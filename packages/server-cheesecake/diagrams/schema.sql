CREATE TABLE `Department` (
  `department_id` varchar(6),
  `department_name` text,
  PRIMARY KEY (`department_id`)
);

CREATE TABLE `Major` (
  `major_id` varchar(6),
  `major_name` varchar(200),
  `department_id` varchar(6),
  PRIMARY KEY (`major_id`),
  FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`)
);

CREATE TABLE `Course` (
  `course_id` varchar(7),
  `course_name` varchar(200),
  `major_id` varchar(6),
  `credits` tinyint,
  PRIMARY KEY (`course_id`),
  FOREIGN KEY (`major_id`) REFERENCES `Major`(`major_id`)
);

CREATE TABLE `Class` (
  `class_id` varchar(10),
  `class_name` varchar(200),
  `course_id` varchar(7),
  `total _slots` tinyint,
  `day` text,
  `remaining_slots` tinyint,
  `start_period` tinyint,
  `number_of_period` tinyint,
  `lecturer_info` json,
  `room` varchar(6),
  `duration` text,
  PRIMARY KEY (`class_id`),
  FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`)
);

CREATE TABLE `Student` (
  `student_id` varchar(11),
  `password` varchar(200),
  `first_name` varchar(200),
  `last_name` varchar(200),
  `phone` varchar(10),
  `email` varchar(200),
  `shcd_dk` boolean,
  `shcd_gk1` boolean,
  `shcd_gk2` boolean,
  `shcd_ck` boolean,
  `major_id` varchar(6),
  PRIMARY KEY (`student_id`),
  FOREIGN KEY (`major_id`) REFERENCES `Major`(`department_id`)
);

CREATE TABLE `Grade` (
  `grade_id` int,
  `grade_inclass` tinyint,
  `grade_mid` tinyint,
  `grade_final` tinyint,
  `grade_overall_number` tinyint,
  `grade_overall_letter` char,
  `class_id` varchar(10),
  `student_id` varchar(11),
  PRIMARY KEY (`grade_id`),
  FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`),
  FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);

CREATE TABLE `Registration` (
  `registration_id` varchar(20),
  `student_id` varchar(11),
  `class_id` varchar(10),
  PRIMARY KEY (`registration_id`),
  FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`),
  FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);

CREATE TABLE `Practice Class` (
  `practice_class_id` varchar(10),
  `class_id` varchar(7),
  `start_period` tinyint,
  `number_of_period` tinyint,
  `lecturer_info` json,
  `room` varchar(6),
  `duration` text,
  PRIMARY KEY (`practice_class_id`)
);

CREATE TABLE `Announcement` (
  `announcement_id` int,
  `title` varchar(200),
  `content` text,
  `time_created` datetime,
  `time_modified` datetime,
  PRIMARY KEY (`announcement_id`)
);

CREATE TABLE `Curriculum` (
  `curriculum_id` int,
  `period` tinyint,
  `content` varchar(200),
  `class_material` varchar(200),
  `class_id` varchar(11),
  PRIMARY KEY (`curriculum_id`),
  FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`)
);

CREATE TABLE `Student_Notes` (
  `note_id` int,
  `curriculum_id` int,
  `student_id` varchar(11),
  `note_material` varchar(200),
  PRIMARY KEY (`note_id`),
  FOREIGN KEY (`curriculum_id`) REFERENCES `Curriculum`(`curriculum_id`),
  FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);