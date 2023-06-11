const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
const cors = require('cors');

const app = express();
const rotasFinancas = require('./roteamento/rotas');

app.use(cors())

mongoose.connect("mongodb+srv://Will:will@cluster0.pjngibn.mongodb.net/will?retryWrites=true&w=majority",{useNewUrlParser:  true, useUnifiedTopology: true}).then(function(){
    console.log('OLHA SÓ QUEM TA ON');
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

app.get('/api/get-all-finances/:usuario', rotasFinancas)
app.get("/api/category-month-total/:categoria/:mes/:usuario", rotasFinancas)
app.get("/api/subcategory-month-total/:categoria/:mes/:usuario/:subcategoria", rotasFinancas)


app.get("/api/month-statement-total/:usuario/:mes", rotasFinancas)
app.get('/api/metas/:usuario', rotasFinancas)
app.get("/api/total-category/:usuario/:categoria", rotasFinancas)

app.post("/api/insert-finance", rotasFinancas)
app.post("/api/login", rotasFinancas)
app.post("/api/finance-pay/:id", rotasFinancas)
app.post("/api/finance-no-pay/:id", rotasFinancas)
app.post("/api/metas/cadastro", rotasFinancas)
app.post("/api/metas/finalizar/:id", rotasFinancas)
app.post("/api/metas/fazendo/:id", rotasFinancas)
app.post("/api/metas/pendente/:id", rotasFinancas)

app.post("/:id", rotasFinancas)

app.get('/:id',  rotasFinancas)

app.delete('/:id',  rotasFinancas)


app.listen(process.env.PORT || 8080, ()=>{
    console.log('ESTAMOS ONLINE POORR#');
});
