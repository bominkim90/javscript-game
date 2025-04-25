const gameRecordsArr = require('../data/gameRecordsArr');


//게임 기록 저장
function saveGameRecord() 
{
  const duration = Math.floor((gameRecordsArr.endTime - gameRecordsArr.startTime) / 1000);

  gameRecordsArr.push({
    시작시간: gameRecordsArr.startTime.toLocaleString(),
    종료시간: gameRecordsArr.endTime.toLocaleString(),
    시도횟수: gameRecordsArr.tryCount,
    걸린시간초: `${duration}초`,
    게임내역 : gameRecordsArr.log,
    최대시도횟수 : gameRecordsArr.maxAttempts,
    승리자 : gameRecordsArr.tryCount <= gameRecordsArr.maxAttempts ? "사용자" : "컴퓨터"
  });
  console.log(`정답입니다! ${gameRecordsArr.tryCount}번 만에 맞추셨습니다.`);
  console.log(`소요 시간: ${duration}초`);
  initOneGameRecord()
}


function initOneGameRecord() {
  gameRecordsArr.log = [];
  gameRecordsArr.maxAttempts = 0;
  gameRecordsArr.startTime = 0;
  gameRecordsArr.endTime = 0;
  gameRecordsArr.tryCount = 0;
}


module.exports = saveGameRecord