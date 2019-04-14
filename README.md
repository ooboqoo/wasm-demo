# wasm-demo

参考教程 https://medium.freecodecamp.org/get-started-with-webassembly-using-only-14-lines-of-javascript


## 文件介绍

核心文件就 `src/index.html` `src/main.js` `wasm/square.wasm` 三个，其他都是项目辅助文件。


## 编译 WASM

在线编译地址 https://mbebenita.github.io/WasmExplorer/
在网页里敲完 C++ 代码，点击 COMPILE 就可下载到编译好的 .wasm 文件。

本 demo 中就三行 C++ 代码：

```cpp
int square(int num) {
  return num * num;
}
```


## 使用 WASM

`main.js` 中通过以下几行代码即可完成 .wasm 的加载过程，然后就可以直接到控制台敲命令 `square(5)` 查看效果。

```js
let square

function loadWebAssembly (fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => new WebAssembly.Instance(module))
}

loadWebAssembly('square.wasm').then(instance => {
  square = instance.exports._Z6squarei  // 注意这里的 _Z6***i，不是笔误哦

  console.log('square(5)=', square(5))
})
```


## 运行

```bash
$ mkdir dist
$ cp src/index.html src/main.js wasm/square.wasm dist/
$ http-server dist  # 没有 http-server 就自己装一个 `npm i -g http-server`
```

