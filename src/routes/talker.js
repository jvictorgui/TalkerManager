const talkerRouter = require('express').Router();
const { readFile,
     findTalkerById,
      writeFile,
      updateTalker,
      deleteTalkerById,
      findTalkerByName,
     } = require('../helpers/fsFuncs'); // Importa funções relacionadas à leitura e busca de palestrantes do arquivo JSON
const validateID = require('../middlewares/validateId'); // Importa o middleware para validar IDs de palestrantes
const validateTokenHeader = require('../middlewares/validateTokenHeader');
const validateTalkerName = require('../middlewares/ValidateTalkerName');
const validateTalkerAge = require('../middlewares/validateTalkerAge');
const validateTalkWatchedAt = require('../middlewares/validateTalkWatchedAt');
const { validateTalkRate, validateRateQueryParam } = require('../middlewares/ValidateTalkRate');
const validateTalkField = require('../middlewares/ValidateTalkField');

// Rota para obter todos os palestrantes
talkerRouter.get('/', async (req, res) => {
    try {
        const talkerData = await readFile(); // Lê os dados dos palestrantes do arquivo
        if (!talkerData) {
            return res.status(200).send([]); // Retorna um array vazio se não houver dados
        }
        res.status(200).send(talkerData); // Retorna os dados dos palestrantes como resposta
    } catch (err) {
        res.status(400).send({ message: err.message }); // Retorna um status 400 se ocorrer um erro
    }
});

talkerRouter.get('/search',
    validateTokenHeader,
    validateRateQueryParam,
    async (req, res) => {
        try {
            const { q, rate } = req.query;
            
            const filteredTalkers = await findTalkerByName(q, rate);
            
            res.status(200).json(filteredTalkers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

// Rota para obter um palestrante por ID
talkerRouter.get('/:id', validateID, async (req, res) => {
    try {
        const talkerId = parseInt(req.params.id, 10); // Pega o ID do parâmetro da URL e converte para um número inteiro
        const talker = await findTalkerById(talkerId); // Busca o palestrante pelo ID
        res.status(200).json(talker); // Retorna os dados do palestrante encontrado como resposta JSON
    } catch (err) {
        res.status(404).send({ message: 'Pessoa palestrante não encontrada' }); // Retorna um status 404 se o palestrante não for encontrado
    }
});

talkerRouter.post('/',
    validateTokenHeader,
    validateTalkerName,
    validateTalkerAge,
    validateTalkField,
    validateTalkWatchedAt,
    validateTalkRate,
    async (req, res) => {
        try {
            const { name, age, talk } = req.body; // Destruturação dos campos do corpo da solicitação
            const newTalker = await writeFile({ name, age, talk }); // Chama a função writeFile para criar o novo palestrante
            res.status(201).json(newTalker); // Responde com o status 201 (Created) e o novo palestrante criado
        } catch (err) {
            res.status(500).json({ message: err.message }); // Responde com o status 500 (Internal Server Error) e uma mensagem de erro
        }
    });

    talkerRouter.put('/:id',
    validateTokenHeader,
    validateID,
    validateTalkerName,
    validateTalkerAge,
    validateTalkField,
    validateTalkWatchedAt,
    validateTalkRate,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { name, age, talk } = req.body;
            const updatedTalker = await updateTalker(Number(id), { name, age, talk });
      res.status(200).json(updatedTalker);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    talkerRouter.delete('/:id', validateTokenHeader, async (req, res) => {
        try {
            const talkerId = parseInt(req.params.id, 10); // Parse the talker ID from the URL parameter
            const talkerToDelete = await findTalkerById(talkerId); // Find the talker by ID
    
            if (!talkerToDelete) {
                return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
            }
    
            await deleteTalkerById(talkerId); // Delete the talker based on the ID
            res.status(204).json({ message: 'Pessoa palestrante excluída com sucesso' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

module.exports = talkerRouter; 
