//CREO UNA VARIABLE const LLAMADA path EN DONDE REQUIERO path PARA PODER UTILIZARLO//
const path = require('path')

//CREO UNA VARIABLE const LLAMADA nodeExternals EN DONDE REQUIERO webpack-node-externals PARA PODER UTILIZARLO//
const nodeExternals = require('webpack-node-externals');

//REALIZO TODAS LAS CONFIGURACIONES NECESARIAS//
module.exports = {   
    mode: 'production',                        //MODO DE TRABAJO, EN ESTE CASO 'production'
    entry: './src/server.ts',                   //PUNTO DE ENTRADA DE NUESTRO CODIGO, EN ESTE CASO './src/index.ts'
    target: 'node',                            //QUIEN EJECUTA o TRANSPILA TODO, EN ESTE CADO 'node'
    externals: [nodeExternals()],              //PERMITE EL CORRECTO FUNCIONAMIENTO CON ALGUNAS LIBRERIAS EXTERNAS
    output:{                                   //DEFINE EL PUNTO DE SALIDA DE NUESTRO CODIGO, EN ESTE CASO 'dist'
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js' 
    },
    resolve:{                                  //CONFIGURA COMO SE RESUELVEN LOS MODULOS
        extensions: ['.ts', '.js'],
    },
    module:{                                   //SIRVE PARA ACLARARLE A WebPack COMO DEBE PROCESAR LOS LOADERS QUE QUERAMOS USAR PARA UN PROYECTO
        rules:[
            {
                test: /\.tsx?/,
                use: 'ts-loader', //NECESITAMOS USAR 'ts-loader' PARA PODER TRANSPILAR
                exclude: /node_modules/ //EXCLUIMOS LA CARPETA /node_modules/
            }
        ]
    }
}

//EN RESUMEN DE TODO ESTO, EN EL webpack.config.js VAMOS A LLAMAR AL path y webpack-node-externals PARA QUE SE CONECTE A node y LE ESTAMOS DICIENDO QUE CUANDO NOSOTROS TENGAMOS NUESTRO PAQUETE DE PRODUCCION y LO EJECUTEMOS, VAYA y ENTRE A LA APLICACION MEDIANTE LA CARPERA './src/index.ts', QUE LO EJECUTE CON node y QUE CUANDO LO HAGA QUE LO RESUELVA DENTRO DEL __dirname y QUE BUSQUE LA RUTA DE SALIDA, EN ESTE CASO 'dist' y LUEGO 'dist' VA A APARECER CUANDO NOSOTROS HAGAMOS npm run build EN LA TERMINA DE LA CONSOLA//