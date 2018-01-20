
//控制应用生命周期的模块
const electron = require('electron');

var app = electron.app;

const dialog = electron.dialog
const globalShortcut = electron.globalShortcut

//创建原生浏览器窗口
var BrowsetWindow = require('browser-window');

//保持一个对于window对象的全局模块
//不然，当JavaScript被GC，window会自动关闭
var mainWindow = null;

//当所有窗口被关闭了，推出
app.on('window-all-closed', function(){
    //在osx上，CMD + Q之前， 应用会保持活动状态
    if(process.platfrom != 'darwin'){
        app.quit();
    }
});

//当Electron完成了初始化并且准备创建浏览器窗口的时候
//这个方法就会被调用
app.on('ready', function(){
    //create a Browset Window
    mainWindow = new BrowsetWindow({width: 200, height: 200});

    //laod in index.html
    mainWindow.loadURL('file://'+ __dirname + '/index.html');

    //open de develop tool
    mainWindow.openDevTool();

    globalShortcut.register('CommandOrControl+Alt+K', function () {
        dialog.showMessageBox({
          type: 'info',
          message: 'Success!',
          detail: 'You pressed the registered global shortcut keybinding.',
          buttons: ['OK']
        });
    });

    //Emitted when the window is closed
    mainWindow.on('closed', function(){
        //dereference the window object, usually you would store window
        //in an array if you app supports multi windows,this is the time
        //when you shuold delete the corresponding element.

        //⬆️ 取消引动窗口对象，如果你的应用支持多窗口
        //通常会把多个window对象放在一个数组中，
        //但这次不是。
        mainWindow = null;
    });


});

