const talkerRouter = require('express').Router();
const { readFile, findTalkerById } = require('../helpers/fsFuncs'); // Importa funções relacionadas à leitura e busca de palestrantes do arquivo JSON
const validateID = require('../middlewares/validateId'); // Importa o middleware para validar IDs de palestrantes
const validateTokenHeader = require('../middlewares/validateTokenHeader');
const validateTalkerName = require('../middlewares/ValidateTalkerName');
const validateTalkerAge = require('../middlewares/validateTalkerAge');

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
    async (req, res) => {
    const newTalker = {
        id: req.body.id, 
        name: req.body.name,
        age: req.body.age,
        talk: {
            watchedAt: req.body.talk.watchedAt,
            rate: req.body.talk.rate,
        },
        
    };
    const token = req.headers.authorization;
    res.status(201).json({ newTalker, token });
});

module.exports = talkerRouter; 
