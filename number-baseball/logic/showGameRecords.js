const gameRecordsArr = require('../data/gameRecordsArr');
const printLog = require('./printLog');


// 전체 게임 기록 조회
function showGameRecords() 
{
  console.log("게임 기록 목록 : ");
  gameRecordsArr.forEach((record,index) => printLog.printOneGameRecord(record,index));

  console.log("\n 확인할 게임 번호를 입력하세요 (종료하려면 0) : ");
}


module.exports = showGameRecords;