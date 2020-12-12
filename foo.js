function bar(){
  console.info("www")
}

let config = {
  alert: setInterval(bar)
}

config = null
