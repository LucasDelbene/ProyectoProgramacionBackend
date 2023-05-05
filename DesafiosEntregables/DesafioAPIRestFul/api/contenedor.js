//REQUIERO FS (File System) PARA PODER UTILIZARLO//
const fs = require('fs');


class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    //CREO EL METODO save(objeto) LA CUAL RECIBE UN PRODUCTO, LO GUARDA EN EL ARCHIVO y DEVUELVE EL ID ASIGNADO//
    async save(objeto){
        const productos = await this.getAll()
        const index = productos.map(element => element.id).indexOf(objeto.id) //OBTENGO EL INDICE DEL PRODUCTO A REEMPLAZAR

        if(index >= 0){
            //SI EL indexOf ENCUENTRA AL PRODUCTO PASA ESTO//
            const productoViejo = productos[index]
            objeto.id = productos[index].id //ASIGNO AL NUEVO PRODUCTO EL MISMO ID QUE EL ANTERIOR
            productos[index] = objeto
            try{
                await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
                console.log('PRODUCTO GUARDADO CON EXITO');
                return [objeto, productoViejo];
            }catch(error){
                console.log(error);
            }
        }
        else{
            //SI EL indexOf NO ENCUENTRA AL PRODUCTO PASA ESTO//
            console.log('PRODUCTO NO ENCONTRADO');
            return [];
        }
    }

    //CREO EL METODO saveProducto() LA CUAL GUARDA UN PRODUCTO//
    async saveProducto(objeto){
        const productos = await this.getAll()
        objeto.id = parseInt(objeto.id) 
        objeto.id = this.checkId(objeto, productos)
        objeto.precio = parseInt(objeto.precio)

        try{
            console.log(`EL SIGUIENTE PRODUCTO SERA GUARDADO: \n${JSON.stringify(objeto)}`);
            productos.push(objeto);

            await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2))
            console.log('PRODUCTO GUARDADO CON EXITO')
            return objeto;
        }catch(error){
            console.log(error);
        }
    }

    //CREO EL METODO getByIdy(id) LA CUAL RECIBE UN ID y DEVUELVE EL OBJETO CON ESE ID, O NULL SI NO ESTA//
    async getById(id){
        const productos = await this.getAll()
        if(!this.checkLength(productos)){
            return
        }

        let producto = productos.find(elemento => elemento.id == id)
        return producto ? producto : null
    }

    //CREO EL METODO getAll() LA CUAL DEVUELVE TODOS LOS PRODUCTOS//
    async getAll(){
        try{
            let productos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(productos)
        }catch(error){
            console.log(error);
        }
    }

    //CREO EL METODO deleteById(Number) LA CUAL ELIMINA DE LOS PRODUCTOS, EL PRODUCTO CON EL ID BUSCADO//
    async deleteById(id){
        console.log(id);
        const productos = await this.getAll()
        if(!this.checkLength(productos)){
            return
        }

        const producto = productos.find(elemento => elemento.id == id)
        console.log(producto);
        const productoNuevo = productos.filter(elemento => elemento != producto)
        try {
            console.log(`EL SIGUIENTE PRODUCTO SERA ELIMINADO : \n${JSON.stringify(producto)}`)
            await fs.writeFile(this.ruta, JSON.stringify(productoNuevo, null, 2))
            console.log(`PROUDCTO BORRADO CON EXITO`)
            return producto
        }catch(error){
            console.log(error);
        }
    }

    //CREO EL METODO checkLength() PARA SABER SI EL ARRAY DE PRODUCTOS ESTA VACIO O NO//
    checkLength(array){
        if (array.length === 0){
            console.log('ARRAY VACIO')
            return false
        }
        return true
    }

    //CREO EL METODO checkId() PARA SABER SI EL PRODUCTO CON SU RESPECTIVO ID EXISTE O NO//
    checkId(producto, array){
        array.forEach(elemento => {
            if(elemento.id == producto.id){
                console.warn('EL ID DEL PRODUCTO YA EXISTE, SE LE ASIGNARA UNO NUEVO')
                return this.nuevoId(producto, array)
            } 
        });
        return producto.id
    }

    //CREO EL METODO nuevoId() LA CUAL CREA UN NUEVO ID PARA UN NUEVO PRODUCTO//
    nuevoId(producto, array){
        array.sort((a, b) => {return a - b})                    //ORDENO DE FORMA ASCENDENTE SEGUN EL ID
        producto.id = parseInt(array[array.length - 1].id) + 1  //AGARRO DEL ID MAS GRANDE, LE SUMO 1 y LO ASIGNO AL PRODUCTO
        console.log(`EL NUEVO ID DEL PRODUCTO ES : ${producto.id}`)
        return producto.id
    }
}

module.exports = Contenedor;