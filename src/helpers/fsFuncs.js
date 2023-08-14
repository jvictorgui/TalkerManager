const path = require('path'); // Importa o módulo 'path' para lidar com caminhos de arquivo
const fs = require('fs').promises; // Importa o módulo 'fs' para operações de arquivo assíncronas

const JSONpath = path.join(__dirname, '..', 'talker.json');

const readFile = async () => {
    const talkerData = await fs.readFile(JSONpath, 'utf-8'); // Lê o arquivo 'talker.json' como texto UTF-8
    return JSON.parse(talkerData); // Analisa o conteúdo como JSON e retorna os dados
};

// const writeFile = async (talker) => {
//     await fs.writeFile(JSONpath, JSON.stringify(talker));
// };

const findTalkerById = async (id) => {
    const talkerData = await readFile(); // Lê os dados dos palestrantes do arquivo
    const foundTalker = talkerData.find((talker) => talker.id === id); // Procura um palestrante pela chave ID
    return foundTalker; // Retorna o palestrante encontrado (ou undefined se não encontrado)
};

module.exports = {
    readFile,
    findTalkerById,
};
