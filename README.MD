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


2019.01.18
audio play:
背景：Vue2.5.2单页音频播放器开发，音频地址可变，vuex共享播放数据状态。
问题：微信开发者工具是好的，真机不行。https://github.com/DDFE/DDFE-blog/issues/24
解决方案：1、vue降级2.4，打包失败。2、hack失败。3、全局缓存audio。用户行为主动直接出发audio.play()，可行。
总结：还是不要过渡封装了。

