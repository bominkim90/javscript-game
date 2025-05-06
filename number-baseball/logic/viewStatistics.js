const gameRecordsArr = require('../data/gameRecordsArr');
const printLog = require('./printLog');



// 게임 통계 확인 ('3' 입력시)
function viewStatistics()
{
  if(gameRecordsArr.length == 0) {
    console.log("저장된 게임 기록이 없습니다.")
    printLog.printMenu();
    return 
  }
  let tryCountArr = gameRecordsArr.map( value => value.시도횟수 );
  const shortestCount = [Math.max(...tryCountArr), tryCountArr.indexOf(Math.max(...tryCountArr))+1];
  const longestCount = [Math.min(...tryCountArr), tryCountArr.indexOf(Math.min(...tryCountArr))+1];
  
  let [comWins, userWins] = [0, 0];
  gameRecordsArr.forEach( value => { value.승리자 == "컴퓨터" ? comWins++ : userWins++ });

    console.log("comWins : ", comWins);
    console.log("userWins : ", userWins);
    const maxAttemptsArr = gameRecordsArr.map( value => value.최대시도횟수 );
    const [mostAttempts, leastAttempts] = [ Math.max(...maxAttemptsArr), Math.min(...maxAttemptsArr) ]
    const averageTryCount = (Math.floor( (tryCountArr.reduce( (이전값, 현재값) => {return 이전값 + 현재값}, 0) / tryCountArr.length) *10)/10)

  const text = 
  `  가장 적은 횟수: ${shortestCount[0]}회 - [${shortestCount[1]}]
  가장 많은 횟수: ${longestCount[0]}회 - [${longestCount[1]}]
  가장 많이 적용된 승리/패배 횟수: ${mostAttempts}
  가장 적게 적용된 승리/패배 횟수: ${leastAttempts}
  적용된 승리/패배 횟수 평균: ${averageTryCount}회
  컴퓨터 전적: ${comWins}승 / ${userWins}패 / ${Math.floor(comWins/(comWins+userWins) * 100)}%
  사용자 전적: ${userWins}승 / ${comWins}패 / ${Math.floor(userWins/(comWins+userWins) * 100)}%\n
  --------통계 종료-------\n
  게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 게임을 종료하려면 9을 입력하세요.`;
  console.log(text);
}


module.exports = viewStatistics;