const getDataInicio = (req, res) => {
    const data = {
        title: "Desafio Base de Datos",
    }
    return res.render('index', data);
}

module.exports = {getDataInicio};
