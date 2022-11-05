# CSRF

### 原理
对于大多数站点，浏览器请求会自动包含与站点关联的任何凭据，例如用户的会话 cookie、IP 地址、Windows 域凭据等。因此，如果用户当前通过了站点的身份验证，站点将无法区分受害者发送的伪造请求和受害者发送的合法请求。

### 类型
- get
  - 链接或图像
- post
  - 表单提交

> https://owasp.org/www-community/attacks/csrf