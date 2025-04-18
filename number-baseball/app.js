// 기본 한 줄 입력받기
// inputInterface.on("line", (line) => {
//   // 한 줄씩 입력받은 후 실행할 코드
//   console.log(line); // 입력된 값은 line에 저장된다.
//   inputInterface.close(); // 필수!! close가 없으면 입력을 무한히 받는다.
//   // inputInterface.close()가 호출되면 inputInterface.on("close", 콜백함수) 가 실행됨
// });

// inputInterface.on('close', () => {
//   // 입력이 끝난 후 실행할 코드
//   console.log("프로그램 종료")
//   process.exit();
// })


    
// 콘솔에서 값 받을 수 있게 해주는 모듈 불러오기
const readline = require('readline');
const inputInterface = readline.createInterface({ 
  input: process.stdin, // 표준 입력 스트림
  output: process.stdout // 표준 출력 스트림
});
// 콘솔에 입력값을 받아서 내 서버에서 값을 처리할 수 있게 해줌
// 이때부터 사용자 콘솔 입력을 기다림


// { 1 입력 => 게임 시작 + 3자리 랜덤숫자 생성 / 9 입력 => app 완전 종료 }
console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
let computerNumbers = [];
let nowPlaying = false; // 숫자 1은 게임 진행중엔 못받게 하기 위해


// 콘솔 입력값 받기
inputInterface.on("line", (line) => {
  if(line == 9) {
    return endGame();
  }

  if(nowPlaying){ // 게임 진행중이라면 => 3자리 숫자만 받아서 hint 제공함
    if(line && parseInt(line) > 0 && line.length === 3) {
      return giveHint(line);
    } else {
      console.log("세자리 숫자를 입력해주세요");
    }
  } else { // 게임중이 아닐때만 => 숫자1을 받을 수 있음
    if(line == 1) {
      return startGame();
    } else {
      console.log("숫자 1을 눌러 게임을 시작해주세요")
    }
  }
});


/************************************************************************/
// 기능별 함수




// 게임 시작 (= 중복되지 않는 랜덤숫자 3개 뽑기)
function startGame(){
  computerNumbers = [];
  console.log("컴퓨터가 숫자를 뽑았습니다.");
  
  while(computerNumbers.length < 3){ // 3 length 되면 종료
    let randomNumber = Math.floor(Math.random()*10);
    if( randomNumber !== 0 && randomNumber !== 10 && !computerNumbers.includes(randomNumber)) {
      computerNumbers.push(''+randomNumber+'');
    }
  }

  console.log('생성된 3자리 숫자는 이렇습니다.', computerNumbers);
  computerNumbers.forEach( (value, index) => console.log(value) ); // 이건 테스터 확인용

  console.log("숫자를 입력해주세요.");
  nowPlaying = true;
}


// 게임 종료
function endGame(){
  console.log("프로그램을 종료하였습니다.")
  nowPlaying = false;
  process.exit();
}


/*
  힌트 제공
- 스트라이크 : 입력한 숫자가 컴퓨터의 숫자와 *위치까지 동일*한 경우
- 볼 : 입력한 숫자가 컴퓨터의 숫자에 포함되지만 *위치가 다를 경우*
- 낫싱 : 입력한 숫자가 *컴퓨터의 숫자에 전혀 포함되지 않을 경우*

  *** computerNumbers객체, humanNumber객체의 이중반복문을 돌린다 ***
  * strike랑 ball 추가 방법
  예) <computerNumbers 객체 '첫번째' 값> 기준으로 <humanNumber 객체> 반복문이 돌아갈때
  => value값이 같은경우
    서로의 index를 비교 => 같으면 strike++ / 다르면 ball++
*/
function giveHint(line){
  let humanNumbers = line.split(''); // 사람이 넣는 숫자는 중복을 허용해야 하기에(111 이런식) => Array 자료형 
  // (key,value)를 값으로 가지는 자료형은 key값에 원시데이터를 넣을경우, 중복되는 key값을 가질수 없게한다
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

  // strike가 3이 되면 => 게임 종료
  if(strike >= 3) endGame()
}
