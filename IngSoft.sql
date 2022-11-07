create table Usuario(
	email varchar(50),
	name varchar(50),
	photo mediumblob,
	primary key(email)
);

create table Asesoria(
	idAsesoria	mediumint not null auto_increment primary key,
	idProfesor varchar(50),
	description varchar(500),
	name varchar(30),
	availability longtext,
	price double,
	duration int,
	foreign key (idProfesor) references Usuario(email)
);

create table Cita(
	idCita mediumint not null auto_increment primary key,
	idAlumno varchar(50),
	idAsesoria mediumint,
	startDate datetime,
	foreign key (idAlumno) references Usuario(email),
	foreign key (idAsesoria) references Asesoria(idAsesoria)
);