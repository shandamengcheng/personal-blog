## 什么是URL

对于超文本和HTTP, URL是Web的关键概念之一。它是浏览器用来检索网络上所有已发布资源的机制。

> 超文本： 包含指向其他文本的链接的文本。超，指的是结构而不是大小。

URL表示统一资源定位符（Uniform Resource Location）,它表示Web上给定的唯一资源的地址。理论上，每一个URL指向一个唯一的资源。这样的资源可以是一个HTML页面，一个CSS文档，一张图片等。但也存在一些例外，最常见的就是指向不再存在的或已移动的资源的URL。由于URL和该URL所代表的资源由Web服务器处理，因此它取决于Web服务器的拥有者来管理资源和其对应的URL。

### URL结构剖析
每个URL都可以在浏览器的地址栏中输入以加载其指向的资源。
一个URL由多个部分组成，这些部分有的是必要的，有的是可选的。最重要的部分如下图中的标注所示：
![](./assets/mdn-url-all.png)

> 以一个例子类比： scheme是邮政服务类型，域名(domain name)是要送到的城市，端口是邮政编码，路径(path)代表接收方所在的建筑，参数(parameters)代表额外信息，锚点代表签收邮件的实际人。

#### 1. Scheme (方案)

![](./assets/mdn-url-protocol.png)

第一部分是方案，它指明了浏览器请求资源时必须要使用的协议(一个协议是用于在计算机网络中交换或传输数据的方法集)。通常对于网页来说，协议一般是HTTP或HTTPS。但是浏览器也支持其它scheme,比如mailto: 打开一个客户端邮箱。

#### 2. Authority (权限、授权)
![](./assets/mdn-url-authority.png)
第二部分是权限部分，通过:// 与scheme分隔开。如果域名和端口号均展示的话，通过冒号(:)分隔：
1. 域(domain)表示请求的Web服务器。通常是一个域名，但也可以使用IP地址，IP地址相对于域名来说，比较难记忆。
2. 端口表示用于在web服务器上获取资源的技术上的“网关”。如果Web服务器使用HTTP协议的标准端口（HTTP: 80 , HTTPS: 442），通常可以省略。否则，它是必须的。

> 在Schema和Authority中间的分隔符是://。冒号表示两个部分之间的分隔，//表示下一个部分是Authority。一个不使用authority的URL的例子是邮件客户端(mailto:foobar)。它包含了一个scheme,但是没有authority。因此，冒号后面没有两条斜线，且它仅作为scheme和地址之间的分隔。

#### 2.1 Domain Name 域名
域名是由句点(.)分隔的三个子部分组成的：顶级域，label1, label2。
```

http://label2.label1.topleveldomain

e.g.

http://www.google.com or http://google.com (the label 2 or www is optional)

```
通常label1是与域中的内容相关的语义提示。顶级域部分是一个固定的字符集，最常见的是.com。现在还有其他的，比如.biz, .org等。
域名是从域主机狗改的，拥有域名之后，可以使用label2细分域。label2通常被归为 ***子域***。
```
http://email.google.com (goes to Gmail not google homepage)

```
上面介绍的只是较为常见的结构形式。

域的层级从右到左逐渐下降。每个label从左到右是右侧的子域。比如：
```
www.example.com

www.example.com是example.com的子域，example.com是.com的子域。
```
整个域名的长度不超过其文本表示的253个ASCII字符的总长度。

#### 2.2 hostname 主机名
主机名是具有至少一个关联IP地址的域名。比如，域名www.exampple.com 和 example.com都是主机名，但是.com却不是。然而，也有一些顶级域，尤其是国家代码顶级域，可能有一个IP地址，这样的话，它们也是主机名。

主机名对相应域名允许的字符施加限制。一个合法的主机名也是一个合法的域名，但是一个合法的域名不一定是一个合法的主机名。

#### 3. Path (路径)
![](./assets/mdn-url-path@x2.png)
Path表明了资源在服务器上的位置。在以前的时候会代表资源在服务器上的真实地址。现在，更多的是一种抽象，而没有任何的物理现实。

#### 4. Parameters参数
![](./assets/mdn-url-parameters@x2.png)
?key1=value1&key2=value2是额外提供给服务器的参数，这些参数是一组通过&分隔的key/value对。Web服务器可以在返回资源前通过传过来的参数做额外的功能。

#### 5. Anchor (锚点)
![](./assets/mdn-url-anchor@x2.png)
一个锚点就像是一个“书签”一样，用于给出浏览器指示以显示位于该“书签”的内容。比如一个HTML页面中，页面将滚动到锚点的位置，视频或音频中会跳到锚点所代表的时间。
> 注意： 锚点永远不会在请求是发送到服务器。

### 绝对URL && 相对URL
上面的展示的都是较为完整的URL,称为绝对URL。还有一个URL叫做相对URL。不同的使用场景需要的URL的部分不同。如果是在一个浏览器地址栏里面，由于没有上下文，所以需要一个完整的URL,或者叫绝对URL。除了协议（浏览器默认使用HTTP协议）或端口号（HTTP协议默认使用80端口，HTTPs默认使用443端口）外，其他的部分均是需要的。
如果一个URL用于文档内部，由于此时浏览器已经知道文档的URL，所以此时文档内的URL是有相关上下文的。那么这时候，文档内部URL缺少的部分浏览器会使用文档的URL相应的部分进行补充。我们可以通过path部分来区分绝对路径和相对路径。如果URL的path部分以/开头，那么浏览器会向浏览器的跟路径来请求资源。

绝对路径的例子：
| 绝对URL | URL |
| ---- | ---- |
| 完整的URL | https://developer.mozlla.org/en-US/docs/Learn |
| 隐藏协议 | //developer.mozilla.org/en-US/docs/Learn 这时候，浏览器会使用加载文档的协议来填充协议部分 |
| 隐藏域名 | /en-US/docs/Learn 这是在文档中最常见的绝对URL使用场景，浏览器会使用相同的协议和域名来填充。 |


相对路径的例子：
| 相对URL的场景 | URL |
| ---- | ---- |
| 子资源 | Skills/Infrastructure/Understanding_URLs 这个URL不是以/开头的，浏览器会尝试从包含该资源的子资源中查找，所以例子中的完整的uRL是https://developer.mozilla.org/en-US/docs/Learn/Skills/Infrastructure/Understanding_URLs |
| 回退到目录树 | ../CSS/display ../表示回到上一级目录中。所以这里完整的URL是https://developer.mozilla.org/en-US/docs/CSS/display |







#### 参考文献
1. [What_is_a_URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) MDN
