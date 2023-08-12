const loginRouter = require('express').Router();

// função de geração de token aleatório 
const generateRandomToken = require('../helpers/crypto');

// middleware que valida os campos de Email e Password
const {
    validateEmailFields,
    validatePasswordsFields,
} = require('../middlewares/validateLoginFields');

loginRouter.post('/', validateEmailFields, validatePasswordsFields, (req, res) => {
    // Obtém o email e a senha do corpo da requisição
    const { email, password } = req.body;

    // Verifica se o email ou a senha estão ausentes
    if (!email || !password) {
        return res.status(401).send('email ou senha invalidos');
    }

    // Gera um token aleatório
    const token = generateRandomToken(16);

    // Retorna uma resposta de sucesso com o token e uma mensagem
    res.status(200).json({ token, message: 'Login efetuado com sucesso' });
});

module.exports = loginRouter;
