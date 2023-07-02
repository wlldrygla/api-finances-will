
const usersController = function (Users) {
    const userLogin = function (req, res) {
        Users.find({ usuario: req.body.user }).exec(function (err, user) {
            if (err) {
                res.send(`erro ${err}`)
            } else if (user.length === 0) {
                res.json({ erro: "Usuário Incorreto" })
            } else {
                if (user.password === req.body.password) {
                    res.json({ user: user.user })
                } else {
                    res.json({ erro: "Senha Incorreta" })
                }
            }
        })
    };

    return {
        userLogin: userLogin,
    }
};
module.exports = usersController;