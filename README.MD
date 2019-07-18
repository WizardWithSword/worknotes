time flies
i write more and more code
but i couldn't remember them after a while
i want give them a place to live a long time


##自定义event 通信
window.addEventListener('myevent', function (event) {
  console.log(event.data)
  return true
})
var ss = document.createEvent('HTMLEvents')
ss.initEvent('myevent')
ss.data = '{"a":1}'
window.dispatchEvent(ss)

##linux code:
perl -p -i.backup -e "s/http:\/\/xxx.xx.xx.xx:8888/https:\/\/api.xxx.xx/g" ./*.conf
将当前目录下的所有后缀为.conf的文件里面的内容 http://xxx.xx.xx.xx:8888 替换为 https://api.xxx.xx 同时将替换前的文件备份在当前目录下，并追加一个后缀.backup。

grep -n "keyword" *
搜索当前文件夹下所有文件中包含文本 keyword 的文件，并列出这个搜索字符所处的行

crontab -l 查看定时任务
crontab -e 编辑定时任务


2019.01.18
##audio play:
背景：Vue2.5.2单页音频播放器开发，音频地址可变，vuex共享播放数据状态。
问题：微信开发者工具是好的，真机不行。https://github.com/DDFE/DDFE-blog/issues/24
解决方案：1、vue降级2.4，打包失败。2、hack失败。3、全局缓存audio。用户行为主动直接出发audio.play()，可行。
总结：还是不要过渡封装了。


2019.07.03
##node mysql小程序后台emoji问题。
Q: 数据库无法正常存储emoji表情。
A: 数据库的字符集不对。不应该使用utf-8,应该使用utf8mb4。
Q:程序无法正常读取emoji表情。
A: 数据库的字符集调整，数据库默认字符集调整。表字符集调整，表默认字符集调整。列字符集调整，列默认字符集调整。
相关数据操作命令：
```
-- SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';
-- SET character_set_client      = utf8mb4;
-- SET character_set_connection  = utf8mb4;
-- SET character_set_database    = utf8mb4;
-- SET character_set_results     = utf8mb4;
-- SET character_set_server      = utf8mb4;
-- SET collation_connection      = utf8mb4_unicode_ci;
-- SET collation_database        = utf8mb4_unicode_ci;
-- SET collation_server          = utf8mb4_unicode_ci;
```

Q:本地可以正常操作emoji，远程服务器不行。
A:数据库没法儿再调整了。只能从node寻找原因。mysql链接时，调整字符集。
相关代码：
```
const mysql = require('mysql')
mysql.createPool( {
  host: '',
  user: '',
  password: '',
  database:'', 
  port: 3306,
  charset:'UTF8MB4_GENERAL_CI'
})
```
ps:虽然数据库部分设置成utf8mb4_unicode_ci，node链接时charset是utf8mb4_general_ci，但是好像用着没问题
end

2019.07.08
正则表达式回溯陷阱。
正则表达式的？贪婪匹配，在不确定的测试文本下，大量的尝试匹配会导致性能下降。匹配HTML字符串中的图片src地址： 
let reg = /<img.*?src=[\'|\"](.*?(?:[\.gif|\.png|\.jpeg|\.jpg]))[\'|\"].*?[\/]?>/ig
且 .*? 有大量的回溯


