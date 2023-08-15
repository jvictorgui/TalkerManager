// Middleware para validar o token de autorização no cabeçalho da requisição
const validateTokenHeader = (req, res, next) => {
    const { authorization } = req.headers; // Obtém o token de autorização do cabeçalho da requisição

    if (!authorization) {
        // Se o token de autorização não estiver presente no cabeçalho
        return res.status(401).json({ message: 'Token não encontrado' }); // Retorna um erro 401 com uma mensagem de erro
    }

    if (authorization.length !== 16) {
        // Se o token de autorização não tiver o comprimento esperado (16 caracteres)
        return res.status(401).json({ message: 'Token inválido' }); // Retorna um erro 401 com uma mensagem de erro
    } 

    next(); // Se a validação for bem-sucedida, passa para o próximo middleware ou rota
};

module.exports = validateTokenHeader; // Exporta a função de validação do token de autorização no cabeçalho
