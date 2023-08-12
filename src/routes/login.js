const loginRouter = require('express').Router();
const generateRandomToken = require('../helpers/crypto');

loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).send('email ou senha invalidos');
    }
    const token = generateRandomToken(16);
    res.status(200).json({ token, message: 'Login efetuado com sucesso' });
});

module.exports = loginRouter; 
