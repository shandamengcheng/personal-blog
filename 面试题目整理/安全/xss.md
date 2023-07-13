# XSS

#### 什么是XSS
XSS 攻击使攻击者能够将客户端脚本注入到其他用户查看的网页中

#### 种类 （也有分类为：传统型 => 服务端代码缺陷, DOM型 => 客户端代码）

- 非持久型（或反射型）
  - 常见于：客户端提供的数据，最常见的是http查询参数，被服务端脚本立即使用为该用户解析并展示结果页面，而没有适当的清理内容。
    - HTML清理：https://en.wikipedia.org/wiki/HTML_sanitization
  - 子类： DOM型
    - JS代码也在处理用户输入并将其显现在网页内容中，出现了反射型XSS攻击的子类，基于DOM的跨站脚本攻击。在基于 DOM 的 XSS 攻击中，恶意数据不会触及 Web 服务器。相反，它由 JavaScript 代码完全反映在客户端


- 持久型（或存储型）
  - 它发生在攻击者提供的数据被服务器保存，然后永久显示在返回给其他用户的“正常”页面上常规浏览过程，没有适当的 HTML 转义。 => 在线留言板
#### 预防
- 存储和反射型：
  - 输出编码： 当需要安全地显示与用户输入完全一致的数据时，建议使用输出编码。变量不应该被解释为代码而不是文本。
  - HTML清理（Sanitization）


> https://en.wikipedia.org/wiki/Cross-site_scripting
> https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
> https://owasp.org/www-community/attacks/xss/#stored-and-reflected-xss-attacks
> https://github.com/LyleMi/Learn-Web-Hacking/blob/master/source/index.rst