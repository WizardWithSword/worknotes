time flies
i write more and more code
but i couldn't remember them after a while
i want give them a place to live a long time



window.addEventListener('myevent', function (event) {
  console.log(event.data)
  return true
})

var ss = document.createEvent('HTMLEvents')
ss.initEvent('myevent')
ss.data = '{"a":1}'
window.dispatchEvent(ss)

linux code:

perl -p -i.backup -e "s/http:\/\/xxx.xx.xx.xx:8888/https:\/\/api.xxx.xx/g" ./*.conf
将当前目录下的所有后缀为.conf的文件里面的内容 http://xxx.xx.xx.xx:8888 替换为 https://api.xxx.xx 同时将替换前的文件备份在当前目录下，并追加一个后缀.backup。

grep -n "keyword" *
搜索当前文件夹下所有文件中包含文本 keyword 的文件，并列出这个搜索字符所处的行