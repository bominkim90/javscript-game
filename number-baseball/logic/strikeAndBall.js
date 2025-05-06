const gameRecordsArr = require('../data/gameRecordsArr');


//사용자 입력 숫자 결과 계산
function strikeAndBall(humanNumbers)
{
  let [strike, ball] = [0, 0];
  Array.from(gameRecordsArr.computerNumbers).forEach((computerEachNumber, computerEachIndex) => {
    humanNumbers.forEach((humanEachNumber, humanEachIndex) => {
      if (computerEachNumber == humanEachNumber) {
        if (computerEachIndex == humanEachIndex) return strike++;
        else return ball++;
      }
    });
  });
  return { strike, ball };
}



module.exports = strikeAndBall