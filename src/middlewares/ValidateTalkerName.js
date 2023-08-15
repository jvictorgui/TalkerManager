// Middleware para validar o nome do palestrante
const validateTalkerName = (req, res, next) => {
    const { name } = req.body; // Obtém o nome do corpo da requisição
    if (!name) {
        // Se o nome não estiver presente no corpo da requisição
        return res.status(400).json({ message: 'O campo "name" é obrigatório' }); // Retorna um erro 400 com uma mensagem de erro
    } 

    if (name.length < 3) {
        // Se o nome tiver menos de 3 caracteres
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); // Retorna um erro 400 com uma mensagem de erro
    }
    
    next(); // Se a validação for bem-sucedida, passa para o próximo middleware ou rota
};

module.exports = validateTalkerName; // Exporta a função de validação do nome do palestrante
