jmeter 的使用。
0 基础快速使用 jmeter 测试 stomp 协议格式的 websock 连接。
0基础快速使用jmeter测试stomp协议格式的websock请求

测试都在用的压力测试工具：jmeter。

环境搭建：
windows系统

1、jmeter下载。 官网 https://jmeter.apache.org/download_jmeter.cgi     

Apache JMeter 5.3 (Requires Java 8+)

2、jmeter运行依赖 java，下载JDK。 官网：https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

3、jmeter本身没有websocket 监听，需要下载插件。下载jmeter的插件管理插件 

   3.1、访问https://jmeter-plugins.org/get/ 获取jmeter插件管理器的jar包

           jmeter-plugins-manager-1.3.jar

   3.2、将jar包放入 jmeter的 lib/ext目录,重启jmeter

4、打开jmeter，打开 options → Plugins Manageer ， 从 Avaliable Plugins 里面选中websocket相关插件（全选吧）， 右下角确认 apply。

5、等待重启即可



正式步骤：

1、创建测试任务

2、添加线程组

3、为线程组添加各种sampler

3.1、添加结果监听

3.2、添加一个websocket连接，填写域名、路径等参数

3.3、添加一个websocket连接，使用已有连接，发送主体内容，建立链接。可以合并到第一步中。

3.4、添加一个websocket连接，使用已有连接，发送注册路径等内容，等待接收具体业务逻辑相关数据。

3.5、添加一个循环控制器（loop controller），设置无限循环，在循环控制器中，添加相应等websocket连接，等待接收服务器推送。

4、点击绿色等 Run

5、点击结果监听，查看结果。

6、调整不同参数，进行压力测试


####Apache JMeter 5.3 (Requires Java 8+)

测试地址：微信扫码，抓包

![avatar](/img/mmexport1604543203490.jpg)


####stomp协议

一般的websock，建立链接后，服务器端和客户端通信，直接通过json格式即可。

stomp仅仅是一种信息的格式规范。类似于网络数据包。

---------------------------------------------

http://sc.seedasdan.com/stock/?

1、需要微信里面拿到未解析过的code

2、拿到真实的openId

3、根据分发的token和openId，添加角色参数，换取合法的 authorization

4、将authorization附带到stomp消息中，与服务器通信

sock链接地址：
ws://sc.seedasdan.com/sec/notification/212/5gdwhpu2/websocket

["CONNECT\naccept-version:1.1,1.0\nauthorization:3413b6c0d03a4a7ba1c2fffbd0ccde8c\nheart-beat:10000,10000\n\n\u0000"]

["CONNECT\naccept-version:1.1,1.0\nauthorization:5f71d02744f4ab2c64d5b8ff\nheart-beat:10000,10000\n\n\u0000"]

session:

["SUBSCRIBE\nid:sub-0\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/kick\n\n\u0000"]

["SUBSCRIBE\nid:sub-1\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/topic/count_62\n\n\u0000"]

["SUBSCRIBE\nid:sub-2\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/topic/basicAsset_3413b6c0d03a4a7ba1c2fffbd0ccde8c\n\n\u0000"]

["SUBSCRIBE\nid:sub-3\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/basicAsset\n\n\u0000"]

["SUBSCRIBE\nid:sub-4\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/topic/news_62\n\n\u0000"]

["SUBSCRIBE\nid:sub-5\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/count\n\n\u0000"]

["SUBSCRIBE\nid:sub-6\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/news\n\n\u0000"]

["SUBSCRIBE\nid:sub-7\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/time\n\n\u0000"]

["SUBSCRIBE\nid:sub-8\nsession:session-oXIlpNuaAE2uUYOe0PkY1A\ndestination:/user/topic/stockList\n\n\u0000"]

