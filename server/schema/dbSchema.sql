DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;
DROP TABLE IF EXISTS steps CASCADE;

CREATE TABLE applicants (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	avatar VARCHAR(255) 

);

CREATE TABLE applications (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	applicant_id INT REFERENCES applicants(id) ON DELETE CASCADE,
	company varchar(255) NOT NULL,
	job_title varchar(255) NOT NULL,
	how_applied varchar(255),
	url varchar(255),
	date_applied DATE NOT NULL,
	location varchar(255),
	found_by varchar(255) NOT NULL,
	notes varchar(255),
	app_status varchar(255) NOT NULL
); 


CREATE TABLE steps (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	app_id INT REFERENCES applications(id) ON DELETE CASCADE,
	date DATE NOT NULL,
	step_type varchar(255) NOT NULL,
	contact_name varchar(255) NOT NULL,
	contact_role varchar(255) NOT NULL,
	contact_info varchar(255) NOT NULL,
	notes varchar(255)
);


