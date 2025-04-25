const readlineInterface = require('./readlineInterface')


// 매 단계 종료 시 => 안내 글
function printMenu() {
  console.log("\n-------------------------------");
  console.log("게임을 새로 시작하려면 [1]");
  console.log("기록을 조회하시려면 [2]");
  console.log("통계를 보려면 [3]");
  console.log("종료하시려면 [9]를 입력해주세요.");
  console.log("-------------------------------");
  readlineInterface.prompt();
}


// 단일 게임 기록 출력
function printOneGameRecord(record, index) 
{
  console.log(`--- [게임 ${index + 1}] ---`);
  console.log(`시작시간: ${record.시작시간}`);
  console.log(`종료시간: ${record.종료시간}`);
  console.log(`시도횟수: ${record.시도횟수}`);
  console.log(`걸린시간: ${record.걸린시간초}`);
  console.log(`승리자: ${record.승리자}`);
}


//스트라이크, 볼 결과 출력
function printHint(strike,ball) 
{
  console.log(`${strike} 스트라이크, ${ball} 볼 \n숫자를 입력하세요.`);
}


module.exports = {printMenu, printOneGameRecord, printHint};