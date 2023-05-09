//TESTING PARA EL DESAFIO ENTREGABLE TESTEAMOS NUESTRA API REST (CLASE 42)//

//IMPORTO ProductosDAOMongoDB y assert PARA PODER UTILIZARLOS//
import ProductosDAOMongoDB from "../daos/productos/ProductosDAOMongoDB";
import assert from 'assert';

//BASICAMENTE ESTO ES UN CODIGO DE PRUEBAS PARA VERIFICAR EL FUNCIONAMIENTO DE UNA API REST. UTILIZO VARIAS FUNCIONES y OBJETOS, COMO assert y ProductosDAOMongoDB PARA PODER HACER PRUEBAS SOBRE UNA BASE DE DATOS DE PRODUCTOS. A CADA PRUEBA LA DESCRIBO EN UN IT QUE DEFINE EL COMPORTAMIENTO ESPERADO y VERIFICO EL RESULTADO MEDIANTE EL USO DE AFIRMACIONES assertions//

describe('Test sobre DAO Productos MongoDB', ()=>{

    //PRUEBO QUE LA FUNCION getAll() DEL OBJETO productoDAO DEVUELVA AL MENOS UN PRODUCTO. PARA HACERLO, CREO UNA INSTANCIA DE ProductosDAOMongoDB, LLAMO A getAll() y VERIFICO QUE EL ARRAY DEVUELTO TENGA UNA LONGITUD MAYOR A CERO USANDO LA FUNCION assert(). SI LA AFIRMACION ES VERDADERA, LA PRUEBA PASA y EN CASO CONTRARIO LA PRUEBA FALLARIA//
    it(`Debería obtener todos los productos`, async()=>{
        const productoDAO = new ProductosDAOMongoDB();
        const todosLosProductos = await productoDAO.getAll();
        assert(todosLosProductos.length > 0);
    });

    //UTILIZANDO LA FUNCION save() DEL OBJETO productoDAO PUEDO CREAR UN NUEVO PRODUCTO. PARA HACERLO, PRIMERO VERIFIQUE CUANTOS PRODUCTOS HABIA EN LA BASE DE DATOS ANTES DE CREAR UNO NUEVO. DESPUES, CREO UN NUEVO PRODUCTO CON SUS PROPIAS CARACTERISTICAS, LO GUARDO EN LA BASE DE DATOS y COMPRUEBO QUE LA CANTIDAD DE PRODUCTOS SE HAYA AUMENTADO EN UNO. SI LA CANTIDAD DE PRODUCTOS AUMENTO, LA PRUEBA PASA y EN CASO CONTRARIO LA PRUEBA FALLARIA//
    it(`Debería crear un producto`, async()=>{
        const productoDAO = new ProductosDAOMongoDB();
        const todosLosProductosBefore = await productoDAO.getAll();

        const nuevoProducto = {
            nombre: `Producto`,
            precio: 550,
            url: `URL`,
            descripcion: `Descripcion`,
            timestamp: new Date().toDateString(),
            thumbnail: `URL IMAGEN`,
            codigo: 12345,
            stock: 3,
            cantidad: 0
        }
        await productoDAO.save(nuevoProducto);

        const todosLosProductosAfter = await productoDAO.getAll();
        assert(todosLosProductosAfter.length > todosLosProductosBefore.length);
    });

    //UTILIZANDO LA FUNCION updateById() DEL OBJETO productoDAO PUEDO MODIFICAR UN PRODUCTO POR ID YA EXISTENTE. PARA HACERLO, PRIMERO AGARRO UN PRODUCTO DE LA BASE DE DATOS UTILIZANDO SU ID. SEGUNDO, MUESTRO POR CONSOLA EL PRODUCTO OBTENIDO. TERCERO, LLAMO A LA FUNCION updateById() PARA MODIFICAR LAS CARACTERISTICAS DEL PRODUCTO, AGREGANDOLE NUEVOS CARACTERISTICAS. DESPUES DE ACTUALIZAR EL PRODUCTO, MUESTRO POR CONSOLA EL PRODUCTO ACTUALIZADO y FINALMENTE VERIFICO QUE EL NOMBRE DEL PRODUCTO ANTES DE LA ACTUALIZACION NO SEA IGUAL AL NOMBRE DEL PRODUCTO DESPUES DE LA ACTUALIZACION UTILIZANDO LA FUNCION assert(). COMO LOS ANTERIORES, SI ESTA AFIRMACION ES VERDADERA PASA y EN CASO CONTRARIO LA PRUEBA FALLARIA//
    it(`Debería modificar un producto`, async()=>{
        const productoDAO = new ProductosDAOMongoDB();
        const id = `632f543276a488c300921477`;
        const productoBefore = await productoDAO.getById(id);
        console.log(productoBefore);

        const productoActualizado = await productoDAO.updateById(
            id,
            `Modificado`,
            9,
            `URL Modificada`,
            `Descripción Modificada`,
            new Date().toDateString(),
            9999,
            1
        );
        console.log(productoActualizado);
        assert(productoBefore.nombre != productoActualizado.nombre);
    });

    //REALIZO UNA PRUEBA DE SOFTWARE PARA COMPROBAR SI PUEDO ELIMINAR UN PRODUCTO CORRECTAMENTE DE LA BASE DE DATOS, EN DONDE USO LA CLASE ProductosDAOMongoDB LA CUAL ME AYUDA A REALIZAR OPERACIONES EN LA BASE DE DATOS. PRIMERO, LA PRUEBA OBTIENE TODOS LOS PRODUCTOS QUE ESTEN EN LA BASE DE DATOS, ANTES DE BORRAR A UNO SEGUN SU ID. UNA VEZ BORRADO ESE PRODUCTO, LA PRUEBA VUELVE A OBTENER TODOS LOS PRODUCTOS RESTANTES EN LA BASE DE DATOS. FINALMENTE, LA PRUEBA VERIFICA QUE LA LISTA DE PRODUCTOS DESPUES DE BORRARSE SEA MAS CORTA QUE LA LISTA ANTERIOR, EN DONDE UTILIZO LA FUNCION assert, EN LA CUAL ASEGURA QUE EL PRODUCTO FUE ELIMINADO CORRECTAMENTE DE LA BASE DE DATOS//
    it(`Debería borrar un producto`, async () => {
        const productoDAO = new ProductosDAOMongoDB();

        const todosLosProductosBefore = await productoDAO.getAll();
        await productoDAO.deleteById(`632efb17324f2ba3f6932581`);

        const todosLosProductosAfter = await productoDAO.getAll();
        assert(todosLosProductosBefore.length > todosLosProductosAfter.length);
    });
});


