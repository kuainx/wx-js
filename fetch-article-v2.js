let fetchArticle = async (start, end) => {
  const fetchText = async url => {
    let response = await fetch(url);
    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  };

  const exportCsv = function (list) {
    const newList = list.map(res => res.join(','));
    const data = newList.join(',\n');
    const blob = new Blob(['\ufeff' + data], { type: 'text/csv,charset=UTF-8' });
    const csvUrl = URL.createObjectURL(blob); // 参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
    let link = document.createElement('a');
    link.download = `details_${new Date().getTime()}.csv`; //文件名
    link.href = csvUrl;
    link.click();
  };

  const getPublishData = async begin => {
    const url = new URL(location.href);
    url.searchParams.set('begin', begin);
    url.searchParams.set('count', 20);
    const raw = await fetchText(url);
    const publish = JSON.parse(raw.publish_page);
    const ret = [];
    for (const article of publish.publish_list) {
      ret.push(JSON.parse(article.publish_info));
    }
    return ret;
  };

  const stringifyDate = date => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  };

  const output = [['时间', '标题', '链接']];
  for (let i = 0; i < (end - start) / 20 + 1; i++) {
    const publish_list = await getPublishData(start + i * 20);
    console.log('导出第', i, '页');
    for (const article of publish_list) {
      if (article.type !== 9) {
        console.warn(article);
        continue;
      }
      const time = stringifyDate(new Date(article.sent_info.time * 1000));
      for (const articleA of article.appmsgex) {
        output.push([time, articleA.title, articleA.link]);
      }
    }
  }
  exportCsv(output);
};
