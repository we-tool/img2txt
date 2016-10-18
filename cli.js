#!/usr/bin/env node

/** Copyright (c) 2013, hit9 */
var minimist = require('minimist')
var img2txt = require('./')

var args = minimist(process.argv.slice(2))
var file = args._[0]
var fontSize = parseInt(args.fontSize)
var nocolor = !!args.nocolor
var nohtml = !!args.nohtml

img2txt(file, {
  fontSize: fontSize,
  nocolor: nocolor,
  nohtml: nohtml
}, function(err, ret) {
  if (err) throw err
  process.stdout.write(ret)
})
