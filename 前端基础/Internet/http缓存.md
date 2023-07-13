# HTTP缓存
### 两点好处
1. 客户端和资源越近，响应越快。
2. 源服务器不用处理请求 => 减少了服务器上的负载

### 类型 => 通过Cache-control进行控制
1. 私有缓存 => 绑定到特定客户端的缓存，通常是浏览器缓存
2. 共享缓存 => 位于客户端和服务器之间。比如一些CDN,反向代理，Service Worker

### 启发式缓存
这是Cache-control被广泛采用之前出现的一种变通方法。现在基本上所有的响应都应该明确指定一个Cache-control标头。

<hr />
比如，如果返回的一个资源很久没有更新了，假设是一年，那么客户端会存储此响应（尽管缺少Max-age）并重复使用一段时间。规范建议为10%的时间（该时间为最后修改时间到目前位置的时间）

### 缓存的状态 - 新鲜/过期
http1.0中设置expires标头
- 明确的时间
- 问题
  - 时间格式可能很难解析
  - 可能通过故意修改系统时间来引发问题

=> 由此http1.1中引入了Cache-control。

如果cache-control和expires一起出现，cache-control的优先级高，expires是可以不存在的。

### reload  && force reload


> https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#types_of_caches
> https://www.jianshu.com/p/54cc04190252
> https://calendar.perfplanet.com/2016/a-tale-of-four-caches/