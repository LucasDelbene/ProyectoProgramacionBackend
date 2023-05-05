export const getTime = () =>{
    return{
        fechaHora: new Date().toLocaleString(),
        timestamp: Date.now(),
    };
};
    