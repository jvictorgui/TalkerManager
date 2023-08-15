const path = require('path'); // Importa o módulo 'path' para lidar com caminhos de arquivo
const fs = require('fs').promises; // Importa o módulo 'fs' para operações de arquivo assíncronas

const JSONpath = path.join(__dirname, '..', 'talker.json'); // Caminho para o arquivo JSON

// Função assíncrona que lê o conteúdo do arquivo JSON e retorna os dados como objeto
const readFile = async () => {
    const talkerData = await fs.readFile(JSONpath, 'utf-8'); // Lê o arquivo 'talker.json' como texto UTF-8
    return JSON.parse(talkerData); // Analisa o conteúdo como JSON e retorna os dados
};

// Função assíncrona que escreve um novo palestrante no arquivo JSON
const writeFile = async (newTalker) => {
    try {
      const oldData = await readFile(); // Lê os dados existentes do arquivo
      const newId = oldData[oldData.length - 1].id + 1; // Calcula o novo ID com base no último ID existente
      const newTalkerWithId = {
        id: newId,
        ...newTalker,
      };
  
      const updatedData = JSON.stringify([...oldData, newTalkerWithId], null, 2); // Adiciona o novo palestrante aos dados existentes e formata como JSON
      await fs.writeFile(JSONpath, updatedData); // Escreve os dados atualizados no arquivo JSON
      return newTalkerWithId; // Retorna o novo palestrante com o ID gerado
    } catch (error) {
      console.log(`Erro na escrita do arquivo: ${error}`); // Registra um erro no console em caso de problema na escrita
    }
  };

// Função assíncrona que busca um palestrante pelo ID no arquivo JSON
const findTalkerById = async (id) => {
    const talkerData = await readFile(); // Lê os dados dos palestrantes do arquivo
    const foundTalker = talkerData.find((talker) => talker.id === id); // Procura um palestrante pela chave ID
    return foundTalker; // Retorna o palestrante encontrado (ou undefined se não encontrado)
};

module.exports = {
    readFile,
    findTalkerById,
    writeFile,
};
