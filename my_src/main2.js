const electron = require('electron')
// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 350, height: 350, 
    frame: false,
    minWidth: 350, minHeight: 350,
    alwaysOnTop:false})

  mainWindow.once('ready-to-show',()=>{
    mainWindow.show()
  })
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //设置置顶
  //mainWindow.setAlwaysOnTop(true);


  mainWindow.onload = function(){
    
  }
  //窗口完成加载时触法

  //mainWindow.loadURL("https://www.baidu.com");

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 按钮的消息响应
// 
const ipc = electron.ipcMain;
ipc.on('window-min',function(){
  mainWindow.minimize();
})
//登录窗口最大化
ipc.on('window-max',function(){
  mainWindow.maximize(); 
})
//窗口还原
ipc.on('window-restore',function(){
  mainWindow.unmaximize();  
})
ipc.on('window-close',function(){
  mainWindow.close();
})


const dialog = electron.dialog
const globalShortcut = electron.globalShortcut

app.on('ready', function () {
  globalShortcut.register('CommandOrControl+S', function () {
    mainWindow.webContents.send('textMsg');
    // dialog.showMessageBox({
    //   type: 'info',
    //   message: 'Success!',
    //   detail: 'You pressed the registered global shortcut keybinding.',
    //   buttons: ['OK']
    // })
  })
})

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})