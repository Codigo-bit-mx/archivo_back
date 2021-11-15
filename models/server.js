const express        = require('express');
const cors           = require('cors');
const fileUpload     = require('express-fileupload');
const { dbconexion } = require('../database/config');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.userPath = '/api/user';
        this.filePath = '/api/file'; 
        this.conectarBD();
        this.middleware();
        this.routes();
    }

    async conectarBD() {
        await dbconexion();
    }

    middleware() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public'));
        this.app.use (fileUpload({
            useTempFiles:true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use( this.authPath, require('../routes/loginRoute'));
        this.app.use( this.userPath, require('../routes/userRoute'));
        this.app.use( this.filePath, require('../routes/fileRoute'));
    }

    listen(){
         this.app.listen( process.env.PORT, () => {
         console.log('Servidor corriendo');  
        })
    }
}

module.exports = Server;