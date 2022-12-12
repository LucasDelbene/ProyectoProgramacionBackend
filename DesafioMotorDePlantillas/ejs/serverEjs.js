//SERVER EJS - PROGRAMACION BACKEND//
const express = require('express');
const app = express();
const PUERTO = 8080;
app.listen(PUERTO,() => console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));

const Contenedor = require('../api/contenedor')
const productos = new Contenedor('../api/productos.json')

//CONFIGURANDO JSON//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CONFIGURANDO PLANTILLAS//
app.set('views', './views');
app.set('view engine', 'ejs');

//CREANDO RUTAS CON GET y POST//
app.get('/', (req, res) =>{
    res.render('index', {})
});

app.get('/productos', async(req,res) =>{
    const producto = await productos.getAll();
    res.render('lista', {producto})
});

app.post('/productos', async(req,res) => {
    let producto = req.body
    await productos.save(producto);
    res.redirect('/')
});



