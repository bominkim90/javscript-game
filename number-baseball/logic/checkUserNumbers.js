const gameRecordsArr = require('../data/gameRecordsArr')
const strikeAndBall = require('./strikeAndBall')
const printLog = require('./printLog')



// 사용자 숫자 입력 및 판별
function checkUserNumbers(line) 
{
  gameRecordsArr.tryCount = gameRecordsArr.tryCount + 1;
  let humanNumbers = line.split('');
  console.log("humanNumbers : ", humanNumbers);
  const { strike, ball } = strikeAndBall(humanNumbers);
  printLog.printHint(strike, ball);
  
  // 힌트 내역 저장
  if (!gameRecordsArr.log) gameRecordsArr.log = [];
  gameRecordsArr.log.push({
    입력 : line,
    결과 : `${strike} 스트라이크 ${ball} 볼`
  });

  return strike >= 3;
}


module.exports = checkUserNumbers