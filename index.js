require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')                     // direktorianeri het ashaxatelu hamar
const exphbs = require('express-handlebars')
const handlebars = require('handlebars');
const { router } = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express()

handlebars.registerHelper('inc', function(value, options)
{
    return parseInt(value) + 1;
});
handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else if(lvalue == rvalue) {
        return options.fn(this);
    }
});

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'              // file-i formatn a, extension name
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))         // url-ner@ kardalu hamar
app.use(express.static(path.join(__dirname, 'public')))        // public-um css

app.use('/', router);
router.use('/', (req, res) => res.render('index'));

async function start() {
    try {
        await mongoose.connect(
           process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();