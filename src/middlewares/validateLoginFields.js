// valida os campos de Email
const validateEmailFields = async (req, res, next) => {
    // Obtém o email do corpo da requisição
    const { email } = req.body;

    // Regex para validar o formato de email
    const emailRegex = /\S+@\S+\.\S+/;

    // Verifica se o campo "email" está ausente
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    // Verifica se o formato do email é válido usando p Regex
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

const validatePasswordsFields = async (req, res, next) => {
    const { password } = req.body;
// Regex para validar o comprimento mínimo da senha
const passwordRegex = /\d{6,}/;

// Verifica se o campo "password" está ausente
if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}

// Verifica se o comprimento da senha é válido usando o Regex
if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};
module.exports = {
    validateEmailFields,
    validatePasswordsFields,
};