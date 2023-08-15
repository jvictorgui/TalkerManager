// Middleware para validar a idade do palestrante
const validateTalkerAge = (req, res, next) => {
    const { age } = req.body; // Obtém a idade do corpo da requisição
    if (!age) {
        // Se a idade não estiver presente no corpo da requisição
        return res.status(400).json({ message: 'O campo "age" é obrigatório' }); // Retorna um erro 400 com uma mensagem de erro
    }

    if (!Number.isInteger(age) || age < 18) {
        // Se a idade não for um número inteiro ou for menor que 18
        return res.status(400).json(
            { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
        ); // Retorna um erro 400 com uma mensagem de erro
    }
    
    next(); // Se a validação for bem-sucedida, passa para o próximo middleware ou rota
};

module.exports = validateTalkerAge; // Exporta a função de validação de idade do palestrante
