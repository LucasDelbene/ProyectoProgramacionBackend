//PROYECTO FINAL PROGRAMACION BACKEND//

//REALIZO LAS IMPORTACIONES//
import express from 'express';
const app = express();
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();

//CONFIGURACIONES//
app.use('/avatar', express.static('./public/avatar'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MIDDLEWARE DE SESSION//
import session from 'express-session';
app.use(session({
    store:MongoStore.create({
        mongoUrl:process.env.URL_MONGO,
        ttl:3600,
    }),
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:600000}
}));
app.use(passport.initialize());
app.use(passport.session());

//CONFIGURACION DE VIEWS//
app.set('views', './views');
app.set('view engine', 'ejs');

//MIDDLEWARE DE REGISTRADO//
const isLogged = ((peticion,respuesta,next)=>{
    let msgError = `PARA ACCEDER A ESTA URL DEBES INICIAR SESIÓN`
    if(peticion.user){
        next();
    }else{
        return respuesta.render('viewError', {msgError})
    }
});

//IMPORTACION DE RUTAS//
import productosRouter from './routes/productosRouter.js';
import carritoRouter from './routes/carritoRouter.js';
import {loginRouter} from './routes/userRouter.js';
import {signupRouter} from './routes/userRouter.js';
import {logoutRouter} from './routes/userRouter.js';
import {profileRouter} from './routes/userRouter.js';
import viewsRouter from './routes/generalViewsRouter.js';
import ordenesRouter from './routes/ordenesRouter.js';

//RUTAS//
app.use('/', viewsRouter);
app.use('/api/productos', isLogged, productosRouter);
app.use('/api/carrito', isLogged, carritoRouter);
app.use('/api/ordenes', isLogged, ordenesRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', isLogged, logoutRouter);
app.use('/profile', isLogged, profileRouter);

//CONEXION AL SERVIDOR//
const PUERTO = 8080;
app.listen(PUERTO, ()=>console.log(`Servidor escuchandose en http://localhost:${PUERTO}`));

