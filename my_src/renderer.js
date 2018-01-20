//var ipc = require('electron').ipcRenderer;

//最大化按钮模态话
var maxFlag = true;

document.getElementById('maxbt').addEventListener('click', () => {
  console.log('hello maxbt!');
  if(maxFlag){
    ipc.send('window-max');
    maxFlag = !maxFlag;
  }else{
    ipc.send('window-restore');
    maxFlag = !maxFlag;
  }

})

document.getElementById('minbt').addEventListener('click', () => {
  //console.log('hello minbt!')
  ipc.send('window-min');

})
document.getElementById('closebt').addEventListener('click', () => {
  //alert('hello closebt!')
  ipc.send('window-close');
})

// 保存tmp临时文件
ipc.on('textMsg', function(){
  //console.log('hello textMsg!');
  saveTmpFile();
})

