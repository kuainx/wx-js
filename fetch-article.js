const fetchArticle = async (start, end) => {
  const fetchText = async (url) => {
    let response = await fetch(url);
    if (response.status >= 200 && response.status < 300) {
      return await response.text();
    } else {
      throw new Error(response.statusText);
    }
  }

  const HTMLDecode = text => {
    const temp = document.createElement("div");
    temp.innerHTML = text;
    const output = temp.innerText || temp.textContent;
    return output;
  }

  const getPublishData = async begin => {
    const url = new URL(location.href);
    url.searchParams.set('begin', begin)
    url.searchParams.set('count', 20)
    const raw = await fetchText(url)
    const start_index = raw.indexOf('publish_page = ') + 'publish_page = '.length
    const raw_json = raw.substring(start_index, raw.indexOf(';\n', start_index))
    const publish = JSON.parse(raw_json)
    const ret = []
    for (const article of publish.publish_list) {
      ret.push(JSON.parse(HTMLDecode(article.publish_info)))
    }
    return ret
  }

  const stringifyDate = date => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  const logCsv = text => {
    let ret = ''
    for (const line of text) {
      for (const cell of line) {
        ret += cell + ','
      }
      ret += '\r\n'
    }
    console.log(ret);
  }

  const output = [['时间', '标题', '链接']]
  for (let i = 0; i < (end - start) / 20 + 1; i++) {
    const publish_list = await getPublishData(start + i * 20)
    for (const article of publish_list) {
      const time = stringifyDate(new Date(article.sent_info.time * 1000))
      for (const articleA of article.appmsg_info) {
        output.push([time, articleA.title, articleA.content_url])
      }
    }
  }
  logCsv(output)

}