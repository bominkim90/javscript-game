//모듈 설치
//npm install linebyline

// 콘솔에서 입출력 받게 해주는 모듈 실행
const { mainModule } = require('process');
const readline = require('readline');
const inputInterface = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});

//상태 변수
let computerNumbers = [];
let tryCount = 0;  
let startTime = null;  
let gameRecords = [];  

//콘솔에 사용자 입력값 분기 처리
mainMenu();
inputInterface.on("line", firstGuide);

// (이벤트 리스너) 매 단계 종료 시 가이드
function firstGuide(line) { 
  if (line == 1) {
    initLineListener(nowPlaying)
    tryCount = 0;
    startTime = new Date();
    return startGame();
  }
  if (line == 2) {
    return showGameRecords();
  }
  if (line == 3) { // 3단계 : 게임 통계 기능 추가
    return viewStatistics();
  }
  if(line == 9) {
    return exitGame();
  }
  
  console.log("숫자 1을 눌러 게임을 시작해주세요")
}

// 콘솔창 "line" 이벤트로 등록된 리스너(콜백함수) 초기화 => 리스너 삭제 + 새 리스너 등록
function initLineListener(callback){
  inputInterface.removeAllListeners("line");
  inputInterface.on("line",callback);
}

// 매 단계 종료 시 => 안내 글
function mainMenu() {
  console.log("\n-------------------------------");
  console.log("게임을 새로 시작하려면 [1]");
  console.log("기록을 조회하시려면 [2]");
  console.log("통계를 보려면 [3]");
  console.log("종료하시려면 [9]를 입력해주세요.");
  console.log("-------------------------------");
  inputInterface.prompt();
}

// (이벤트 리스너) 콘솔로 3자리 숫자인지 체크 : 게임 진행중
function nowPlaying(line) {
  if(line && parseInt(line) > 0 && line.length === 3) {
    return checkUserNumber(line);
  } else {
    console.log("세자리 숫자를 입력해주세요");
  }
}

// 프로그램 종료 함수
function exitGame(){
    console.clear();
    console.log("프로그램을 종료하였습니다.")
    process.exit();
}

// 게임 시작(랜덤 숫자 생성 및 안내)
function startGame() {
    computerNumbers = [];
    computerRandomNumbers();
    console.log("숫자를 입력해주세요.");
}

// 컴퓨터 랜덤 숫자 생성
function computerRandomNumbers() {
  console.log("컴퓨터가 숫자를 뽑았습니다.");
    while (computerNumbers.length < 3) { 
      let randomNumber = Math.floor(Math.random() * 10);
      if (randomNumber !== 0 && randomNumber !== 10 && !computerNumbers.includes(randomNumber.toString())) {
        computerNumbers.push(randomNumber.toString());
      }
    }
    console.log('생성된 3자리 숫자는 이렇습니다.', computerNumbers);
}

// 사용자 숫자 입력 및 판별
function checkUserNumber(line) {
  tryCount++;
  let humanNumbers = line.split('');
  console.log("humanNumbers : ", humanNumbers);
  const { strike, ball } = calculateResult(humanNumbers);
  printHint(strike, ball);
  
  // 힌트 내역 저장
  if (!gameRecords.temp) gameRecords.temp = [];
  gameRecords.temp.push({
    입력 : line,
    결과 : `${strike} 스트라이크 ${ball} 볼`
  });

  if(strike >= 3) handleCorrectAnswer();
}

//사용자 입력 숫자 결과 계산
function calculateResult(humanNumbers)
{
  let [strike, ball] = [0, 0];
  computerNumbers.forEach((computerEachNumber, computerEachIndex) => {
    humanNumbers.forEach((humanEachNumber, humanEachIndex) => {
      if (computerEachNumber == humanEachNumber) {
        if (computerEachIndex == humanEachIndex) return strike++;
        else return ball++;
      }
    });
  });
  return { strike, ball };
}

//스트라이크, 볼 결과 출력
function printHint(strike,ball) 
{
  console.log(`${strike} 스트라이크, ${ball} 볼 \n숫자를 입력하세요.`);
}

//정답 시 기록 저장 및 상태 변경
function handleCorrectAnswer()
{
  const endTime = new Date();
  saveGameRecord(endTime);
  mainMenu();
}

//게임 기록 저장
function saveGameRecord(endTime) 
{
  const duration = Math.floor((endTime - startTime) / 1000);

  gameRecords.push({
    시작시간: startTime.toLocaleString(),
    종료시간: endTime.toLocaleString(),
    시도횟수: tryCount,
    걸린시간초: `${duration}초`,
    게임내역 : gameRecords.temp
  });
  gameRecords.temp = [];
  console.log(`정답입니다! ${tryCount}번 만에 맞추셨습니다.`);
  console.log(`소요 시간: ${duration}초`);
  
  initLineListener(firstGuide);
}

// 전체 게임 기록 조회
function showGameRecords() 
{
  if (gameRecords.length == 0) {
    console.log("저장된 게임 기록이 없습니다.");
    mainMenu();
    return;
  }

  console.log("게임 기록 목록 : ");
  gameRecords.forEach((record,index) => printGameRecord(record,index));
  //mainMenu();

  console.log("\n 확인할 게임 번호를 입력하세요 (종료하려면 0) : ");
  initLineListener(gameDetails);
}

// 단일 게임 기록 출력
function printGameRecord(record, index) 
{
  console.log(`--- [게임 ${index + 1}] ---`);
  console.log(`시작시간: ${record.시작시간}`);
  console.log(`종료시간: ${record.종료시간}`);
  console.log(`시도횟수: ${record.시도횟수}`);
  console.log(`걸린시간: ${record.걸린시간초}`);
}


// (이벤트 리스너) 전체 게임 기록조회에서 -> 상세 게임 기록조회 넘어옴
function gameDetails(line) {
  const index = parseInt(line);

  if(index === 0)
  {
    inputInterface.removeAllListeners("line");
    inputInterface.on("line", firstGuide);
    mainMenu();
    return;
  }

  if(!gameRecords[index - 1]) {
    console.log("잘못된 번호입니다. 다시 입력해주세요.");
    return;
  }

  const selectedGame = gameRecords[index - 1];
  console.log(`\n[게임 ${index}] 상세 기록:`);

  selectedGame.게임내역.forEach((log, i) => {
    console.log(`입력 ${i + 1}: ${log.입력} → ${log.결과}`);
  });

  console.log("\n3개의 숫자를 모두 맞히셨습니다.")
  console.log("----------기록 종료-------------")
  console.log("\n 확인할 게임 번호를 입력하세요 (종료하려면 0) : ");
}


// 게임 통계 확인 ('3' 입력시)
function viewStatistics()
{
  if(gameRecords.length == 0) return console.log("저장된 게임 기록이 없습니다.")  
  let tryCountArr = [];
  gameRecords.forEach( value => tryCountArr.push(value.시도횟수) );
  const shortest = [Math.max(...tryCountArr), tryCountArr.indexOf(Math.max(...tryCountArr))+1];
  const longest = [Math.min(...tryCountArr), tryCountArr.indexOf(Math.min(...tryCountArr))+1];
  const average = Math.floor((tryCountArr.reduce( (누적값, 현재값) => {return 누적값 + 현재값}, 0) / tryCountArr.length)*10)/10;

  const text = 
  `  가장 적은 횟수: ${shortest[0]}회 - [${shortest[1]}]
  가장 많은 횟수: ${longest[0]}회 - [${longest[1]}]
  평균 횟수: ${average}회
  --------통계 종료-------\n
  게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 게임을 종료하려면 9을 입력하세요.`;
  console.log(text);
}