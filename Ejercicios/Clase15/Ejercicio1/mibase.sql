-- PUNTO 1 (CREAR DATABASE) --
CREATE DATABASE mibase;
USE mibase;

-- PUNTO 2 (CREAR TABLA) --
CREATE TABLE usuarios(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT UNSIGNED NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

-- PUNTO 3 (INSERTAR USUARIOS EN LA TABLA) --
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Lucas', 'Delbene', '20', 'lucasdelbene14@gmail.com')

-- PUNTO 4 (LISTAR LOS USUARIOS AGREGADOS) --
SELECT * FROM usuarios

-- PUNTO 5 (BORRAR USUARIOS) --
DELETE FROM usuarios WHERE id = 3;

-- PUNTO 6 (ACTUALIZAR DATO DE USUARIO) --
UPDATE usuarios SET edad = 35 WHERE id = 2