const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
const cors = require('cors');

const path = require('path');

const app = express();
const rotasFinancas = require('./roteamento/rotas');

const Financasbd = require('./models/Financas');


app.use(cors())



mongoose.connect("mongodb+srv://Will:will@cluster0.pjngibn.mongodb.net/will?retryWrites=true&w=majority",{useNewUrlParser:  true, useUnifiedTopology: true}).then(function(){
    console.log('conectado com sucesso');
}).catch(function(err){
    console.log(err.message);
})
app.use(session({     secret: 'Your_Secret_Key',
    resave: true,
    saveUninitialized: true
}))
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




app.get('/api/financa/:usuario', rotasFinancas)
app.get("/api/total/:categoria/:mes/:usuario", rotasFinancas)
app.get('/api/metas/:usuario', rotasFinancas)




app.post("/api/cadastro", rotasFinancas)
app.post("/api/login", rotasFinancas)
app.post("/api/finalizar/:id", rotasFinancas)
app.post("/api/pendente/:id", rotasFinancas)
app.post("/api/metas/cadastro", rotasFinancas)



app.post("/:id", rotasFinancas)


app.get('/:id',  rotasFinancas)


app.delete('/:id',  rotasFinancas)













app.listen(process.env.PORT || 8080, ()=>{
    console.log('rodando asdasdasd');
})
