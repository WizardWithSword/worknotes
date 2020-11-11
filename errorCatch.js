const cat = {}
cat.init = function() {
  if (this.inited) {
    return false
  }
  this.inited = true
  console.log('错误捕获初始化~')
  window.onerror = function(e) {
    console.warn('onerror 函数捕获内容：', e)
  }
  window.addEventListener(
    'error',
    function(err) {
      if (err.type === 'error') {
        if (err.message === 'Script error.') {
          console.warn('前端的js内容错误：', err.message)
        } else if (
          err.message &&
          err.message.indexOf('Uncaught SyntaxError:') !== -1
        ) {
          console.warn(
            'SyntaxError:前端的js文件加载解析错误，需要检查：' + err.filename,
            err.message,
            err
          )
        } else if (
          err.message &&
          err.message.indexOf('Uncaught TypeError:') !== -1
        ) {
          console.warn(
            'SyntaxError:变量或参数不是预期类型或者调用方法对象不存在。一般是接口结构变动或js封装异常',
            err.message
          )
        } else if (err.target && err.target.tagName === 'IMG') {
          console.log('图片资源加载错误, 异常地址是：', err.target.src)
        } else {
          console.warn('其他的 my addeventListener error', err)
        }
      }
    },
    true
  )

  window.addEventListener('unhandledrejection', function(event) {
    console.log('my unhandledrejection:', event)
    const reason = event.reason
    switch (reason.name) {
      case 'TypeError':
        console.warn(
          '变量或参数不是预期类型错误（接口字段和js使用对不上）:',
          reason.message
        )
        // event.preventDefault()
        break
      case 'Error':
        if (reason.response && reason.response.status !== 200) {
          console.warn(
            '请求的http状态不正常:',
            reason.response.status,
            reason.config.url
          )
          event.preventDefault()
        }
        break
      default:
        break
    }
  })
}
cat.errQueue = []
cat.upload = function() {}
cat.init()
module.exports = { cat }
