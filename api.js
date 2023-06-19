const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
const cors = require('cors');

const app = express();
const apiRoutes = require('./roteamento/rotas');

app.use(cors())

mongoose.connect("mongodb+srv://Will:will@cluster0.pjngibn.mongodb.net/will?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
    console.log('CONECTADO AO BANCO DE DADOS');
}).catch(function (err) {
    console.log(`ERROR- ${err.message}`);
})
app.use(session({
    secret: 'Your_Secret_Key',
    resave: true,
    saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/finance/get-all/:user', apiRoutes)
app.get("/finance/category-month-total/:category/:month/:user", apiRoutes)
app.get("/finance/subcategory-month-total/:category/:month/:user/:subcategory", apiRoutes)

app.get("/finance/month-statement-total/:user/:month", apiRoutes)
app.get('/task/get-all/:user', apiRoutes)
app.get("/finance/total-category/:user/:category", apiRoutes)

app.post("/finance/insert", apiRoutes)
app.post("/user/login", apiRoutes)
app.post("/finance/pay/:id", apiRoutes)
app.post("/finance/unpay/:id", apiRoutes)
app.post("/task/insert", apiRoutes)
app.post("/task/done/:id", apiRoutes)
app.post("/task/doing/:id", apiRoutes)
app.post("/task/to-do/:id", apiRoutes)

app.post("/finance/:id", apiRoutes)

app.get('/finance/:id', apiRoutes)

app.delete('/finance/:id', apiRoutes)

app.delete('/task/:id', apiRoutes)

app.listen(process.env.PORT || 8080, () => {
    console.log('SERVIDOR RODANDO');
});
