const gameRecordsArr = require('../data/gameRecordsArr.js')
const createRandomNumbers = require('./createRandomNumbers.js')


// 게임 시작 (random넘버생성 / 상태변수 값 초기화)
function startGame() {
  gameRecordsArr.startTime = new Date();
  createRandomNumbers();
  console.log("숫자를 입력해주세요.");
}


module.exports = startGame