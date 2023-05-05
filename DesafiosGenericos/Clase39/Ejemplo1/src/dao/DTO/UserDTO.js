export default class UserDTO {

    static getTokenDTO = (user) =>{
        //SOLO DEVUELVA LO QUE INTERESA PARA UN TOKEN//
        return  {
            name:`${user.first_name} ${user.last_name}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar || 'url genérica'
        }
    }
}