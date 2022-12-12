const { promises: fs } = require('fs')

class Container{
    constructor(route){
        this.route = route
    }
    async save(mensaje){
        const mensajes = await this.getAll()
        mensajes.push(mensaje)
        try {
            await fs.writeFile(this.route, JSON.stringify(mensajes, null, 2))
            return console.log('Guardado exitoso')
        } catch (error) {
            console.error('Error de escritura')
            return console.error(error)
        }
    }
    async getAll(){
        try {
            let messages = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(messages)
        } catch (error) {
            console.error('Error de lectura.')
            console.error(error)
            return []
        }
    }
}

module.exports = Container;