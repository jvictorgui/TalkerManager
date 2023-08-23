// Middleware para validar o campo "watchedAt" da palestra
const validateTalkWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body; // Obtém a data assistida da palestra do corpo da requisição
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Expressão regular para validar o formato da data

    if (watchedAt === undefined || watchedAt === '') {
        // Se a data assistida não estiver presente ou estiver vazia no corpo da requisição
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); // Retorna um erro 400 com uma mensagem de erro
    }

    if (!dateRegex.test(watchedAt)) {
        // Se a data assistida não estiver no formato correto
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); // Retorna um erro 400 com uma mensagem de erro
    }

    next(); // Se a validação for bem-sucedida, passa para o próximo middleware ou rota
};

const validateDateQuerry = (req, res, next) => {
    if (!req.query.date) return next();
    const { date } = req.query;
  
    const regEx = /(0[1-9]|[12][0-9]|3[01])[ /.](0[1-9]|1[012])[ /.](19|20)\d\d/;
  
    if (!regEx.test(date)) {
      return res.status(400).json({
        message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  };

module.exports = { validateTalkWatchedAt, validateDateQuerry }; // Exporta a função de validação do campo "watchedAt" da palestra
