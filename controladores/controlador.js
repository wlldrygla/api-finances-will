const cors = require('cors');


var financasController = function (Financasbd, Usuarios) {
    var get = function (req, res) {
        Financasbd.find({usuario: req.params.usuario}).exec(function(err,financas){
        var lista = [];
        for( let i = 0; i < financas.length; i++){
                lista.push(financas[i])
            }
            res.status(200)
            res.json({
                financa: lista
            })         
        })
        }


    

   
    var add = function (req, res) {
        console.log(req.body.periodo)
        var meses =["", "Janeiro", "Fevereiro","Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    if(req.body.periodo ==  "periodico"){
        let mesInicio = parseInt(req.body.mesInicio)
        let mesTermino = parseInt(req.body.mesTermino)
        for(i = mesInicio; i <= mesTermino; i++){
        let lista = {
            nome:req.body.nome,
            valor:req.body.valor,
            categoria:req.body.categoria,
            situacao: req.body.situacao,
            mes:meses[i],
            subcategoria:req.body.subcategoria,
            usuario: req.body.usuario
        }
        var financaTeste = new Financasbd(lista);
        financaTeste.save(function (err) {
        if (err) {
            res.status(500);
            res.send('Erro : falha ao incluir produto...'+ err);
        }
         else {
            res.status(201);
            console.log('cadastrado')
        }
    })
    }}else if(req.body.periodo == "fixo" ){
        for(i = 1; i <= 12; i++){
            let lista = {
                nome:req.body.nome,
                valor:req.body.valor,
                categoria:req.body.categoria,
                situacao: req.body.situacao,
                mes:meses[i],
                subcategoria:req.body.subcategoria,
                usuario: req.body.usuario
            }
            var financaTeste = new Financasbd(lista);
            financaTeste.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir produto...'+ err);
            }
             else {
                if(i > 12){
                    res.status(201);
                    


                }
            }
        })
        }
    }else{
var financa = new Financasbd(req.body);
console.log('teste1')

    financa.save(function (err) {
        if (err) {
            res.status(500);
            res.send('Erro : falha ao incluir produto...'+ err);
        }
         else {
            
            res.status(201);
            res.send("ok"+ financa);                       


        }
    })
}



    };

  
    var totalCategoria = function (req, res ){
        Financasbd.find({usuario: req.params.usuario}).exec(function(err,financas){
            var total_antigo = 0;
            var total_novo = 0;
            var total = 0;
            
            for( let i = 0; i < financas.length; i++){
                
                if(financas[i].mes == req.params.mes && financas[i].categoria == req.params.categoria){
 
                    total_novo = financas[i].valor;
                    console.log(total_novo, 'VALOR', financas[i].valor)
                    total = total_antigo + total_novo;
                    console.log(total)
                    total_antigo = total;
                    console.log(total_antigo)
                    console.log('laço', i)
            

                }
                }
                res.status(200)
                res.json({
                    Total: total
                })         
            })

    }



    var getById = function (req, res) {
        Financasbd.findById(req.params.id, function (err, financas) {
            if (err) {
                res.status(404);
                res.send("erro"+err);
            }
              else {
                res.status(200);
                res.send(financas);
            }
        })
    };





    var update = function (req, res) {
        console.log(req.body.item)
        Financasbd.findByIdAndUpdate(req.params.id, req.body, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro"+err);
            }
            else {
                        res.status(200);
                        res.send("Atualizado");                       
            }
        });
    };

    var mudarParaFinalizado = function (req, res) {
        Financasbd.findByIdAndUpdate(req.params.id, {situacao: 'finalizado'}, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro"+err);
            }
            else {
                        res.status(200);
                        res.redirect("http://localhost:3000/");                       
            }
        });
    };
    var mudarParaPendente = function (req, res) {
        Financasbd.findByIdAndUpdate(req.params.id, {situacao: 'pendente'}, function (err, Financas) {
            if (err) {
                res.status(404);
                res.send("erro"+err);
            }
            else {
                        res.status(200);
                        res.send("Atualizado");                       
            }
        });
    };






    var del = function (req, res) {
        Financasbd.findById(req.params.id, function (err, financas) {
            financas.remove(function (err) {
                if (!err) {
                    res.status(204);
                    res.redirect("http://localhost:3000/");                       
                }
            });
        });
    };


    var login = function (req, res){
        Usuarios.find({usuario: req.body.usuario}).exec(function(err,usuario){

            if(err){
                console.log('erro:', err)
                res.send('erro')
            }else if(usuario.length == 0){
                res.json({erro:"Usuario Incorreto"})
            }
            
            else{
                for(let i = 0; i < usuario.length; i++){
                    if(usuario[i].senha == req.body.senha){
                        res.json({usuarioLogado:usuario[i].usuario})
                    }else{
                        res.json({erro:"Senha Incorreta"})
                    }
                }
            }
           

    })};
    return {
        add: add,
        get: get,
        getById: getById,
        update: update,
        del: del,
        totalCategoria:totalCategoria,
        login:login,
        mudarParaFinalizado:mudarParaFinalizado,
        mudarParaPendente:mudarParaPendente,
    }
};
module.exports = financasController;