require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')                     // direktorianeri het ashaxatelu hamar
const exphbs = require('express-handlebars')
const handlebars = require('handlebars');
const { router } = require('./routes');

const PORT = process.env.PORT;

const app = express()

handlebars.registerHelper('inc', function(value, options)
{
    return parseInt(value) + 1;
});

handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
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