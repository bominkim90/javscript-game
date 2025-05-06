const gameRecordsArr = require('../data/gameRecordsArr')


// 컴퓨터 랜덤 숫자 생성
function createRandomNumbers() {
  gameRecordsArr.computerNumbers.clear()
  console.log("컴퓨터가 숫자를 뽑았습니다.")
    while (gameRecordsArr.computerNumbers.size < 3) {
      let randomNumber = Math.floor( (Math.random() * 9) ) + 1
      gameRecordsArr.computerNumbers.add(randomNumber.toString())
    }
    console.log('생성된 3자리 숫자는 이렇습니다.', ...gameRecordsArr.computerNumbers)
}


module.exports = createRandomNumbers