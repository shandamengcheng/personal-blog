### SCript标签加载JS的几种方式
HTML文件中，script标签会默认阻塞浏览器的解析。那么通过添加defer, async关键字可以实现JS的下载与HTML解析并行，从而提高渲染效率。

1. defer: 并行下载JS,但是会在解析结束之后才会执行
2. async: 并行下载JS,但是下载完成之后立即执行
3. script标签的type可以是module: 
```
<script type="module">
```
默认是defer的

4. 
```
<script type="module" async>
```
类似于普通JS的async, 并行下载，下载完成之后立即执行


总体如下图：
[![XouKNn.png](https://s1.ax1x.com/2022/06/15/XouKNn.png)](https://imgtu.com/i/XouKNn)

