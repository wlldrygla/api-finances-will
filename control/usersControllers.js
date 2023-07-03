
const usersController = function (Users) {
    const userLogin = function (req, res) {
        Users.find({ user: req.body.user }).exec(function (err, user) {
            if (err) {
                res.send('erro')
            } else if (user.length === 0) {
                res.json({ erro: "Usuário Incorreto" })
            } else {
                for (let i = 0; i < user.length; i++) {
                    if (user[i].password === req.body.password) {
                        res.json({ user: user[i].user })
                    } else if( i === user.length) {
                        res.json({ erro: "Senha Incorreta" })
                    }
                }
            }
        })
    };

    return {
        userLogin: userLogin,
    }
};
module.exports = usersController;