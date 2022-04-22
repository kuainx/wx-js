/*
 * @Author: KUAI(https://github.com/kuainx)
 * @Date: 2022-03-10 21:15:59
 * @LastEditTime: 2022-03-10 21:38:14
 * @LastEditors: KUAI
 * @Description:
 * @FilePath: \wx-js\line-height.js
 */

(function () {
  const win = document.getElementById("ueditor_0") ? document.getElementById("ueditor_0").contentWindow : window;
  const pList = win.document.getElementsByTagName("p");
  console.log("共有", pList.length, "段落(p)");
  for (let i = 0; i < pList.length; i++) {
    const element = pList[i];
    if (element.style.lineHeight == '5em') {
      element.style.lineHeight = '2.2em'
      console.log("已修改第", i + 1, "段落");
    }
  }
  const sectionList = win.document.getElementsByTagName("section");
  console.log("共有", sectionList.length, "段落(section)");
  for (let i = 0; i < sectionList.length; i++) {
    const element = sectionList[i];
    if (element.style.lineHeight == '5em') {
      element.style.lineHeight = '2.2em'
      console.log("已修改第", i + 1, "段落");
    }
  }
})();