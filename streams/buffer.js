// Buffer é a representação de um espaço na memória do computador. Usado especificamente para transitar dados de uma maneira muito rápida
// Os dados armazenados no buffer são armazenados para logo serem tratados e logo depois removidos.
// Basicamente, maneira muito mais performática para ler e escrever dados na memoria do computador conversando de forma binária em baixo nível.

const buffer = Buffer.from("oi oi oi ")

console.log(buffer.toJSON());