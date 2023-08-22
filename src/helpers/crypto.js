const crypto = require('crypto');

function generateRandomToken(length) {
    const numberOfBytes = Math.ceil(length / 2); // Calcula o número de bytes necessários arredondando para cima
    const randomBytes = crypto.randomBytes(numberOfBytes); // Gera bytes aleatórios
    const token = randomBytes.toString('hex').slice(0, length); // Converte os bytes em uma string hexadecimal e ajusta o tamanho do token
    return token;
    //  Antes, ultilizei diretamente a representação hexadecimal dos bytes,
    // o que resultava em tokens com o dobro do tamanho especificado.
    // Agora, cortando a string para o tamanho desejado para obter um token correto.
}
console.log(generateRandomToken(16));
module.exports = generateRandomToken;
