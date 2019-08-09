const express = require('express');
const app = express();
const morgan = require('morgan');
//setings 
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/api/Transferir', require('./routes/Transferir'));
app.use('/api/EstadoCuenta', require('./routes/EstadoCuenta'));


//inica servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);

});