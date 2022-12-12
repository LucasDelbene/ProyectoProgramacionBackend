const { promises: fs } = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }
    async save(mensaje){
        const mensajes = await this.getAll()
        mensajes.push(mensaje)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(mensajes, null, 2))
            return console.log('GUARDADO CON EXITO')
        } catch (error) {
            console.error('ERROR')
            return console.error(error)
        }
    }
    async getAll(){
        try {
            let todosLosMensajes = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(todosLosMensajes)
        } catch (error) {
            console.error('ERROR')
            console.error(error)
            return []
        }
    }
}

module.exports = Contenedor;