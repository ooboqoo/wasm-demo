let square

function loadWebAssembly (fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => new WebAssembly.Instance(module))
}

loadWebAssembly('square.wasm').then(instance => {
  square = instance.exports._Z6squarei
})
