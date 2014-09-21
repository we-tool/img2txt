var img2txt = require('./')
var fs = require('fs')

img2txt('./img/world.png', function(err, html){
  fs.writeFileSync('world.html', html)
})

img2txt('./img/truecoloralpha.png', function(err, html){
  fs.writeFileSync('truecoloralpha.html', html)
})

img2txt('./img/sun.png', function(err, html){
  fs.writeFileSync('sun.html', html)
})

img2txt('./img/sun.png', {
  nocolor: true,
  nohtml: true
}, function(err, str){
  fs.writeFileSync('sun.txt', str)
})

img2txt('./img/sun.png', {
  nocolor: true,
  nohtml: true
}, function(err, str){
  console.log(str)
})
