
--(DESAFIO GENERICO - GESTIONANDO UNA BASE DE DATOS)--

--(PUNTO 1)--
--(CREO UNA BASE DE DATOS LLAMADA mibase)--
CREATE DATABASE mibase;
USE mibase;

--(PUNTO 2)--
--(CREO UNA TABLA DENTRO DE mibase LLAMADA usuarios QUE CONTIENE LOS SIGUIENTES CAMPOS)--
CREATE TABLE usuarios(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,   
    edad int UNSIGNED NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY(id) 
)

--(PUNTO 3)--
--(INSERTO 3 USUARIOS EN LA TABLA usuarios)--
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Lucas', 'Delbene', '20', 'lucasdelbene@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Lionel', 'Messi', '35', 'lionelmessi@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Neymar', 'JR', '31', 'neymarjr@gmail.com');

--(PUNTO 4)--
--(LISTO LOS 3 USUARIOS AGREGADOS)--
SELECT * FROM usuarios

--(PUNTO 5)--
--(BORRO EL USUARIO CON ID)--
DELETE FROM usuarios WHERE id=2;

--(PUNTO 6)--
--(ACTUALIZO LA EDAD DEL USUARIO CON ID 1 a 24 AÑOS)--
UPDATE usuarios SET edad=24 WHERE id=1

--(PUNTO 7)--
--(LISTO LOS REGISTROS COMPROBANDO QUE LOS DATOS ESTEN ACTUALIZADOS SEGUN LAS ACCIONES REALIZADAS)--
SELECT * FROM usuarios

