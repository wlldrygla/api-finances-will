
const usersController = function (Users) {
    const userLogin = function (req, res) {
        Users.find({ user: req.body.user }).exec(function (err, user) {
            console.log(user[i].password)
            if (err) {
                res.send(`erro ${err}`)
                console.log('1')
            } else if (user.length === 0) {
                res.json({ erro: "Usuário Incorreto" })
                console.log('2')
            } else {
                if (user.password === req.body.password) {
                    res.json({ user: user.user })
                    console.log('3')
                } else {
                    res.json({ erro: "Senha Incorreta" })
                    console.log('4')
                    console.log('user.password', user.password)
                    console.log('req.body.password', req.body.password)

                }
            }
        })
    };

    return {
        userLogin: userLogin,
    }
};
module.exports = usersController;