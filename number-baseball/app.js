    
/* 초기값 세팅 */

// 콘솔에서 값 받을 수 있게 해주는 모듈 불러오기
const readline = require('readline');
// 모듈 실행 => 콘솔에서 값을 입력 받아서 서버내에서 처리할 수 있게 해줌
const inputInterface = readline.createInterface({ 
  input: process.stdin, // 표준 입력 스트림
  output: process.stdout // 표준 출력 스트림
});

console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
let computerNumbers = [];
let nowPlaying = false; // (게임중 판별 위해) 숫자 1은 게임 진행중엔 못받게 하기 위해
let totalRecords = [];
let oneGameRecord = {
  totalTry : 0,
  startTime : "",
  endTime : "",
  "게임내역" : []
};
let viewingRecord = false; // (기록 조회중 판별 위해) 기록 조회중엔 기록조회를 위한 입력값 처리

/*// 초기값 세팅 */




// 콘솔 입력값 받기
inputInterface.on("line", (number) => {
  if(viewingRecord){
    if(number.length == 1){
      if(number == 0){ // 기록 종료
        viewingRecord = false;
        console.log("------- 기록 종료 -------\n");
        console.log("게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9를 입력해주세요.");
        return;
      }
      if(totalRecords[parseInt(number)-1]){
        // 게임 기록 조회
        console.log(totalRecords[parseInt(number)-1]);
        console.log("확인할 게임 번호를 입력하세요 (종료하려면 0을 입력)");
      }
      else {
        console.log("확인할 게임 번호를 정확히 입력하세요");
      }
    }
    else {
      console.log("확인할 게임 번호를 정확히 입력하세요");
    }
    return;
  }
  if(number == 9) {
    return exitGame();
  }
  if(number == 2) {
    viewingRecord = true;
    return viewRecord();
  }

  if(nowPlaying){ // 게임중 O => (게임 진행중이냐 or 한판 종료된 시점이냐)
    if(oneGameRecord.endTime){ // 이건 한판 종료된 시점 && 재시작하겠다 하면
      if(number == 1) restartGame();
      else console.log("게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9를 입력하세요.");
    } 
    else { // 게임 계속 진행중
      if(number && parseInt(number) > 0 && number.length === 3) {
        return checkNumber(number);
      } 
      else {
        console.log("세자리 숫자를 입력해주세요");
      }
    }
  } 
  else { // 게임중 X => 숫자1만 받을 수 있도록 체크
    if(number == 1) {
      return startGame();
    } 
    else {
      console.log("숫자 1을 눌러 게임을 시작해주세요")
    }
  }
});



/************************************************************************/

// 프로그램 완전 종료
function exitGame(){
  console.clear();
  console.log("프로그램을 종료하였습니다.")
  process.exit();
}


// 게임 다시 시작 시 => 컴퓨터숫자, oneGameRecord 초기화
function restartGame(){
  oneGameRecord = { // oneGame 데이터 초기화
    totalTry : 0,
    startTime : "",
    endTime : "",
    "게임내역" : []
  };
  
  startGame();
}

// 게임 시작 (= 중복되지 않는 랜덤숫자 3개 뽑기)
function startGame(){
  computerNumbers = []; // 랜덤숫자 초기화
  oneGameRecord.startTime = new Date();

  console.log("컴퓨터가 숫자를 뽑았습니다.");
  while(computerNumbers.length < 3){
    let randomNumber = Math.floor(Math.random()*10);
    if( randomNumber !== 0 && randomNumber !== 10 && !computerNumbers.includes(''+randomNumber+'')) {
      computerNumbers.push(''+randomNumber+'');
    }
  }
  console.log('생성된 3자리 숫자는 이렇습니다.', computerNumbers);
  computerNumbers.forEach( (value, index) => console.log(value) );
  console.log("숫자를 입력해주세요.");
  nowPlaying = true;
}


// (게임시작 후) 사용자숫자 검사
function checkNumber(line){
  oneGameRecord.totalTry++;

  let humanNumbers = line.split('');
  console.log("humanNumbers : ", humanNumbers);
  let [strike, ball] = [0, 0];
  console.log("computerNumbers : ",computerNumbers);
  computerNumbers.forEach( (computerEachNumber, computerEachIndex) => {
    humanNumbers.forEach ( (humanEachNumber, humanEachIndex) => {
      if(computerEachNumber == humanEachNumber){
        if(computerEachIndex == humanEachIndex) {return strike++}
        else {return ball++}
      }
    });
  });
  console.log(`${strike} 스트라이크, ${ball} 볼 \n숫자를 입력하세요.`);
  oneGameRecord["게임내역"].push(`플레이어가 입력한 숫자 : ${line}, 컴퓨터 응답 : ${strike} 스트라이크, ${ball} 볼`);
  
  if(strike >= 3) {
    saveRecord(oneGameRecord); // 게임 한판 종료 => 기록저장
  }
}


// 게임 기록 저장
// 1.게임시작시간 2.게임종료시간 3.총시도횟수 4.게임진행내역(사용자 입력 숫자와 컴퓨터의 피드백 내용)
function saveRecord(oneGameRecord){
  oneGameRecord.endTime = new Date();
  totalRecords.push(oneGameRecord);
  computerNumbers = [];
  console.log(oneGameRecord);
  console.log("게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9를 입력하세요.");
  // 새로운 게임 시작하기
  // 모든걸 다 리셋이 아니라,,
  // 리셋해야할 것 =>  컴퓨터숫자, oneGameRecord
}


// 게임 기록 조회
function viewRecord(){
  console.log(totalRecords);
  console.log("확인할 게임 번호를 입력하세요 (종료하려면 0을 입력)");
}