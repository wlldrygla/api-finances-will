
const usersController = function (Users) {
    const userLogin = function (req, res) {
        Users.find({ user: req.body.user }).exec(function (err, user) {
            if (err) {
                res.send('erro')
            } 
                if (user[0].password === req.body.password && user[0].user === req.body.user) {
                    res.json({ user: user[i].user })
                } else {
                    res.json('ERRO')
                }
            
        }

        )
    };

    return {
        userLogin: userLogin,
    }
};
module.exports = usersController;