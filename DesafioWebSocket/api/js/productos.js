const { promises: fs } = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(objeto){
        const productos = await this.getAll()
        const index = productos.map(element => element.id).indexOf(objeto.id)

        if(index >= 0){
            const productoViejo = productos[index]
            objeto.id = productos[index].id
            productos[index] = objeto

            try{
                await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2))
                console.log('GUARDADO CON EXITO')
                return [objeto, productoViejo]
            }catch(error){
                console.error('ERROR')
                console.error(error)
                return []
            }
        }
        else{
            console.log('NO ENCONTRADO')
            return []
        }
    }

    //GUARDA PRODUCTO//
    async guardarProducto(objeto){
        const productos = await this.getAll()
        objeto.id = parseInt(objeto.id) 
        objeto.id = this.chequearId(objeto, productos)
        objeto.precio = parseInt(objeto.precio)

        try{
            console.log(`EL SIGUIENTE ELEMENTO SERA GUARDADO: \n${JSON.stringify(objeto)}`)
            productos.push(objeto)
            await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2))
            console.log('GUARDADO CON EXITO')
            return objeto
        }catch(error){
            console.error('ERROR')
            console.error(error)
        }
    }

    //DEVUELVE PRODUCTO SEGUN SU ID//
    async getById(id){
        const productos = await this.getAll()
        if(!this.chequearArray(productos)){
            return
        }

        let producto = productos.find(element => element.id == id)
        return producto ? producto : null
    }

    //DEVUELVE TODOS LOS PRODUCTOS//
    async getAll(){
        try{
            let productos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(productos)
        }catch(error){
            console.error('ERROR')
            console.error(error)
            return []
        }
    }
    
    //BORRA PRODUCTO SEGUN SU ID//
    async borrarId(id){
        console.log(id)
        const productos = await this.getAll()
        if(!this.chequearArray(productos)){
            return
        }

        const producto = productos.find(element => element.id == id)
        console.log(producto)
        const nuevoProducto = productos.filter(element => element != producto)

        try{
            console.log(`EL SIGUIENTE ELEMENTO SERA ELIMINADO: \n${JSON.stringify(producto)}`)
            await fs.writeFile(this.ruta, JSON.stringify(nuevoProducto, null, 2))
            console.log(`CAMBIOS GUARDADOS CON EXITO`)
            return producto
        }catch(error){
            console.error('ERROR')
            console.error(error)
        }
    }
    
    //CHEQUEA ARRAY//
    chequearArray(array){
        if (array.length === 0){
            console.error('ARRAY VACIO')
            return false
        }
        return true
    }

    //CHEQUEA SEGUN ID//
    chequearId(producto, array){
        array.forEach(element => {
            if(element.id == producto.id){
                console.warn('EL ID YA EXISTE, SE LE ASIGNARA UNO NUEVO')
                return this.nuevoId(producto, array)
            } 
        });
            return producto.id
    }
    
    //GENERA UN NUEVO ID//
    nuevoId(producto, array){
        array.sort((a, b) => {return a - b})
        producto.id = parseInt(array[array.length - 1].id) + 1 
        console.log(`ESTE ES EL NUEVO ID DEL PRODUCTO: ${producto.id}`)
        return producto.id
    }
}

module.exports = Contenedor;