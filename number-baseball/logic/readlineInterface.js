const readline = require('readline');


// (readline이용해서) 콘솔에서 입출력 받게 해주는 인터페이스 생성
const readlineInterface = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});


module.exports = readlineInterface