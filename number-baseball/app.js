const { mainModule } = require('process');
const printLog = require('./logic/printLog');
const lineEventHandler = require('./logic/lineEventHandler');
const readlineInterface = require('./logic/readlineInterface');

// 처음 프로그램 입장 시
printLog.printMenu();

readlineInterface.on("line", (line) => {
  lineEventHandler.mainMenu(line);
});