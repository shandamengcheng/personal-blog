# CORS
跨源资源共享(Cross-Origin Resource Sharing, CORS)是一种基于http头的机制，它允许服务器指明除自己之外的任何源(域、方案或端口)，浏览器应该允许从这些源加载资源。
CORS还依赖于一种机制，浏览器通过这种机制向托管跨源资源的服务器发出“预检“请求，以检查服务器是否允许实际的请求。在预检请求中，浏览器发送指示HTTP方法的报头和将在实际请求中使用的报头。

#### 可以启用CORS请求的有：
- XMLHttpRequest 和 Fetch请求
- Web Fonts (for cross-domain font usage in @font-face within css)
- WebGL纹理
- 使用drawimage（）绘制到画布的图像/视频帧
- 图像中的 CSS 形状。

### 功能概览
对于可能对服务器数据造成副作用的HTTP请求方法（特别是除了GET或具有某些MIME类型的POST之外的HTTP方法）,规范要求浏览器”预检“请求，使用OPTIONS方法从服务器请求支持的方法，然后在服务器”批准“后发送实际的请求。服务器还可以通知客户端是否应随请求发送“凭证”(如cookie和HTTP身份验证)。

> "预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。


CORS失败会导致错误，但出于安全原因，JavaScript无法获得关于错误的详细信息。代码只知道发生了一个错误。确定具体哪里出了问题的唯一方法是查看浏览器的控制台以获取详细信息。

根据请求的类型可以分为简单请求和非简单请求。简单请求不需要先进行预检请求，而非简单请求需要。


#### 简单请求
满足以下条件的请求：
- 允许的请求方法：
  - GET
  - HEAD
  - POST
- 除了被用户代理自动设置的请求头（比如, connection,use-agent）, 唯一允许手动设置的报头是Fetch规范定义为CORS安全列表中的请求头，它们是：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type: 值仅限于：application/x-www-form-urlencoded, multipart/form-data, text/plain
  - Range
- 如果请求是通过XMRHttpRequest对象发送的，没有在请求中使用的upload属性返回的对象上注册事件监听器。也就是说，给定一个XMLHttpRequest的实例xhr,没有任何代码调用xhr.upload.addEventListener()来添加一个事件监听器以监视上传。
- 请求中没有使用ReadableStream对象。

#### 请求头
> 一个 CORS请求是一个包含Origin请求头的HTTP请求。
> 一个 CORS预检请求是一个检查CORS协议是否被允许的CORS请求。它使用OPTIONS方法，并包含下面两个请求头：
> - `Access-Control-Request-Method`： 指示对同一资源可能使用的未来CORS请求的方法。
> - `Access-Control-Request-Headers`： 指示对同一资源可能使用的未来CORS请求的标题。

#### 响应头
- CORS请求：
  - `Access-Control-Allow-Origin`：必须。 通过在响应中返回' Origin '请求头的文字值(可以是' null ')或' * '，指示是否可以共享响应。
  - `Access-Control-Allow-Credentials`： 可选。 指示当请求的凭据模式为“include”时是否可以共享响应。
  - `Access-Control-Expose-Headers`：可选。通过列出报头的名称，指示可以将哪些报头作为响应的一部分公开。

> 这里要注意： 注意:当响应一个凭据请求请求时，服务器必须在Access-Control-Allow-Origin头的值中指定一个origin，而不是指定“*”通配符。

- CORS预检请求：
  - `Access-Control-Allow-Methods`： 指示响应的URL为CORS协议的目的支持哪些方法。
  - `Access-Control-Allow-Headers`: 指示响应的URL为CORS协议的目的支持哪些报头。
  - `Access-Control-Max-Age`: 表示' Access-Control-Allow-Methods '和' Access-Control-Allow-Headers '报头提供的信息可以被缓存的秒数(默认为5秒)。

> 注意：预检请求也是CORS请求的一种，所以，属于CORS请求的三个响应头也会在预检请求的响应头中出现。


#### 附带身份凭证的请求
> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82

> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
> https://fetch.spec.whatwg.org/#cors-preflight-request
> https://www.ruanyifeng.com/blog/2016/04/cors.html