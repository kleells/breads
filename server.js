//Configuration of dotenv, express and .env
require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const mongooseURI = process.env.MONGO_URI;

//MIDDLEWARE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//MongoDB DATABASE
mongoose.connect(mongooseURI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {console.log('connected to mongo: ', mongooseURI)}
)

//route
app.get('/', (req, res) => {
    res.send('Welcome to an awesome app about Breads!')
})

//breads
const breadController = require('./controllers/breads_controller.js')
app.use('/breads', breadController)

//bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

//404 page
app.get('*', (req, res) => {
        res.send('404')
})

//listen for port number
app.listen(PORT, () => {
    console.log('nomming at port', PORT);
});
