const express = require('express')
const morgan = require('morgan')
const path = require('path')
const authRouter = require('./routes/authRouter')

//Routes
const defaultRout = require("./routes")
const adminRout = require("./routes/admin")
module.exports = class Applicaction {
    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', '.pug');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use("/auth", authRouter)
        this.app.use('/', defaultRout);
        this.app.use('/admin', adminRout);
        this.app.use(express.static(path.join(__dirname, 'public')));
      this.app.use(express.static(path.join(__dirname, 'uploads')));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
            return;
        });
    }
}