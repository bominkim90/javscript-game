const gameRecordsArr = require('../data/gameRecordsArr');


// 컴퓨터 랜덤 숫자 생성
function createRandomNumbers() {
  gameRecordsArr.computerNumbers = [];
  console.log("컴퓨터가 숫자를 뽑았습니다.");
    while (gameRecordsArr.computerNumbers.length < 3) { 
      let randomNumber = Math.floor(Math.random() * 10);
      if (randomNumber !== 0 && randomNumber !== 10 
        && !gameRecordsArr.computerNumbers.includes(randomNumber.toString())) {
          gameRecordsArr.computerNumbers.push(randomNumber.toString());
      }
    }
    console.log('생성된 3자리 숫자는 이렇습니다.', gameRecordsArr.computerNumbers);
}

module.exports = createRandomNumbers;