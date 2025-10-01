// Load Google platform.js via external script tag
;(function () {
  var s = document.createElement("script")
  s.src = "https://apis.google.com/js/platform.js"
  s.async = true
  s.defer = true
  document.head.appendChild(s)
})()
