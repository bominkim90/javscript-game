const readlineInterface = require('./readlineInterface');
const showGameRecords = require('./showGameRecords');
const viewStatistics = require('./viewStatistics');
const gameRecordsArr = require('../data/gameRecordsArr');
const exitGame = require('./exitGame');
const checkUserNumbers = require('./checkUserNumbers');
const startGame = require('./startGame');
const saveGameRecord = require('./saveGameRecord');
const printLog = require('./printLog')


// 매 단계 종료 시 => 콘솔입력값으로 분기처리
function mainMenu(line) {
  switch ( parseInt(line) ) {
    case 1 :
      console.log("컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요?")
      initLineListener(setMaxAttempts)
      break
    case 2 :
      if (gameRecordsArr.length == 0) {
        console.log("저장된 게임 기록이 없습니다.")
        printLog.printMenu()
        break
      }
      showGameRecords()
      initLineListener(gameDetails)
      break
    case 3 :
      viewStatistics()
      break
    case 9 :
      exitGame()
      break
  
    default:
    printLog.printMenu()
  }
}


// ("line" 이벤트 핸들러) 최대 시도 횟수 설정 : 게임 시작 시
function setMaxAttempts(line)
{
  console.log("최대 시도 횟수 : ",parseInt(line));
  if(parseInt(line) > 0) {
    gameRecordsArr.maxAttempts = parseInt(line);
    initLineListener(nowPlaying);
    startGame();
    return
  }
  else {
    console.log("최대 시도 횟수를 0이상의 숫자로 입력해주세요.");
  }
}


// ("line" 이벤트 핸들러) 콘솔로 3자리 숫자인지 체크 : 게임 진행 중
function nowPlaying(line) {
  if(line && parseInt(line) > 0 && line.length === 3) {
    if(checkUserNumbers(line)) {
      gameRecordsArr.endTime = new Date();
      saveGameRecord();
      initLineListener(mainMenu);
      printLog.printMenu();
    }
  } else {
    console.log("세자리 숫자를 입력해주세요");
  }
}


// ("line" 이벤트 핸들러) '2번'(전체 게임 조회) 누르고 -> '각 게임 번호'(상세 게임내역 조회)
function gameDetails(line) {
  const index = parseInt(line);
  if(index === 0)
  {
    initLineListener(mainMenu)
    printLog.printMenu();
    return;
  }
  if(!gameRecordsArr[index - 1]) {
    console.log("없는 게임 번호입니다. 다시 입력해주세요.");
    return;
  }
  const selectedGame = gameRecordsArr[index - 1];
  console.log(`\n[게임 ${index}] 상세 기록:`);

  selectedGame.게임내역.forEach((log, i) => {
    console.log(`입력 ${i + 1}: ${log.입력} → ${log.결과}`);
  });

  console.log("\n3개의 숫자를 모두 맞히셨습니다.")
  console.log("----------기록 종료-------------")
  console.log("\n 확인할 게임 번호를 입력하세요 (종료하려면 0) : ");
}


// ("line" 이벤트 핸들러 초기화) => 리스너 삭제 + 새 리스너 등록
function initLineListener(callback){
  readlineInterface.removeAllListeners("line");
  readlineInterface.on("line",callback);
}


module.exports = {
  "mainMenu" : mainMenu,
  "setMaxAttempts" : setMaxAttempts,
  "nowPlaying" : nowPlaying,
  "gameDetails" : gameDetails,
  "initLineListener" : initLineListener
}
