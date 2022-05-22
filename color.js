/*
 * @Author: KUAI(https://github.com/kuainx)
 * @Date: 2022-05-22 19:26:07
 * @LastEditTime: 2022-05-22 19:55:53
 * @LastEditors: KUAI
 * @Description:
 * @FilePath: \wx-js\color.js
 */

(function () {
  const win = document.getElementById('ueditor_0') ? document.getElementById('ueditor_0').contentWindow : window;
  const textList = win.document.querySelectorAll('p,span,section,strong');
  console.log('共有', textList.length, '段落(p,span,section,strong)');
  const colorSet = new Set();
  for (let i = 0; i < textList.length; i++) {
    const element = textList[i];
    colorSet.add(element.style.color);
    colorSet.add(element.style.backgroundColor);
    colorSet.add(element.style.borderColor);
  }
  console.log('共有', colorSet.size, '种颜色');
  console.log(colorSet);
  const colorJson = {};
  colorSet.forEach(value => {
    colorJson[value] = 'null';
  });
  console.log(`changeColor(${JSON.stringify(colorJson, null, 2)})`);
  win.parent.window.changeColor = win.changeColor = clr => {
    const win = document.getElementById('ueditor_0') ? document.getElementById('ueditor_0').contentWindow : window;
    const textList = win.document.querySelectorAll('p,span,section,strong');
    console.log('共有', textList.length, '段落(p,span,section,strong)');
    for (let i = 0; i < textList.length; i++) {
      const element = textList[i];
      if (clr[element.style.color] !== 'null') {
        element.style.color = clr[element.style.color];
      }
      if (clr[element.style.backgroundColor] !== 'null') {
        element.style.backgroundColor = clr[element.style.backgroundColor];
      }
      if (clr[element.style.borderColor] !== 'null') {
        element.style.borderColor = clr[element.style.borderColor];
      }
    }
  };
})();
