/** Copyright (c) 2013, hit9 */

var pngparse = require('pngparse')
var fs = require('fs')
var util = require('util')
var _ = require('underscore')

module.exports = img2txt

function img2txt(file, opt, cb){
  if (typeof opt === 'function') {
    cb = opt
    opt = null
  }
  opt = _.extend({
    fontSize: 12, // minimum on chrome
    nocolor: false,
    nohtml: false
  }, opt)

  var buf
  try {
    buf = fs.readFileSync(file)
  } catch(err) {
    return cb(err)
  }

  pngparse.parseFile(file, function(err, img){
    if (err) return cb(err)
    render(img, opt, function(err, ret){
      cb(err, ret)
    })
  })
}

function render(img, opt, cb){
  var template = '<!DOCTYPE HTML>\\\
<html>\\\
<head>\\\
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />\\\
  <style type="text/css" media="all">\\\
    pre {\\\
      white-space: pre-wrap;       /* css-3 */\\\
      white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */\\\
      white-space: -pre-wrap;      /* Opera 4-6 */\\\
      white-space: -o-pre-wrap;    /* Opera 7 */\\\
      word-wrap: break-word;       /* Internet Explorer 5.5+ */\\\
      font-family: "Inconsolata", "Consolas"!important;\\\
      line-height: 1.0;\\\
      font-size: %dpx;\\\
    }\\\
  </style>\\\
</head>\\\
<body>\\\
  <pre>%s</pre>\\\
</body>\\\
</html>'.replace(/\\/g, '\n') // newline

  var err = null
  var imgData = img.data
  var imgWidth = img.width
  var imgHeight = img.height

  var rgbas = _.reduce(imgData, function(memo, val, i){
    var rc = i % 4
    if (rc === 0) memo.push([]) // new rgba
    _.last(memo)[rc] = val
    return memo
  }, [])

  var pixels = _.reduce(rgbas, function(memo, val, i){
    var rw = i % imgWidth
    if (rw === 0) memo.push([]) // new row
    _.last(memo)[rw] = val
    return memo
  }, [])

  var grayScale = 'MNHQ$OC?7>!:-;. '
  var txt = ''
  for (var h = 0, h, pixel; h < imgHeight; h++) {
    for (w = 0; w < imgWidth; w++) {
      pixel = pixels[h][w]
      if (opt.nocolor) {
        txt += grayScale[parseInt(sum(pixel) / 4.0 / 256.0 * 16)]
      } else {
        txt += '<span style="' +
          'color:rgb(' + pixel.slice(0, 3).join(',') + ');' +
          'color:rgba(' + pixel.join(',') + ');' +
          '">▇</span>'
      }
    }
    txt += opt.nohtml ? '\n' : '<br>'
  }
  if (opt.nohtml) {
    cb(err, txt)
  } else {
    cb(err, util.format(template, opt.fontSize, txt))
  }

  function sum(arr){
    return _.reduce(arr, function(memo, val){
      return memo + val
    }, 0)
  }
}
