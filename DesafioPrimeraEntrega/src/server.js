const {Router} = express;
const express = require(`express`);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

//IMPORT DE RUTAS//
const rutaProducto = require("./routers/rutaProductos");
const rutaCarrito = require("./routers/rutaCarrito");

//RUTAS//
app.use(`/api/productos`, rutaProducto);
app.use(`/api/carrito`, rutaCarrito);
app.use(express.static(`public`));

//OBJETO DE ERROR POR SI HAY UNA RUTA NO IMPLEMENTADA//
app.use((req, res, next) => {
    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` });
});

//CONFIGURANDO SERVIDOR//
const PUERTO = process.env.PUERTO || 8080;
const servidor = app.listen(PUERTO, () => console.log(`Servidor escuchandose en el puerto ${PUERTO}`));
servidor.on(`error`, err => console.log(`ERROR EN EL SERVIDOR ${err}`));