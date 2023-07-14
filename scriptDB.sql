CREATE DATABASE molardentalcare;

use molardentalcare;

CREATE TABLE usuario(
    idUsuario INT NOT NULL AUTO_INCREMENT,
	Usuario VARCHAR(12) NOT NULL,
    Contrasena VARCHAR(12) NOT NULL,
    Rol VARCHAR(12),
	PRIMARY KEY(idUsuario)
);

CREATE TABLE paciente(
	idPaciente INT NOT NULL AUTO_INCREMENT,
    Apellidos VARCHAR(30) NOT NULL,
    Nombres VARCHAR(30) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Dni VARCHAR(8) NOT NULL,
    Telefono VARCHAR(9) NOT NULL,
    Direccion VARCHAR(20) NOT NULL,
    Correo VARCHAR(30) NOT NULL,
    IdUsuario INT NOT NULL,
    PRIMARY KEY(idPaciente),
    FOREIGN KEY (idusuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE odontologo(
	idOdontologo INT NOT NULL AUTO_INCREMENT,
    Apellidos VARCHAR(30) NOT NULL,
    Nombres VARCHAR(30) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Dni VARCHAR(8) NOT NULL,
    Telefono VARCHAR(9) NOT NULL,
    Direccion VARCHAR(20) NOT NULL,
    Correo VARCHAR(30) NOT NULL,
    idUsuario INT NOT NULL,
    PRIMARY KEY(idOdontologo),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE horarioAtencion(
	idHorarioAtencion INT NOT NULL AUTO_INCREMENT,
    estado VARCHAR(20) NOT NULL,
    fecharegistro DATE NOT NULL,
    horainicio VARCHAR(10) NOT NULL,
    horafin VARCHAR(10) NOT NULL,
    idOdontologo INT NOT NULL,
    PRIMARY KEY(idHorarioAtencion),
    FOREIGN KEY(idOdontologo) REFERENCES odontologo(idOdontologo)
);

CREATE TABLE cita(
	idCita INT NOT NULL AUTO_INCREMENT,
    montototal DECIMAL(9,2) NOT NULL,
    idHorarioAtencion INT NOT NULL,
    idPaciente INT NOT NULL,
    PRIMARY KEY(idCita),
    FOREIGN KEY(idHorarioAtencion) REFERENCES horarioAtencion(idHorarioAtencion),
    FOREIGN KEY(idPaciente) REFERENCES paciente(idPaciente)
);

-- USUARIOS
INSERT INTO usuario(usuario, contrasena, rol) values('mvegape', '12345', 'paciente');
INSERT INTO usuario(usuario, contrasena, rol) values('asanchez', '12345', 'odontologo');
-- PACIENTES
INSERT INTO paciente(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) 
VALUES('Vega', 'Miguel', '2001-03-24', '74283707', '984323059', 'jr. montufar','mvegape@gmail.com', 1);
-- ODONTOLOGOS
INSERT INTO odontologo(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) 
VALUES('Sanchez', 'Andre', '1993-02-10', '76340312', '948392945', 'av. rosales','andre@gmail.com', 2);
-- HORARIOS DE ATENCIÓN
INSERT INTO horarioAtencion(estado, fecharegistro, horainicio, horafin, idOdontologo) 
VALUES('disponible', '2023-07-12', '10:00', '11:00', 2);
-- CITA
INSERT INTO cita(montoTotal, idHorarioAtencion, idPaciente) VALUES(0, 1, 2)

select * from odontologo as o inner join usuario as u on o.idusuario = u.usuario
select * from horarioAtencion as ho inner join odontologo as o on o.idOdontologo= ho.idOdontologo
select * from cita as c inner join horarioAtencion as h on c.idHorarioAtencion = h.idHorarioAtencion inner join paciente as p on c.idPaciente = p.idPaciente

update usuario set rol = 'paciente' where usuario = 'mvegape';
select * from paciente

-- REPORTE CITA DE CADA PACIENTE
SELECT c.idCita AS ID, ha.fecharegistro AS FECHA, ha.horainicio AS INICIO, ha.horafin AS FIN, 
CASE WHEN c.montototal >= 20 THEN 'ATENDIDO' ELSE 'NO ATENDIDO' END AS ESTADO
FROM cita as c 
INNER JOIN paciente as p on c.idPaciente = p.idPaciente 
INNER JOIN horarioatencion as ha on c.idHorarioAtencion = ha.idHorarioAtencion
WHERE p.idPaciente = 2

-- SELECT C.Id Cita AS ID,HA.fecha AS FECHA,HA.horainicio AS INICIO,HA.horafin AS FIN
-- FROM CITA C INNER JOIN PACIENTE P
-- ON C.codigopaciente=P.codigopaciente
-- INNER JOIN HorarioAtencion HA ON HA.codigohorario=C.codigohorario
-- WHERE P.dni

select * from cita
