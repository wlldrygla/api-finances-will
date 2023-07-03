
const usersController = function (Users) {
    const userLogin = function (req, res) {
        Users.find({ user: req.body.user }).exec(function (err, user) {
            if(err){
                res.send(err)
            }
            if( user.password === req.body.password && user.user === req.body.user){
                res.json({ user: user[i].user })
            }else{
                res.send('erro')
            }
            // if (err) {
            //     res.send('erro')
            // } else if (user.length === 0) {
            //     res.json({ erro: "Usuário Incorreto" })
            // } else {
            //     for (let i = 0; i < 3; i++) {
            //         if (i > user.length) {
            //             res.json({ erro: "Senha Incorreta" })
            //         } else if (user[i].password ? user.password === req.body.password : undefined) {
            //             res.json({ user: user[i].user })
            //         }
            //     }
            // }
        })
    };

    return {
        userLogin: userLogin,
    }
};
module.exports = usersController;