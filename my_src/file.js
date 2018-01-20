var ipc = require('electron').ipcRenderer;

// 载入
document.getElementById('loadeButton').addEventListener('click', (e) => {
    //alert('hello button!')
    //ipc.send('window-min');
    // var fs = require('fs');

    // fs.readFile('package.json','utf8',function(err,data){
    //     var content = document.getElementById('my_editdiv');
    //     content.textContent = data;
    // });
  })

// 打开画面时载入上次的临时文件。
function readTmpFile(){
  //alert('hello this is readTmpFile!');
  var fs = require('fs');
      fs.readFile('./file/text.txt','utf8',function(err,data){
        var content = document.getElementById('my_editdiv');
        content.innerHTML = data;
    });
}

function saveTmpFile(){
  var fs = require('fs');
  var data = document.getElementById('my_editdiv').innerHTML;
  fs.writeFile('./file/text.txt', data, function(err){
    if(err) throw err;
    console.log("File Saved!");
  });
}

