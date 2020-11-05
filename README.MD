time flies

i write more and more code

but i couldn't remember them after a while

i want give them a place to live a long time

## 自定义 event 通信

```
window.addEventListener('myevent', function (event) {
  console.log(event.data)
  return true
})

var ss = document.createEvent('HTMLEvents')

ss.initEvent('myevent')

ss.data = '{"a":1}'

window.dispatchEvent(ss)
```

## linux code:

perl -p -i.backup -e "s/http:\/\/xxx.xx.xx.xx:8888/https:\/\/api.xxx.xx/g" ./\*.conf

将当前目录下的所有后缀为.conf 的文件里面的内容 http://xxx.xx.xx.xx:8888 替换为 https://api.xxx.xx 同时将替换前的文件备份在当前目录下，并追加一个后缀.backup。

grep -n "keyword" \*

搜索当前文件夹下所有文件中包含文本 keyword 的文件，并列出这个搜索字符所处的行

crontab -l 查看定时任务

crontab -e 编辑定时任务

head 命令查看文件开头

tail 命令查看文件结尾

cat 查看全文件

2019.01.18

## audio play:

背景：Vue2.5.2 单页音频播放器开发，音频地址可变，vuex 共享播放数据状态。

问题：微信开发者工具是好的，真机不行。https://github.com/DDFE/DDFE-blog/issues/24

问题原因：vue 的那个版本的 nextTick 的异步 dom 更新策略有问题。没有使用更快执行的微任务队列。messageChannel 对音视频在移动端不友好。

解决方案：1、vue 降级 2.4，打包失败。2、hack 失败。3、全局缓存 audio。用户行为主动直接出发 audio.play()，可行。

总结：还是不要过渡封装了。

2019.07.03

## node mysql 小程序后台 emoji 问题。

Q: 数据库无法正常存储 emoji 表情。

A: 数据库的字符集不对。不应该使用 utf-8,应该使用 utf8mb4。

Q:程序无法正常读取 emoji 表情。

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

Q:本地可以正常操作 emoji，远程服务器不行。

A:数据库没法儿再调整了。只能从 node 寻找原因。mysql 链接时，调整字符集。

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

ps:虽然数据库部分设置成 utf8mb4_unicode_ci，node 链接时 charset 是 utf8mb4_general_ci，但是好像用着没问题

end

2019.07.08

## 正则表达式回溯陷阱。

正则表达式的？贪婪匹配，在不确定的测试文本下，大量的尝试匹配会导致性能下降。匹配 HTML 字符串中的图片 src 地址：

let reg = /<img._?src=[\'|\"](._?(?:[\.gif|\.png|\.jpeg|\.jpg]))[\'|\"].\*?[\/]?>/ig

且 .\*? 有大量的回溯

2019.07.19

1、es6 新增的正则修饰符：u 处理 Unicode 字符；y 用来正确处理匹配粘连的字符串(下一次匹配必须从上一次匹配的结束点之后的第一个字符开始匹配才行)

2、addeventListener 的第三个参数，控制了事件捕获和冒泡的过程。事件先捕获再冒泡：先 window -> div，再冒泡到 window。

2.1、bool 类型。默认 false 冒泡阶段触发。true 为捕获阶段触发。

2.2、object 类型。值默认都是 false。capture：是否捕获阶段触发。once 是否只调用一次。passive 是否永不调用 preventDefault 方法。

3、新发起的网络请求。XMLHTTPRequest、EventSource、WebSocket、Form 表单、iframe, 资源(img,js,css)

4、布局方案演进：table -> float -> flex -> grid

5、渐进式 Web 应用

2019.07.22

## 位运算

多种真假配置型数据，使用比特位来记录，省内存。

1、按位与&：AND

当两个操作数对应位数都是 1 时，则在该位返回 1，否则则在该位返回 0。

主要用于判断某一位是否是 1。

```
(64&8) !== 8 // 第3位不是1
(72&8) === 8 // 第3位是1
```

2、按位或|：OR

当两个操作数对应位数中至少有一个是 1 时，则在该位返回 1，否则则在该位返回 0。

主要用于将某一位设置成 1。

```
(64|8) === 72 // 将第三位设置成1.
```

3、按位异或^: XOR

当两个操作数对应位数中两个数中，一个为 1，一个为 0，则在该位返回 1，否则则在该位返回 0。

主要用于将某一位设置成 0。

```
(72^8) === 64 // 将第三位设置成0.
```

2019.08.02

团队代码风格统一化：husky，拒绝不一样的代码上传。

2019.08.07

## 前端主动发起网络请求

1、new XMLHttpRequest()

2、fetch API. 返回 promise 对象。

3、简单图片 get 请求

4、跨域 js 请求

5、form 表单提交

## 9 月坑

2020.09.24

1、视频直播方案安卓不支持 webRTC。

2、长链接 sockJs。

3、PC内存泄漏问题。PC 端的内存泄漏，不停创建结束动画 canvas。

4、小程序内嵌的 H5 crash 问题。原因：不停创建新的 video，监听新 dom 事件，未移除。

5、H5 中 video 层级问题：其他元素无法覆盖到 video 上， z-index 无效。安卓机。 暂停播放等平台差异化处理。 异常检测方案。

