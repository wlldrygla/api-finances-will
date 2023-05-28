var getAllUserFinances = function (req, res){
    Financasbd.find({ usuario: req.params.usuario }).exec(function (err, financas) {
        var lista = [];
        for (let i = 0; i < financas.length; i++) {
            lista.push(financas[i])
        }
        res.status(200)
        res.json({
            financa: lista
        })
    })
};
export default getAllUserFinances;