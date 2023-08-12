// const readFile = require('../helpers/fsFuncs');

const validateFields = async (req, res, next) => {
const { email, password } = req.body;
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /\d{6,}/;
if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
}
if (emailRegex.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
} 
if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}

if (passwordRegex.test(password) === false) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

module.exports = validateFields;