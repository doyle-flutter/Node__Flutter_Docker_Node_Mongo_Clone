const express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 80,
    http = require('http').Server(app),
    io = require('socket.io')(http),
    _v = http.listen(port, _ => console.log(`Start : ${port}`)),
    cors = require('cors'),
    TestModel = require('./config/mongoTestSchema.js'),
    logger = require('morgan'),
    todoRouter = require('./routers/todo.js');

app.use(logger('dev'));
app.use(cors());
app.disable('x-powered-by'); 
app.use((req,res,next) => {
    if(req.headers['key'] != "flutter") return res.json([]);
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));
app.use(express.static(path.join(__dirname,"/assets"),  { etag: false } ));

app.set('io', io);
io.on('connection', socket => socket.on("events", data => console.log(`Socket -on:Events = ${data}`)));

app.use('*', (req,res,next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");   
    res.header("Expires", 0);
    next();
});
app.use('/todo', todoRouter);
app.get('/', (req,res) => res.json(''));
app.get('/socket/test', (req,res) => res.sendFile(path.join(__dirname, "./socket_test.html")));
app.get('/m', async (req,res) => await TestModel.findAll()
    .then(data => res.json(data))
    .catch(e => res.json(['err'])));
app.use('*',(req,res, next) => res.json("404 ! Not Found !"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});