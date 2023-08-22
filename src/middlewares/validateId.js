const { findTalkerById } = require('../helpers/fsFuncs');

const validateId = async (req, res, next) => {
    const { id } = req.params; // Obtém o parâmetro de ID da requisição
    try {
        const talker = await findTalkerById(parseInt(id, 10)); // Busca um palestrante pelo ID (convertendo para número inteiro)
        if (!talker) { // Se nenhum palestrante for encontrado
            return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); // Retorna um status 404 com uma mensagem de erro
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro interno do servidor' }); // Se ocorrer um erro durante o processamento, retorna um status 500 com uma mensagem de erro
    }
    next(); // Se o palestrante for encontrado, avança para a próxima etapa (próximo middleware ou rota)
};
module.exports = validateId;