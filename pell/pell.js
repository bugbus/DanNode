(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(
  this,//window对象
  (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var actions = {
  //加粗
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: function result() {
      return exec('bold');
    }
  },
  //斜体字
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: function result() {
      return exec('italic');
    }
  },
  //下划线
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: function result() {
      return exec('underline');
    }
  },
  //删除线
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: function result() {
      return exec('strikeThrough');
    }
  },
  //标题1号字
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec('formatBlock', '<H1>');
    }
  },
  //标题2号字
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec('formatBlock', '<H2>');
    }
  },
  // 分段
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec('formatBlock', '<P>');
    }
  },
  // 引用
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec('formatBlock', '<BLOCKQUOTE>');
    }
  },
  // 顺序列
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  // 无序列
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  //添加一个块标签
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec('formatBlock', '<PRE>');
    }
  },
  //加一航线
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  },
  close:{
    icon:'<b>H<sub>X</sub></b>',
    title:'Close',
    result: function result(){
      var url = window.prompt("close");
      console.log("colse");
    }
  },
  bianji:{
    icon:'bian',
    title:'Bian',
    result:function result(){
      return exec('2D-Position');
      //document.execCommand("2D-Position","false","true");
    }
  },
  nobianji:{
    icon:'Nobian',
    title:'noBian',
    result:function result(){
      return exec('AbsolutePosition','true');
      //document.execCommand("2D-Position","false","true");
    }
  },
  addButton:{
    icon: 'BUT',
    title: 'But',
    result: function result(){
      return exec('InsertButton');
    }
  }

};

var classes = {
  titleBar: 'titleBar',
  ipcBar: 'ipcBar',
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  ipcButton: 'ipcButton',
  content: 'pell-content'
};

var exec = function exec(command) {

  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  document.execCommand(command, false, value);
  return;

 };

var preventTab = function preventTab(event) {
  if (event.which === 9) event.preventDefault();
};

var init = function init(settings) {

  settings.actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return actions[action];else if (actions[action.name]) return _extends({}, actions[action.name], action);
    return action;
  }) : Object.keys(actions).map(function (action) {
    return actions[action];
  });

  settings.classes = _extends({}, classes, settings.classes);

  // title部div。内部放入actionbar 和menuBar
  var titleBar = document.createElement('div');
  titleBar.className = settings.classes.titleBar;
  settings.element.appendChild(titleBar);

  //系统menubar，放到右边
  var ipcBar = document.createElement('div');
  ipcBar.className = settings.classes.ipcBar;
  titleBar.appendChild(ipcBar);

  //关闭按钮
  var close = document.createElement('button');
  close.className = settings.classes.ipcButton;
  close.id = 'closebt';
  close.type='button';
  close.innerHTML='X';
  ipcBar.appendChild(close);

  // 最小化
  var min = document.createElement('button');
  min.className = settings.classes.ipcButton;
  min.id = 'minbt';
  min.innerHTML='—';
  ipcBar.appendChild(min);

  // 最大化
  var max = document.createElement('button');
  max.className = settings.classes.ipcButton;
  max.id = 'maxbt';
  max.innerHTML='❑';
  ipcBar.appendChild(max);
  
  //actionbar，放在左边。
  var actionbar = document.createElement('div');
  actionbar.className = settings.classes.actionbar;
  //settings.element.appendChild(actionbar);
  titleBar.appendChild(actionbar);

  var editDiv = document.createElement('div');
  editDiv.id = 'my_editdiv';
  settings.element.content = editDiv;
  settings.element.content.contentEditable = true;
  settings.element.content.className = settings.classes.content;
  settings.element.content.oninput = function (event) {
    //return settings.onChange(event.target.innerHTML);
  };
  settings.element.content.onkeydown = preventTab;
  settings.element.appendChild(settings.element.content);

  settings.actions.forEach(function (action) {
    var button = document.createElement('button');
    button.className = settings.classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.onclick = action.result;
    actionbar.appendChild(button);
  });

  // 读入临时文件
  readTmpFile();
  
  if (settings.styleWithCSS) exec('styleWithCSS');

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
