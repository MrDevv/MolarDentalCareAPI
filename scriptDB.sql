CREATE DATABASE molardentalcare;

use molardentalcare;

CREATE TABLE usuario(
	usuario VARCHAR(12) NOT NULL,
    password VARCHAR(12) NOT NULL,
    rol VARCHAR(12),
	PRIMARY KEY(usuario)
);

CREATE TABLE paciente(
	idPaciente INT NOT NULL AUTO_INCREMENT,
    apellidos VARCHAR(30) NOT NULL,
    nombres VARCHAR(30) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    dni VARCHAR(8) NOT NULL,
    telefono VARCHAR(9),
    direccion VARCHAR(20),
    correo VARCHAR(30),
    idusuario VARCHAR(12),
    PRIMARY KEY(idPaciente),
    FOREIGN KEY (idusuario) REFERENCES usuario(usuario)
);

CREATE TABLE odontologo(
	idOdontologo INT NOT NULL AUTO_INCREMENT,
    apellidos VARCHAR(30) NOT NULL,
    nombres VARCHAR(30) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    dni VARCHAR(8) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    direccion VARCHAR(20) NOT NULL,
    correo VARCHAR(30) NOT NULL,
    idusuario VARCHAR(12) NOT NULL,
    PRIMARY KEY(idOdontologo),
    FOREIGN KEY (idusuario) REFERENCES usuario(usuario)
);

CREATE TABLE horarioAtencion(
	idHorarioAtencion INT NOT NULL AUTO_INCREMENT,
    estado VARCHAR(20) NOT NULL,
    fechaRegistro DATE NOT NULL,
    horaInicio VARCHAR(10) NOT NULL,
    horaFin VARCHAR(10) NOT NULL,
    idOdontologo INT NOT NULL,
    PRIMARY KEY(idHorarioAtencion),
    FOREIGN KEY(idOdontologo) REFERENCES odontologo(idOdontologo)
);

CREATE TABLE cita(
	idCita INT NOT NULL AUTO_INCREMENT,
    montoTotal DECIMAL(9,2) NOT NULL,
    idHorarioAtencion INT NOT NULL,
    idPaciente INT NOT NULL,
    PRIMARY KEY(idCita),
    FOREIGN KEY(idHorarioAtencion) REFERENCES horarioAtencion(idHorarioAtencion),
    FOREIGN KEY(idPaciente) REFERENCES paciente(idPaciente)
);

-- USUARIOS
INSERT INTO usuario values('mvegape', '12345', 'paciente');
INSERT INTO usuario values('asanchez', '12345', 'odontologo');
-- PACIENTES
INSERT INTO paciente(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) 
VALUES('Vega', 'Miguel', '2001-03-24', '74283707', '984323059', 'jr. montufar','mvegape@gmail.com', 'mvegape');
-- ODONTOLOGOS
INSERT INTO odontologo(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) 
VALUES('Sanchez', 'Andre', '1993-02-10', '76340312', '948392945', 'av. rosales','andre@gmail.com', 'asanchez');
-- HORARIOS DE ATENCIÓN
INSERT INTO horarioAtencion(estado, fechaRegistro, horaInicio, horaFin, idOdontologo) 
VALUES('disponible', '2023-07-12', '10:00', '11:00', 1);
-- CITA
INSERT INTO cita(montoTotal, idHorarioAtencion, idPaciente) VALUES(20.9, 1, 1)

select * from odontologo as o inner join usuario as u on o.idusuario = u.usuario
select * from horarioAtencion as ho inner join odontologo as o on o.idOdontologo= ho.idOdontologo
select * from cita as c inner join horarioAtencion as h on c.idHorarioAtencion = h.idHorarioAtencion inner join paciente as p on c.idPaciente = p.idPaciente

update usuario set rol = 'paciente' where usuario = 'mvegape';
select * from usuario


