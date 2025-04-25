// app.js
// 각 함수 => 순차적으로 선언하는 공간


// 필요 모듈 불러오기
const { mainModule } = require('process');

const printLog = require('./logic/printLog');
const lineEventHandler = require('./logic/lineEventHandler');
const readlineInterface = require('./logic/readlineInterface');




// 처음 프로그램 입장 시
printLog.printMenu(); // 안내 콘솔로그
readlineInterface.on("line", (line) => {
  lineEventHandler.mainMenu(line);
});

