# img2txt

> A fork of [hit9/img2txt](https://github.com/hit9/img2txt), implemented in node.js
But now **PNG only**

Image to Ascii Text. Dead simple, something useless.

**Just a toy**

DEMOs
-----

The following picture: foo.jpg (230x354)

1. `img2txt foo.jpg > 1.html`

1. `img2txt foo.jpg > 2.html`

1. `img2txt foo.jpg --nocolor > 3.html`

Installation
------------

```
$ npm install -g img2txt
```

Usage
-----

    Usage: img2txt <imgfile> [--nocolor] [--nohtml] [--fontSize=<fontSize>]

sample usage:

    img2txt me.png > me.html
    img2txt me.png --nocolor --nohtml

the optional arguments:

    --nocolor            if in color, default: false
    --nohtml            if in html, default: false
    --fontSize           the font-size(px) of text in the html, default: 12

Warning
-------

Use browsers to look colored html may cause a big memory usage.

WhyHTML
-------

Because it looks good in html.

License
-------

BSD,  short and sweet.
