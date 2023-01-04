const accesoUsuario = (req, res) => {
    const {nombreUsuario} = req.body;

    return res.redirect(`/chat?userName=${nombreUsuario}`);
};

module.exports = {accesoUsuario};