// Função para verificar se o valor da avaliação (rate) é válido
const isRateValid = (rate) => {
  if (rate !== undefined) {
    const isValid = (rate >= 1 && rate <= 5 && Number.isInteger(rate));
    return isValid;
  }
  return false;
};

const isRateValidPatch = (rate) => 
rate !== undefined && Number.isInteger(rate) && rate >= 1 && rate <= 5;

// Middleware para validar a avaliação (rate) da palestra
const validateTalkRate = (req, res, next) => {
  const { talk } = req.body; // Obtém os dados da palestra do corpo da requisição

  if (talk.rate === undefined) {
      // Se a avaliação não estiver presente no corpo da requisição
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); // Retorna um erro 400 com uma mensagem de erro
  }

  if (!isRateValid(talk.rate)) {
      // Se a avaliação não for válida
 return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' }); // Retorna um erro 400 com uma mensagem de erro
  }

  next(); // Se a validação for bem-sucedida, passa para o próximo middleware ou rota
};

const validateRateQueryParam = (req, res, next) => {
  const { rate } = req.query;
  if (rate === undefined 
    || (Number(rate) >= 1 && Number(rate) <= 5 && Number.isInteger(Number(rate)))) {
    return next();
  } 
  
  return res.status(400).json({ 
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
};

const validateRatePatch = (req, res, next) => {
  const { rate } = req.body;

  if (rate === undefined || rate === '') {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!isRateValidPatch(rate)) {
   return res.status(400).json({
     message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = { validateTalkRate, validateRateQueryParam, validateRatePatch }; // Exporta a função de validação da avaliação (rate) da palestra
