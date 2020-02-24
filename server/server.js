const express = require('express')
// const path = require('path');
//const router = express.Router();
const cors = require('cors')


// console.log(__dirname)
const app = express()

// const pubDir = path.join(__dirname, '../public');

// app.use(express.static(pubDir))

app.use(cors());
app.options('*', cors());
app.get('/', (req, res) => {
    res.send("hello from api!");
});
app.set('port', process.env.PORT || 8080);


app.get('/user', (req, res) => {
    res.send({ "name": "user", "age": 0});
});


// app.get('/help', (req, res) => {
//     res.send(about.html)
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please specify address'
        })
    }

    res.send('Your weather')

})

app.listen(app.get('port'), () => {
    console.log('Server is up on port 8080.')
})