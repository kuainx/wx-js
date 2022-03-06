/*
 * @Author: KUAI(https://github.com/kuainx)
 * @Date: 2022-03-06 12:53:15
 * @LastEditTime: 2022-03-06 13:28:46
 * @LastEditors: KUAI
 * @Description:
 * @FilePath: \wx-js\svg.js
 */
function createSvg(src, width, height) {
  let container = document.createElement('div');
  container.innerHTML = `
  <svg space="preserve" style="display: inline-block;vertical-align: top;background-position:0% 0%;background-attachment: scroll;background-repeat: no-repeat;background-size: 100%;background-image: url(&quot;${src}&quot;);-webkit-tap-highlight-color:transparent;width: 100%" version="1.1" viewBox="0 0 ${width} ${height}" x="0px" y="0px"></svg>`;
  return container.children[0];
}
let imgList = document.querySelectorAll(".rich_pages.wxw-img");
if (imgList.length === 0) {
  imgList = document.getElementById("ueditor_0").contentWindow.document.querySelectorAll(".rich_pages.wxw-img");
}
console.log('共有', imgList.length, '图片');
let i = 1;
imgList.forEach(element => {
  let svgDom = createSvg(element.src, element.naturalWidth, element.naturalHeight);
  if (element.style.width != '') {
    svgDom.style.width = element.style.width;
  }
  if (element.style.height != '') {
    svgDom.style.width = element.style.height;
  }
  element.parentElement.insertBefore(svgDom, element);
  console.log('已完成', i, '图片复制');
  i++
});